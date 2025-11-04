'use client'

import { ReactNode } from 'react'
import { guestType } from '@/app/account/profile/page'
import { updateGuest } from '@/app/_lib/actions'
import { useFormStatus } from 'react-dom'

type formProfileProps = {
  guest: guestType
  children: ReactNode
}

function FormProfile({ children, guest }: formProfileProps) {
  const { fullName, email, nationalID, countryFlag } = guest

  return (
    <form
      key={JSON.stringify(guest)}
      action={updateGuest}
      className=" bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col max-[700px]:text-base max-[700px]:px-5  max-[700px]:w-[450px]"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          defaultValue={fullName}
          name={'fullName'}
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full  shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400  max-[700px]:text-base"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          defaultValue={email}
          name={'email'}
          disabled
          className="px-5 py-3 bg-primary-800 text-primary-100 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400  max-[700px]:text-base"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between  max-[700px]:text-sm">
          <label htmlFor="nationality">Where are you from?</label>
          {countryFlag ? (
            <img
              src={countryFlag}
              alt="Country flag"
              className="h-5 rounded-sm"
            />
          ) : null}
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          defaultValue={nationalID}
          name={'nationalID'}
          className="px-5 py-3 bg-primary-800 text-primary-100 w-full shadow-sm rounded-sm  max-[700px]:text-base"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <FormButton />
      </div>
    </form>
  )
}

export default FormProfile

function FormButton() {
  const { pending } = useFormStatus()
  return (
    <button
      disabled={pending}
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? 'Updating ...' : 'Update profile'}
    </button>
  )
}
