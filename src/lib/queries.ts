"use server"

import { clerkClient, currentUser } from "@clerk/nextjs"
import { db } from "./db";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";
import { connect } from "http2";
import { platform } from "os";

export const getAuthUserDetails = async () => {
    const user = await currentUser();
    if(!user) return;

    const userData = await db.user.findUnique({
        where: {email: user.emailAddresses[0].emailAddress},
        include: {
            Platform: {
                include: {
                    SidebarOption: true,
                    SubAccount: {
                        include: {
                            SidebarOption: true
                        }
                    }
                }
            },
            Access: true,
        }
    })

    return userData;
}

export const saveActivityLogNotification = async ({
    platformId, description, subaccountId,
}:{
    platformId?: string,
    description: string,
    subaccountId?: string,
}) => {
    const authUser = await currentUser();
    let userData
    if(!authUser){
        const response = await db.user.findFirst({
            where:{
                Platform:{
                    SubAccount:{
                        some: {
                            id : subaccountId
                        },
                    },
                },
            },
        })
        if(response){userData = response}
    } else {
        userData = await db.user.findUnique({
            where: { email: authUser?.emailAddresses[0].emailAddress },
        })
    }

    if(!userData){
        console.log("COuld not find a user");
        return
    }

    let foundPlatId = platformId;
    if(!foundPlatId){
        if(!subaccountId){
            throw new Error("Provide a platform Id or a subAccount Id")
        }
    }

    const response = await db.subAccount.findUnique({
        where: {id: subaccountId}
    })

    if(response) foundPlatId = response.platformId;
    
    // We checked for platId and subAccount Id cuz sometimes notification will be there for subAccount and it should be related to respective platId

    // now will create notification for subAccount if it exists - 

    if(subaccountId){
        await db.notification.create({
            data:{
                notification: `${userData.name} | ${description}`,
                User: {connect:{id: userData.id}},
                Platform:{connect: {id: foundPlatId}},
                SubAccount:{connect:{id:subaccountId}}
            }
        })
    }else {
        await db.notification.create({
            data:{
                notification: `${userData.name} | ${description}`,
                User: {connect:{id: userData.id}},
                Platform:{connect: {id: foundPlatId}},
            }
        })        
    }
}

export const createTeamUser = async (platformId: string, user: User) => {
    if(user.role === "PLATFORM_OWNER") return null;

    const response = await db.user.create({data: {...user}})
    return response
}

export const VerifyAndAcceptInvitation = async () => {
    const user = await currentUser();
    if(!user) return redirect('/sign-in');

    const inviteExists = await db.invitation.findUnique({
        where: {
            email: user.emailAddresses[0].emailAddress,
            status: 'PENDING',
        }
    })

    if(inviteExists) {
        const userDetails = await createTeamUser(inviteExists.platformId, 
            {
                email : inviteExists.email,
                platformId: inviteExists.platformId,
                avatarUrl: user.imageUrl,
                id: user.id,
                name: `${user.firstName}${user.lastName}`,
                role: inviteExists.role,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        )

        await saveActivityLogNotification({
            platformId: inviteExists?.platformId,
            description: `Joined`,
            subaccountId: undefined,
        })

        if (userDetails) {
            await clerkClient.users.updateUserMetadata(user.id, {
              privateMetadata: {
                role: userDetails.role || 'SUBACCOUNT_USER',
              },
            })

            // once notified and user created deleting the invitation
            await db.invitation.delete({
                where:{email: userDetails.email},
            })

            // returning platId scince we need it to route the user
            return userDetails.platformId
        }else return null;
    }else {
        const platform = await db.user.findUnique({
            where:{email: user.emailAddresses[0].emailAddress},
        })
        
        return platform ? platform.platformId : null;
    }


}