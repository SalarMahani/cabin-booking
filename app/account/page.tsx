import { Metadata } from 'next'
import { auth } from '@/app/_lib/auth'

export const metadata: Metadata = {
  title: 'account',
}

async function Page() {
  const session = await auth()
  const name = session?.user?.name?.split(' ').at(0)
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome {name}
    </h2>
  )
}

export default Page
