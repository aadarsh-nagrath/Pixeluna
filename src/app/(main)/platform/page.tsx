import PlatformDetails from '@/components/forms/platform-form';
import { VerifyAndAcceptInvitation, getAuthUserDetails } from '@/lib/queries';
import { currentUser } from '@clerk/nextjs';
import { Plan } from '@prisma/client';
import { redirect } from 'next/navigation';
import * as React from 'react';

const page = async ({searchParams}: {searchParams:{plan:Plan; state: string; code: string}}) => {
// search params from page routing, plan comes from prismaSchema, code and state are for stripe

  const authUser = await currentUser();
  if(!authUser) return redirect('sign-in')

  // What if user is invited then -
  const platformId = await VerifyAndAcceptInvitation();
  console.log(platformId);

  // based on existance of platformId we will decide what to do - 

  const user = await getAuthUserDetails();

  if(platformId){
    if(user?.role === "SUBACCOUNT_GUEST" || user?.role === "SUBACCOUNT_USER"){
      return redirect('/subaccount');
    }else if( user?.role === "PLATFORM_OWNER" || user?.role === "PLATFORM_ADMIN"){
      if(searchParams.plan){
        return redirect(`/platform/${platformId}/billing/?plan=${searchParams.plan}`)
      }

      if(searchParams.state){
        const statePath = searchParams.state.split('__')[0]
        const statePlatId = searchParams.state.split('___')[1]
        if(!statePlatId) return <div>Not Authorized buddy!</div>
        return redirect(`/platform/${statePlatId}/${statePath}?code=${searchParams.code}`)
      }else return redirect(`/platform/${platformId}`)

    }else{
      return <div>Not Authorized buddy!</div>
    }
  }


  return (
    <div className="flex justify-center items-center mt-4 ">
      <div className="max-w-[800px] border-[1px] p-4  rounded-xl">
        <h1 className='text-4xl text-zinc-800 '> Create A New Platform</h1>
        <PlatformDetails data = {{companyEmail : authUser?.emailAddresses[0].emailAddress}}  />
      </div>
    </div>
  );
}

export default page;