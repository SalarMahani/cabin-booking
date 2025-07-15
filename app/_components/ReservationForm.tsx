// 'use client'
//
// import { cabinDetailType } from '@/app/cabins/[cabinId]/page'
// import { User } from 'next-auth'
// import { useReservationContext } from '@/app/_components/ReservationContext'
// import { differenceInDays } from 'date-fns'
// import { createBooking } from '@/app/_lib/actions'
// import SubmitButton from '@/app/_components/SubmitButton'
//
// function ReservationForm({
//   cabin,
//   user,
// }: {
//   cabin: cabinDetailType
//   user: User
// }) {
//   const { range, handleReset } = useReservationContext()
//   const { name, image } = user
//   const { maxCapacity, regularPrice, discount, id } = cabin
//   let startDate
//   let endDate
//   if (range === undefined) {
//     startDate = 0
//     endDate = 0
//   } else {
//     startDate = range!.from!
//     endDate = range!.to!
//   }
//   const numNights = differenceInDays(endDate, startDate) + 1
//   const cabinPrice = numNights * (regularPrice - discount)
//   if (name === null || image === null) {
//     return
//   }
//
//   const bookingData = {
//     startDate,
//     endDate,
//     numNights,
//     cabinPrice,
//     cabinId: id,
//   }
//   const createBookingWithData = createBooking.bind(null, bookingData)
//   return (
//     <div className="scale-[1.01]">
//       <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
//         <p>Logged in as</p>
//         {
//           <div className="flex gap-4 items-center flex-row-reverse">
//             <img
//               // Important to display google profile images
//               referrerPolicy="no-referrer"
//               className="h-8 rounded-full"
//               src={image}
//               alt={name}
//             />
//             <p>{user.name}</p>
//           </div>
//         }
//       </div>
//
//       <form
//         action={async (formData) => {
//           await createBookingWithData(formData)
//           handleReset()
//         }}
//         className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
//       >
//         <div className="space-y-2">
//           <label htmlFor="numGuests">How many guests?</label>
//           <select
//             name="numGuests"
//             id="numGuests"
//             className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
//             required
//           >
//             <option value="" key="">
//               Select number of guests...
//             </option>
//             {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
//               <option value={x} key={x}>
//                 {x} {x === 1 ? 'guest' : 'guests'}
//               </option>
//             ))}
//           </select>
//         </div>
//
//         <div className="space-y-2">
//           <label htmlFor="observations">
//             Anything we should know about your stay?
//           </label>
//           <textarea
//             name="observations"
//             id="observations"
//             className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
//             placeholder="Any pets, allergies, special requirements, etc.?"
//           />
//         </div>
//
//         <div className="flex justify-end items-center gap-6">
//           {!(startDate && endDate) ? (
//             <p className="text-primary-300 text-base  px-8 py-4  font-semibold transition-all ">
//               Start by selecting dates
//             </p>
//           ) : (
//             <SubmitButton pendingLabel={'Reserving...'}>
//               Reserve now
//             </SubmitButton>
//           )}
//         </div>
//       </form>
//     </div>
//   )
// }
//
// export default ReservationForm
'use client'

import { cabinDetailType } from '@/app/cabins/[cabinId]/page'
import { Session } from 'next-auth'
import { useReservationContext } from '@/app/_components/ReservationContext'
import { differenceInDays } from 'date-fns'
import { createBooking } from '@/app/_lib/actions'
import SubmitButton from '@/app/_components/SubmitButton'

function ReservationForm({
  cabin,
  user,
}: {
  cabin: cabinDetailType
  user: Session['user'] // <-- updated type here
}) {
  const { range, handleReset } = useReservationContext()
  const { name, image } = user ?? {}
  const { maxCapacity, regularPrice, discount, id } = cabin

  let startDate
  let endDate

  if (!range) {
    startDate = 0
    endDate = 0
  } else {
    startDate = range.from!
    endDate = range.to!
  }

  const numNights = differenceInDays(endDate, startDate) + 1
  const cabinPrice = numNights * (regularPrice - discount)

  if (!name || !image) {
    return null
  }

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  }

  const createBookingWithData = createBooking.bind(null, bookingData)

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>
        <div className="flex gap-4 items-center flex-row-reverse">
          <img
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={image}
            alt={name}
          />
          <p>{name}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          await createBookingWithData(formData)
          handleReset()
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base  px-8 py-4  font-semibold transition-all ">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel={'Reserving...'}>
              Reserve now
            </SubmitButton>
          )}
        </div>
      </form>
    </div>
  )
}

export default ReservationForm
