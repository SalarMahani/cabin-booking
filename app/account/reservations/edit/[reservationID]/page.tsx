import { getBooking, getCabin } from '@/app/_lib/data-service'
import { cabinDetailType } from '@/app/cabins/[cabinId]/page'
import { FormButton } from '@/app/_components/FormButton'
import { updateReservation } from '@/app/_lib/actions'

type pageProps = {
  params: Promise<{
    reservationID: string
  }>
}
type bookingType = {
  id: number
  numGuests: number
  observations: string
  cabinId: number
}
export default async function Page(props: pageProps) {
  const params = await props.params
  const reservationId = Number(params.reservationID)
  const { numGuests, observations, cabinId }: bookingType =
    await getBooking(reservationId)

  const { maxCapacity }: cabinDetailType = await getCabin(cabinId)
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <form
        action={updateReservation}
        key={`${reservationId}-${numGuests}`}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultValue={numGuests}
            required
          >
            <option value="" disabled>
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => {
              const val = i + 1
              return (
                <option key={val} value={val}>
                  {val} {val === 1 ? 'guest' : 'guests'}
                </option>
              )
            })}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={observations}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <FormButton />
          <input
            hidden={true}
            defaultValue={reservationId}
            name={'bookingId'}
          />
        </div>
      </form>
    </div>
  )
}
