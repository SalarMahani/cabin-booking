import Link from 'next/link'
import Image from 'next/image'
import bg from '@/public/bg.png'

export default function Home() {
  return (
    <main className="mt-24 max-[640px]:mt-16">
      <Image
        src={bg}
        className={'object-cover object-top '}
        placeholder={'blur'}
        quality={100}
        fill
        alt="Mountains and forests with two cabins"
      />

      <div className="relative z-10 text-center">
        <h1
          className="text-8xl text-primary-50 mb-10 tracking-tight font-normal max-[640px]:text-4xl
        max-[400px]:text-2xl max-[945px]:text-6xl"
        >
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg
          font-semibold hover:bg-accent-600 transition-all
          max-[640px]:px-6 max-[640px]:py-4 max-[640px]:text-base max-[400px]:px-4 max-[400px]:text-sm"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  )
}
