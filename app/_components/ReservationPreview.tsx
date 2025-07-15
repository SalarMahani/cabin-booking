import ReservationCard from '@/app/_components/ReservationCard'
import { bookingType } from '@/app/account/reservations/page'

function ReservationPreview({ bookings }: { bookings: bookingType[] }) {
  return (
    <ul className="space-y-6">
      {bookings.map((booking) => (
        <ReservationCard booking={booking} key={booking.id} />
      ))}
    </ul>
  )
}

export default ReservationPreview
