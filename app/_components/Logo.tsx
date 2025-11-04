import Link from 'next/link'
import Image from 'next/image'

function Logo() {
  return (
    <Link href="/" className={'flex gap-4 z-10 max-[640px]:gap-3'}>
      <Image
        src={'/logo.png'}
        height="60"
        width="60"
        alt="The Wild Oasis logo"
        className={'max-[640px]:w-10 max-[640px]:h-10'}
      />
      <span
        className="text-xl font-semibold text-primary-100 content-center
      max-[640px]:text-xs"
      >
        The Wild Oasis
      </span>
    </Link>
  )
}

export default Logo
