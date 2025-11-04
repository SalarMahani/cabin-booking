import SideNavigation from '@/app/_components/SideNavigation'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      // className={
      //   'grid grid-cols-[16rem_1fr]' +
      //   ' max-[700px]:grid-cols-[10rem_1fr]' +
      //   ' h-full gap-12'
      // }
      className={
        'grid grid-cols-[16rem_1fr] h-full gap-12 max-[700px]:flex max-[700px]:flex-col w-fit' +
        ' justify-center max-[700px]:gap-1 ' +
        'max-[700px]:w-[450px]'
      }
    >
      <SideNavigation />
      <div className={'py-1 block'}>{children}</div>
    </div>
  )
}

export default Layout
