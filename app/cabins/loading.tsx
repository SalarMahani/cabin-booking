import Spinner from '@/app/_components/Spinner'

function Loading() {
  return (
    <div className={'grid items-center justify-center'}>
      <Spinner />
      <p>Loading cabin data ...</p>
    </div>
  )
}

export default Loading
