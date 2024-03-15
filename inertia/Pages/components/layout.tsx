import { useEffect } from 'react'
import Header from './header'
import Footer from './footer'
import { usePage } from '@inertiajs/react'
import { connectStore, userDataStore } from '../../data/store/connect.store.js'
import { cardStore, hourStore, imageStore } from '../../data/store/api_data.store.js'
import type { CardDataType, HourDataType, Image } from '../../types/data_api_types.js'
import type { User } from '../../types/user_type.store.js'

const Layout = ({ children }: { children: JSX.Element | HTMLElement }) => {
  type PropsType = {
    props: {
      hours: Array<HourDataType>
      user?: User
      cardData?: CardDataType
      images?: Image[]
    }
  }

  const { props } = usePage() as unknown as PropsType
  const setHours = hourStore((state) => state.setHours)
  const setCardData = cardStore((state) => state.setCardStore)
  const setUserData = userDataStore((state) => state.setUserData)
  const [setConnectedUser, setConnectedAdmin] = connectStore((state) => [
    state.setConnectedUser,
    state.setConnectedAdmin,
  ])
  const setImages = imageStore((state) => state.setImages)

  useEffect(() => {
    setHours(props.hours)
    props.cardData && setCardData(props.cardData)
    props.images && setImages(props.images)
    if (props.user) {
      if (props.user.role === 1) {
        setConnectedAdmin(true)
        setUserData(props.user)
      } else {
        setUserData({
          ...props.user,
          alergy: props.user.alergy === 'null' ? '' : props.user.alergy,
        })
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
