'use client'

import { TrashIcon } from '@heroicons/react/24/solid'
import { deleteBooking } from '@/app/_lib/actions'
import { useTransition } from 'react'
import SpinnerMini from '@/app/_components/SpinnerMini'

type DeleteReservationProps = {
  bookingId: number
}

function DeleteReservation({ bookingId }: DeleteReservationProps) {
  const [isPending, startTransition] = useTransition()

  function handleDeleteBookings() {
    startTransition(() => deleteBooking({ bookingId }))
  }

  return (
    <button
      onClick={handleDeleteBookings}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      {!isPending ? (
        <>
          {' '}
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <span className={'mx-auto'}>
          <SpinnerMini />
        </span>
      )}
    </button>
  )
}

export default DeleteReservation
