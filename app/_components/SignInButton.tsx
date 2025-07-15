import Image from 'next/image'
import { signInAction } from '@/app/_lib/actions'

function SignInButton() {
  return (
    <form action={signInAction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 cursor-pointer font-medium">
        <div className={'relative aspect-square'}>
          <Image
            // fill
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google logo"
            height="24"
            width="24"
            className={'object-cover'}
          />
        </div>
        <span>Continue with Google</span>
      </button>
    </form>
  )
}

export default SignInButton
