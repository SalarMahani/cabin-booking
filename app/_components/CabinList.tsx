import { getCabins } from '../_lib/data-service'
import CabinCard from '@/app/_components/CabinCard'
import { filter } from '@/app/cabins/page'

export type cabinType = {
  id: number
  name: string
  maxCapacity: number
  regularPrice: number
  discount: number
  image: string
}

async function CabinList({ filter }: { filter: filter }) {
  const cabins: cabinType[] = await getCabins()
  if (!cabins.length) return null
  let cabinsList: cabinType[]

  enum filterNumbering {
    small = 3,
    medium = 6,
    large = 7,
  }

  switch (filter) {
    case 'all':
      cabinsList = cabins
      break
    case 'small':
      cabinsList = cabins.filter(
        (cabin) => cabin.maxCapacity <= filterNumbering.small,
      )
      break
    case 'medium':
      cabinsList = cabins.filter(
        (cabin) =>
          cabin.maxCapacity <= filterNumbering.medium &&
          cabin.maxCapacity > filterNumbering.small,
      )
      break
    case 'large':
      cabinsList = cabins.filter(
        (cabin) => cabin.maxCapacity >= filterNumbering.large,
      )
      break
    default:
      throw new Error('BAD Filter ' + filter)
  }
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabinsList.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  )
}

export default CabinList
