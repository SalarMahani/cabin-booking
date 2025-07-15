import ReservationCard from '@/app/_components/ReservationCard'
import { Metadata } from 'next'
import { getBookings } from '@/app/_lib/data-service'
import { auth } from '@/app/_lib/auth'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'reservations',
}

export type bookingType = {
  id: string
  created_at: Date
  startDate: Date
  endDate: Date
  numNights: number
  numGuests: number
  totalPrice: number
  guestId: string
  cabinId: string
  cabins: {
    name: string
    image: string
  }[]
}

export default async function Page() {
  const session = await auth()
  if (!session?.user.guestId) return null
  const bookings: bookingType[] = await getBookings(session.user.guestId)

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{' '}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <ReservationCard booking={booking} key={booking.id} />
          ))}
        </ul>
      )}
    </div>
  )
}
