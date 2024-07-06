import React from 'react'
import Link from 'next/link'
import NavLinks from '@/app/ui/nav-links';


export default function NavBar(){
    
    return (
        <>
            <nav className='flex h-full flex-col px-3 pt-3 md:px-2'>
                <Link
                    className="mb-2 flex h-15 items-end justify-start rounded-md bg-gray-50 p-4 md:h-40"
                    href="/"
                >
                    <div className="w-32 text-blue-600 md:w-40 font-bold">
                        Job Portal
                    </div>
                </Link>
                <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 fixed bottom-0 w-full ml--13px-mb px-3 md:px-0  md:relative md:bottom-auto md:w-auto py-2 bg-white">
                    <NavLinks />                    
                </div>
            </nav>
        </>
    )
}

