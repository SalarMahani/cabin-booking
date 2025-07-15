'use client'

import { filter } from '@/app/cabins/page'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

function Filter() {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const router = useRouter()

  const activeFilter = searchParams.get('capacity') ?? 'all'

  function clickHandler(filter: filter) {
    if (filter) {
      const params = new URLSearchParams(searchParams)
      params.set('capacity', filter)
      router.replace(`${pathName}?${params.toString()}`, { scroll: false })
    }
  }

  return (
    <div>
      <Button
        clickHandler={clickHandler}
        filter={'all'}
        activeFilter={activeFilter}
      >
        all
      </Button>
      <Button
        clickHandler={clickHandler}
        filter={'small'}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        clickHandler={clickHandler}
        filter={'medium'}
        activeFilter={activeFilter}
      >
        4&mdash;6 guests
      </Button>
      <Button
        clickHandler={clickHandler}
        filter={'large'}
        activeFilter={activeFilter}
      >
        7&mdash;9 guests
      </Button>
    </div>
  )
}

type ButtonProps = {
  filter: filter
  clickHandler: (filter: filter) => void
  activeFilter: string
  children: string
}

function Button({ filter, clickHandler, activeFilter, children }: ButtonProps) {
  return (
    <button
      onClick={() => clickHandler(filter)}
      className={`px-5 py-2" +
            " hover:bg-primary-700 py-2 m-1 ${
              activeFilter === filter
                ? 'bg-primary-700' + ' text-primary-50'
                : ''
            }`}
    >
      {children}
    </button>
  )
}

export { Button }
export default Filter
