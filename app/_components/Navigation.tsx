import Link from 'next/link'
import { auth } from '@/app/_lib/auth'
import { Session } from 'next-auth'

export default async function Navigation() {
  const session: Session | null = await auth()
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href={'/account'}
              className={
                'hover:text-accent-400' +
                ' transition-colors flex items-center justify-center gap-6 flex-row-reverse '
              }
            >
              <img
                src={session.user.image}
                alt={String(session.user.name)}
                referrerPolicy={'no-referrer'}
                className={'h-8' + ' rounded-full'}
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}
