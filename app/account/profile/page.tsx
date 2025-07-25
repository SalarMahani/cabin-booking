import SelectCountry from '@/app/_components/SelectCountry'
import { Metadata } from 'next'
import FormProfile from '@/app/_components/FormProfile'
import { auth } from '@/app/_lib/auth'
import { getGuest } from '@/app/_lib/data-service'

export const metadata: Metadata = {
  title: 'profile',
}

export type guestType = {
  fullName: string
  email: string
  nationalID: string
  nationality: string
  countryFlag: string
}

export default async function Page() {
  const session = await auth()
  if (!session?.user.email) throw new Error('No such user email')

  const guest: guestType = await getGuest(session.user.email)

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>
      <FormProfile guest={guest}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-800 text-primary-100 w-full shadow-sm rounded-sm"
          defaultCountry={guest.nationality}
        />
      </FormProfile>
    </div>
  )
}
