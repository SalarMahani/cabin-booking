import { EyeSlashIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/solid'
import { cabinDetailType } from '@/app/cabins/[cabinId]/page'
import Image from 'next/image'
import TextExpander from '@/app/_components/TextExpander'

function CabinData({ cabin }: { cabin: cabinDetailType }) {
  const { name, maxCapacity, image, description } = cabin
  return (
    <div
      className="grid grid-cols-[2fr_4fr] gap-20 border
    border-primary-800 py-3 px-10 mb-24 max-[700px]:mb-14
     max-[700px]:gap-6
     max-[900px]:mb-10"
    >
      <div className="relative w-[300px]  h-[400px] -translate-x-3 max-[700px]:w-[200px]">
        <Image
          fill
          // width={100}
          // height={400}
          src={image}
          alt={`Cabin ${name}`}
          className={'object-cover'}
        />
      </div>

      <div>
        <h3
          className="text-accent-100 font-black text-6xl mt-2
         translate-x-[-10px] bg-primary-950 pb-1
         max-[940px]:text-4xl
         max-[640px]:text-xl
         "
        >
          Cabin {name}
        </h3>

        <p className="text-lg text-primary-300 mb-10 max-[740px]:text-base">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg max-[740px]:text-base">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg max-[740px]:text-sm">
              Located in the heart of the{' '}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex gap-3 items-center max-[740px]:gap-2">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg max-[740px]:text-sm">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default CabinData
