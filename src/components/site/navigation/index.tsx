import { UserButton } from '@clerk/nextjs'
import { User } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  user?: null | User
}

const Navigation = ({ user }: Props) => {
  return (
    <div className="fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-10">
      <aside className="flex items-center gap-2">
        <Image
          src={'./assests/pixeluna-logo.svg'}
          width={70}
          height={70}
          alt="pixeluna logo"
        />
        <span className="text-2xl font-bold"> Pixeluna</span>
      </aside>
      <nav className=" md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <ul className="flex items-center justify-center gap-8">
          <Link href={'#'}>ABOUT</Link>
          <Link href={'#'}>PRICING</Link>
          <Link href={'#'}>DOCUMENTATION</Link>
          <Link href={'#'}>FEATURES</Link>
          <Link href={'#'}>ARCHITECTURE</Link>
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        <Link
          href={'/platform'}
          className="bg-primary text-white p-2 px-4 rounded-md hover:bg-primary/80"
        >
          Login
        </Link>
        <UserButton />
        {/* <ModeToggle /> can be used from shadcn | mode toggle for dark theme */}
      </aside>
    </div>
  )
}

export default Navigation