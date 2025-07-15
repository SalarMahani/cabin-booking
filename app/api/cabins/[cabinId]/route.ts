// import { getBookedDatesByCabinId, getCabin } from '@/app/_lib/data-service'
//
// export async function GET(
//   _: object,
//   { params }: { params: { cabinId: number } },
// ) {
//   const { cabinId } = params
//   try {
//     const [cabin, bookedDates] = await Promise.all([
//       getCabin(cabinId),
//       getBookedDatesByCabinId(cabinId),
//     ])
//     return Response.json({ cabin, bookedDates, cabinId })
//   } catch (e) {
//     return Response.json({ message: 'Failed to get cabin', error: e })
//   }
// }
import { NextRequest } from 'next/server'
import { getBookedDatesByCabinId, getCabin } from '@/app/_lib/data-service'

export async function GET(
  req: NextRequest,
  context: { params: { cabinId: string } },
) {
  const cabinId = Number(context.params.cabinId)

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ])

    return Response.json({ cabin, bookedDates, cabinId })
  } catch (e) {
    return Response.json({ message: 'Failed to get cabin', error: e })
  }
}
