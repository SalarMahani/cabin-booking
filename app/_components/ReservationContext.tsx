'use client'

import React, { createContext, ReactNode, useContext, useState } from 'react'
import { DateRange } from 'react-day-picker'

type ReserveContextType = {
  range: DateRange | undefined
  // setRange:React.Dispatch<React.SetStateAction<DateRange|undefined>>
  handleReset: () => void
  addRange: (value: DateRange | undefined) => void
}
const ReserveContext = createContext<ReserveContextType | undefined>(undefined)

type ReservationContextType = {
  children: ReactNode
}

function ReservationContext({ children }: ReservationContextType) {
  const [range, setRange] = useState<DateRange | undefined>(undefined)

  function handleReset() {
    setRange({ from: undefined, to: undefined })
  }

  function addRange(value: DateRange | undefined) {
    setRange(value)
  }

  return (
    <ReserveContext.Provider value={{ range, handleReset, addRange }}>
      {children}
    </ReserveContext.Provider>
  )
}

function useReservationContext() {
  const context = useContext(ReserveContext)
  if (context === undefined) {
    throw new Error('useReservationContext must be used within the context')
  }
  return context
}

export { useReservationContext }
export default ReservationContext
