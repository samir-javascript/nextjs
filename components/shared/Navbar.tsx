import {  SignedIn, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Theme from './Theme'
import MobileNavBar from './MobileNavBar'
import GlobalSearch from './search/GlobalSearch'

export default function Navbar() {
    return (
        <nav className='flex-between background-light900_dark200 fixed
           z-50 w-full p-6 gap-5 shadow-light-300 dark:shadow-none sm:px-12'>
           <Link className='flex items-center gap-1' href='/'>
               <Image src='/assets/images/site-logo.svg'  width={23} height={23} alt='devOverflow'/>
               <p className='max-sm:hidden h2-bold text-dark-100 dark:text-light-900 '>IQ<span className='text-primary-500'> community</span></p>
           </Link>
            <GlobalSearch />
             <div className="flex-between gap-5">
                 <Theme />
                 <SignedIn>
                   <UserButton 
                    appearance={{
                        elements: {
                            avatarBox: 'h-10 w-10'
                        }, 
                        variables: {
                            colorPrimary: '#ff7000'
                        }
                    }}
                   afterSignOutUrl="/"/>
                 </SignedIn>
                 <MobileNavBar />

             </div>
        </nav>
    )
}