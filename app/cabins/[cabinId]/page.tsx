import { getCabin, getCabins } from '@/app/_lib/data-service'
import CabinData from '@/app/_components/CabinData'
import Reservation from '@/app/_components/Reservation'
import { Suspense } from 'react'
import Spinner from '@/app/_components/Spinner'

type pageProps = {
  params: Promise<{
    cabinId: string
  }>
}

export type cabinDetailType = {
  id: number
  name: string
  maxCapacity: number
  regularPrice: number
  discount: number
  image: string
  description: string
}

export async function generateMetadata(props: pageProps) {
  const params = await props.params
  return { title: `Cabin ${params.cabinId}` }
}

export default async function Page(props: pageProps) {
  const params = await props.params
  const ID = Number(params.cabinId)
  const cabin: cabinDetailType = await getCabin(ID)

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <CabinData cabin={cabin} />
      <Suspense fallback={<Spinner />}>
        <Reservation cabin={cabin} />
      </Suspense>
    </div>
  )
}

export async function generateStaticParams() {
  const cabins = await getCabins()
  return cabins.map((cabin) => ({
    cabinId: cabin.id.toString(),
  }))
}

// import { getCabin, getCabins } from '@/app/_lib/data-service'
// import CabinData from '@/app/_components/CabinData'
// import Reservation from '@/app/_components/Reservation'
// import { Suspense } from 'react'
// import Spinner from '@/app/_components/Spinner'
//
// type pageProps = {
//   params: {
//     cabinId: string
//   }
// }
//
// export type cabinDetailType = {
//   id: number
//   name: string
//   maxCapacity: number
//   regularPrice: number
//   discount: number
//   image: string
//   description: string
// }
//
// export async function generateMetadata(props: pageProps) {
//   const { cabinId } = props.params
//   return { title: `Cabin ${cabinId}` }
// }
//
// export default async function Page(props: pageProps) {
//   const { cabinId } = props.params
//   const ID = Number(cabinId)
//   const cabin: cabinDetailType = await getCabin(ID)
//
//   return (
//     <div className="max-w-6xl mx-auto mt-8">
//       <CabinData cabin={cabin} />
//       <Suspense fallback={<Spinner />}>
//         <Reservation cabin={cabin} />
//       </Suspense>
//     </div>
//   )
// }
//
// export async function generateStaticParams() {
//   const cabins = await getCabins()
//   return cabins.map((cabin) => ({
//     cabinId: cabin.id.toString(),
//   }))
// }
