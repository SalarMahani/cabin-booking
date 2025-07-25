import { eachDayOfInterval } from 'date-fns'
import { supabase } from '@/app/_lib/supabase'
import { notFound } from 'next/navigation'
import { bookingType } from '@/app/account/reservations/page'

/////////////
// GET

export async function getCabin(id: number) {
  const { data, error } = await supabase
    .from('cabins')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error(error)
    notFound()
  }

  return data
}

export async function getCabinPrice(id: number) {
  const { data, error } = await supabase
    .from('cabins')
    .select('regularPrice, discount')
    .eq('id', id)
    .single()

  if (error) {
    console.error(error)
  }

  return data
}

export const getCabins = async function () {
  const { data, error } = await supabase
    .from('cabins')
    .select('id, name, maxCapacity, regularPrice, discount, image')
    .order('name')

  if (error) {
    console.log(error)
    throw new Error('Cabins could not be loaded')
  }

  return data
}

// Guests are uniquely identified by their email address
export async function getGuest(email: string) {
  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .eq('email', email)
    .single()

  // No error here! We handle the possibility of no guest in the sign in callback
  return data
}

export async function getBooking(id: number) {
  const { data, error, count } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error(error)
    throw new Error('Booking could not get loaded')
  }

  return data
}

export async function getBookings(guestId: string): Promise<bookingType[]> {
  const { data, error, count } = await supabase
    .from('bookings')
    // We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId,' +
        ' cabins(name, image)',
    )
    .eq('guestId', guestId)
    .order('startDate')

  if (error) {
    console.error('error', error)
    throw new Error('Bookings could not get loaded', error)
  }

  return data
}

export async function getBookedDatesByCabinId(cabinId: number) {
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  const newToday = today.toISOString()

  // Getting all bookings
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('cabinId', cabinId)
    .or(`startDate.gte.${newToday},status.eq.checked-in`)
  if (error) {
    console.error(error)
    throw new Error('Bookings could not get loaded.eror:', error)
  }
  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      })
    })
    .flat()

  return bookedDates
}

export async function getSettings() {
  const { data, error } = await supabase.from('settings').select('*').single()

  if (error) {
    console.error(error)
    throw new Error('Settings could not be loaded')
  }

  return data
}

export async function getCountries() {
  try {
    const res = await fetch('https://restcountries.com/v2/all?fields=name,flag')
    const countries = await res.json()
    return countries
  } catch {
    throw new Error('Could not fetch countries')
  }
}

/////////////
// CREATE

export async function createGuest(newGuest: {
  email: string
  fullName: string
}) {
  const { data, error } = await supabase
    .from('guests')
    .insert([
      {
        email: newGuest.email,
        fullName: newGuest.fullName,
      },
    ])
    .select()
    .single()

  if (error) {
    console.error('Supabase insert error:', error)
    throw new Error('Guest could not be created')
  }

  return data
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(id: number, updatedFields: string) {
  const { data, error } = await supabase
    .from('guests')
    .update(updatedFields)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error(error)
    throw new Error('Guest could not be updated')
  }
  return data
}

export async function updateBooking(id: number, updatedFields: string) {
  const { data, error } = await supabase
    .from('bookings')
    .update(updatedFields)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error(error)
    throw new Error('Booking could not be updated')
  }
  return data
}

/////////////
// DELETE

export async function deleteBooking(id: number) {
  const { data, error } = await supabase.from('bookings').delete().eq('id', id)

  if (error) {
    console.error(error)
    throw new Error('Booking could not be deleted')
  }
  return data
}
