'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { IoPersonOutline } from "react-icons/io5";
import { BiCategory, BiHomeAlt, BiSearch } from "react-icons/bi";
import { BiMenu } from "react-icons/bi";


const links = [
    {
        name: 'Home',
        href: '/',
        icon: BiHomeAlt,
    },
    {
        name: 'Search',
        href: '/search',
        icon: BiSearch,
    },
    {
        name: 'Category',
        href: '/category',
        icon: BiCategory,
    },
    {
        name: 'Profile',
        href: '/profile',
        icon: IoPersonOutline,
    },
];

export default function NavLink() {
    const pathname = usePathname();
    return (
      <>
        {links.map((link) => {
            const LinkIcon = link.icon;
            return (
            <Link
                key={link.name}
                href={link.href}
                passHref
                aria-label={link.name} // Provide an accessible label
                className={clsx(
                'flex h-[40px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                    'bg-sky-100 text-blue-600': pathname === link.href,
                },
                )}
            >
                <LinkIcon className='w-6'aria-hidden="true" />
                <div className="hidden md:block">{link.name}</div>
            </Link>
            
            );
            
        })}

        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
            
        <Link href='/more'
        passHref // Ensure passHref is used to correctly pass href to the underlying <a> tag
        aria-label="More" // Provide an accessible label for screen readers
        className={clsx(
                    'flex h-[40px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                    {
                        'bg-sky-100 text-blue-600': pathname === '/more',
                    },
                )}>
            <BiMenu className='w-6 text-base' aria-hidden="true"/>
            <div className="hidden md:block">More</div>
        </Link>
        
        
      </>
    );
}
