'use client'

import { CalendarDaysIcon, HomeIcon, UserIcon } from '@heroicons/react/24/solid'
import SignOutButton from './SignOutButton'
import { usePathname } from 'next/navigation'

const navLinks = [
  {
    name: 'Home',
    href: '/account',
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: 'Reservations',
    href: '/account/reservations',
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: 'Guest profile',
    href: '/account/profile',
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
]

function SideNavigation() {
  const pathName = usePathname()
  // console.log(pathName)
  return (
    <nav className=" border-r border-primary-900 max-[700px]:w-[450px]">
      <ul className=" flex flex-col gap-2 max-[700px]:gap-1 h-full text-lg  max-[700px]:text-sm max-[700px]:flex-row">
        {navLinks.map((link) => (
          <li key={link.name}>
            <a
              className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors
               flex items-center gap-4 font-semibold text-primary-200 ${link.href === pathName ? 'bg-primary-900' : ''}`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className={'max-[700px]:translate-y-[-50px]'}>
        <div className="mt-auto">
          <SignOutButton />
        </div>
      </div>
    </nav>
  )
}

export default SideNavigation
