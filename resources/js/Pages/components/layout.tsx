import { useEffect } from 'react'
import Header from './header.tsx'
import Footer from './footer.js'
import { usePage } from '@inertiajs/react'
import { connectStore, userDataStore } from '../../data/store/connect.store.js'
import { cardStore, hourStore, imageStore } from '../../data/store/api_data.store.js'
import type { CardDataType, HourDataType, Image } from '../../types/dataApiTypes.js'
import type { User } from '../../types/userType.store.js'
import React from 'react'

const Layout = ({ children }) => {
  type PropsType = {
    props: {
      hours: Array<HourDataType>
      userData?: User
      cardData?: CardDataType
      imagesData?: Image[]
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
    props.imagesData && setImages(props.imagesData)
    if (props.userData?.user) {
      setUserData(props.userData)
      setConnectedUser(true)
    }

    if (props.userData?.admin) {
      setConnectedAdmin(true)
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
