'use client'

import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { cabinDetailType } from '@/app/cabins/[cabinId]/page'
import { useReservationContext } from '@/app/_components/ReservationContext'
import { differenceInDays, isPast } from 'date-fns'

type settingProps = {
  id: number
  MinBookingLength: number
  MaxBookingLength: number
  breakfastPrice: number
  MaxGuestsPerBooking: number
}

type dateSelector = {
  cabin: cabinDetailType
  setting: settingProps
  bookedDates: Date[]
}

function DateSelector({ cabin, setting }: dateSelector) {
  const { range, handleReset, addRange } = useReservationContext()
  // CHANGE
  const { regularPrice, discount } = cabin
  let numNights
  if (range === undefined) {
    numNights = 0
  } else {
    numNights = differenceInDays(range!.to!, range!.from!) + 1
  }

  // console.log("range",range?.to,"another range",range?.from)
  // const numNights= 22
  const cabinPrice = numNights * (regularPrice - discount)
  // SETTINGS
  const { MinBookingLength, MaxBookingLength } = setting

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        // className="pt-12 place-self-center border-amber-500 s"
        className={'pt-1 place-self-center'}
        classNames={{
          today: `border-amber-500 `, // Add a border to today's date
          selected: ` bg-accent-500 border-accent-400 text-white`, // Highlight the selected day
          chevron: `fill-accent-400`, // Change the color of the chevron
          range_middle: 'bg-accent-500',
          range_start: 'bg-accent-500',
          range_end: 'bg-accent-500',
        }}
        mode="range"
        min={MinBookingLength + 1}
        max={MaxBookingLength}
        captionLayout="dropdown"
        defaultMonth={new Date()}
        startMonth={new Date()}
        endMonth={new Date()}
        navLayout="around"
        onSelect={addRange}
        selected={range}
        disabled={(curDate) => isPast(curDate)}
      />
      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{' '}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold cursor-pointer hover:bg-accent-600 "
            onClick={handleReset}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default DateSelector
