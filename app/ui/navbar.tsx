import React from 'react'
import Link from 'next/link'
import NavLinks from '@/app/ui/nav-links';


export default function NavBar(){
    
    return (
        <>
            <nav className='flex h-full flex-col px-3 py-4 md:px-2'>
                <Link
                    className="mb-2 flex h-15 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
                    href="/"
                >
                    <div className="w-32 text-white md:w-40">
                        Logo
                    </div>
                </Link>
                <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 fixed bottom-0 w-full ml--15px-mb px-3 md:px-0  md:relative md:bottom-auto md:w-auto">
                    <NavLinks />                    
                </div>

                
            </nav>
        </>
    )
}

