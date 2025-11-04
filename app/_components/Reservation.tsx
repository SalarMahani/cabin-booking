import ReservationForm from '@/app/_components/ReservationForm'
import { cabinDetailType } from '@/app/cabins/[cabinId]/page'
import DateSelector from './DateSelector'
import { getBookedDatesByCabinId, getSettings } from '@/app/_lib/data-service'
import { auth } from '@/app/_lib/auth'
import { Session } from 'next-auth'
import LoginMessage from '@/app/_components/LoginMessage'

async function Reservation({ cabin }: { cabin: cabinDetailType }) {
  const { name, id } = cabin
  const [setting, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(id),
  ])
  const session: Session | null = await auth()
  return (
    <div>
      <h2
        className="text-5xl font-semibold text-center mb-5
 max-[900px]:text-4xl "
      >
        Reserve {name} today. Pay on arrival.
      </h2>
      <div
        className={
          'grid grid-cols-2 border border-primary-800 min-h-[400px] mb-10' +
          ' text-accent-400 max-[700px]:grid-cols-1 max-[700px]:gap-6'
        }
      >
        <DateSelector
          cabin={cabin}
          bookedDates={bookedDates}
          setting={setting}
        />
        <div>
          {session?.user ? (
            <ReservationForm cabin={cabin} user={session.user} />
          ) : (
            <LoginMessage />
          )}
        </div>
      </div>
    </div>
  )
}

export default Reservation
