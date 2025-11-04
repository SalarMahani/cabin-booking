import type { Metadata } from 'next'
import '@/app/_styles/globals.css'
import Header from '@/app/_components/Header'
import { Josefin_Sans } from 'next/font/google'
import ReservationContext from '@/app/_components/ReservationContext'

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
})
// console.log(josefin)
export const metadata: Metadata = {
  title: {
    template: 'book cabin/ %s',
    default: 'Book Cabin',
  },
  description: 'an app for booking cabins',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={` ${josefin.className}  bg-primary-950 text-primary-100 min-h-screen flex flex-col antialiased`}
      >
        <Header />
        <div className={'flex-1 px-8 py-12 grid'}>
          <main className={'max-w-7xl mx-auto w-full'}>
            <ReservationContext>{children}</ReservationContext>
          </main>
        </div>
      </body>
    </html>
  )
}
