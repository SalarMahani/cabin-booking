import { Metadata } from 'next'
import { Suspense } from 'react'
import Spinner from '@/app/_components/Spinner'
import CabinList from '../_components/CabinList'
import Filter from '@/app/_components/Filter'
import ReservationReminder from '@/app/_components/ReservationReminder'

export const metadata: Metadata = {
  title: 'cabins',
}

export type filter = 'small' | 'medium' | 'large' | 'all' | null

type cabinProps = {
  searchParams: Promise<{
    capacity: filter
  }>
}

async function Page({ searchParams }: cabinProps) {
  const filterInput = (await searchParams).capacity
  const filter: filter = filterInput ?? 'all'

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <div className={'flex justify-end mb-8'}>
        <Filter />
      </div>
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  )
}

export default Page
