 import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import clsx from 'clsx'
import { Check} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {pricingCards} from '../../lib/constants';
export default async function Home() {
  
  return (
    <>
      <section className="h-full w-full md:pt-44 mt-[-70px] relative flex items-center justify-center flex-col ">
        {/* grid */}
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />

        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className="text-9xl font-bold text-center md:text-[300px]">
            Pixeluna
          </h1>
        </div>
        <div className="flex justify-center items-center relative md:mt-[-70px]">
          <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
        </div>
      </section>

      <section className='flex justify-center flex-col items-center gap-4 md:mt-20'>
        <h2 className='text-center text-4xl'>Choose as per your convenience</h2>
        <p className="text-muted-foreground text-center">
          Our straightforward pricing plans are tailored to meet your needs. If
          {" you're"} not <br />
          ready to commit you can get started for free.
        </p>

        <div className='flex items-center justify-center mt-6 gap-4 flex-wrap'>
          {pricingCards.map((card)=>(
            //WIP: We will setup free product here from stripe
               <Card className={cn("w-[380px]", card.title == 'Premium Plan'? "border-4 border-[blue]": "")}>
               <CardHeader>
                 <CardTitle>{card.title}</CardTitle>
                 <CardDescription>{card.description}</CardDescription>
               </CardHeader>
               <CardContent className="grid gap-4">
                 <div className=" flex items-center space-x-4 rounded-md border p-4">
                   <div className="flex-1 space-y-1">
                     <p className="text-sm font-medium leading-none">
                       {card.price}
                     </p>
                     <p className="text-sm text-muted-foreground">
                       {card.duration}
                     </p>
                   </div>
                 </div>
                 <div>
                   {card.features.map((p, index) => (
                     <div
                       key={index}
                       className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                     >
                       <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                       <div className="space-y-1">
                         <p key={index} className="text-sm font-medium leading-none">
                          {p}
                         </p>
                       </div>
                     </div>
                   ))}
                 </div>
               </CardContent>
               <CardFooter>
                 <Button className="w-full">
                   <Check className="mr-2 h-4 w-4" /> Get Started
                 </Button>
               </CardFooter>
             </Card>
          ))}
        </div>
      </section>
    </>
  )
}
