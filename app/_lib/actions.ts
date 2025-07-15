'use server'
import { auth, signIn, signOut } from '@/app/_lib/auth'
import { supabase } from '@/app/_lib/supabase'
import { revalidatePath } from 'next/cache'
import { getBookings } from '@/app/_lib/data-service'
import { redirect } from 'next/navigation'

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' })
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' })
}

export async function updateGuest(formData: any) {
  const session = await auth()
  if (!session) throw new Error('you must be logged in ')

  const nationalID = formData.get('nationalID')
  const [nationality, countryFlag] = formData.get('nationality').split('%')
  const updateData = { nationalID, nationality, countryFlag }
  //
  const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.guestId)
  if (error) {
    throw new Error('Guest could not be updated')
  }
  revalidatePath('/account/profile')
}

export async function deleteBooking(bookingId: { bookingId: number }) {
  const session = await auth()
  if (!session?.user.guestId) throw new Error('you must be logged in ')
  console.log('bookingId', bookingId)
  const guestBookings = await getBookings(session.user.guestId)
  const guestBookingIds = guestBookings.map((booking) => booking.id)
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error('you are not allowed to delete booking')
  }
  const { error } = await supabase.from('bookings').delete().eq('id', bookingId)
  if (error) {
    console.error(error)
    throw new Error('Booking could not be deleted')
  }
  revalidatePath('account/reservations')
}

export async function updateReservation(formData: any) {
  const session = await auth()
  if (!session) throw new Error('you must be logged in ')

  const numGuests = Number(formData.get('numGuests'))
  const observations = formData.get('observations').slice(0, 1000)
  const bookingId = Number(formData.get('bookingId'))
  const updatedFields = { numGuests, observations }
  const { error } = await supabase
    .from('bookings')
    .update(updatedFields)
    .eq('id', bookingId)
    .select()
    .single()

  if (error) {
    console.error(error)
    throw new Error('Booking could not be updated')
  }
  revalidatePath(`/account/reservations/edit/${bookingId}`)
}

export async function createBooking(bookingData, formData) {
  const session = await auth()
  if (!session) throw new Error('you must be logged in ')
  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: formData.get('numGuests'),
    observations: formData.get('observations').slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: 'unconfirmed',
  }
  const { error } = await supabase.from('bookings').insert([newBooking])

  if (error) {
    throw new Error('Booking could not be created')
  }
  redirect(`/cabins/thankyou`)
}
