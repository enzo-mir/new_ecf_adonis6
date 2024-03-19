import { useEffect } from 'react'
import Header from './header'
import Footer from './footer'
import { usePage } from '@inertiajs/react'
import { connectStore } from '../../../data/store/connect.store.js'
import type { CardDataType, HourDataType, Image } from '../../../types/data_api_types.js'
import type { User } from '../../../types/user_type.store.js'

export type PropsType = {
  props: {
    hours: Array<HourDataType>
    user?: User
    cardData?: CardDataType
    images?: Image[]
  }
}
const Layout = ({ children }: { children: JSX.Element | HTMLElement }) => {
  const { props } = usePage() as unknown as PropsType
  const [setConnectedUser, setConnectedAdmin] = connectStore((state) => [
    state.setConnectedUser,
    state.setConnectedAdmin,
  ])

  useEffect(() => {
    if (props.user) {
      if (props.user.role === 1) {
        setConnectedAdmin(true)
      } else {
        setConnectedUser(true)
      }
    }
  }, [props])
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Layout
