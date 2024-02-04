import { useState, lazy, Suspense, useEffect } from 'react'
import AdminCard from './components/admin/AdminCard.js'
import HourEditing from './components/admin/HourEditing.js'
const Layout = lazy(() => import('./components/layout.js'))
import CardEdition from './components/admin/card_edition.js'
import AdminEditImages from './components/admin/admin_edit_images.js'
import { BsFillImageFill } from 'react-icons/bs'
import { BiSolidTime } from 'react-icons/bi'
import { IoFastFood } from 'react-icons/io5'
import { AnimatePresence } from 'framer-motion'
import type { CardDataType, HourDataType, Image } from '../types/data_api_types.js'
import { Head } from '@inertiajs/react'
import AdminImages from './components/admin/admin_images.js'
import styles from '../../css/admin.module.css'
import React from 'react'

const Admin = ({
  hoursData,
  cardData,
  imagesData,
}: {
  cardData: CardDataType
  hoursData: HourDataType[]
  imagesData: Image[]
}) => {
  const [displayEditImage, setDisplayEditImage] = useState(false)
  const [imageEdition, setImageEdition] = useState<{
    title: string
    description: string
    url: string
    adding: boolean
  }>({
    title: '',
    description: '',
    url: '',
    adding: false,
  })

  const [displayCardEdition, setDisplayCardEdition] = useState<boolean>(false)
  const [dataCardEdit, setDataCardEdit] = useState({
    id: 0,
    title: '',
    desc: '',
    price: 0,
    formula: '',
    choiceEdit: '',
  })

  const [showOption, setShowOption] = useState<string>('image')

  return (
    <main className={styles.main_wrapper}>
      <Head title="Administration - Le Quai Antique" />
      <nav>
        <ul>
          <li>
            <button onClick={() => setShowOption('image')}>
              <span>Image</span>
              <BsFillImageFill />
            </button>
          </li>
          <li>
            <button onClick={() => setShowOption('hour')}>
              <span>Heures</span>
              <BiSolidTime />
            </button>
          </li>
          <li>
            <button onClick={() => setShowOption('card')}>
              <span>Carte</span>
              <IoFastFood />
            </button>
          </li>
        </ul>
      </nav>
      <AnimatePresence>
        {displayEditImage ? (
          <AdminEditImages imageEditionData={imageEdition} displaying={setDisplayEditImage} />
        ) : null}
        {displayCardEdition ? (
          <CardEdition cardData={dataCardEdit} setDisplayEditCard={setDisplayCardEdition} />
        ) : null}
      </AnimatePresence>

      {showOption === 'image' ? (
        <article className={styles.images_wrapper}>
          <AdminImages setDisplayModal={setDisplayEditImage} setImageData={setImageEdition} />
        </article>
      ) : showOption === 'hour' ? (
        <article className={styles.hours_conbtainer}>
          <HourEditing />
        </article>
      ) : (
        <article className={styles.card_container}>
          <AdminCard
            setDisplay={setDisplayCardEdition}
            setData={setDataCardEdit}
            display={displayCardEdition}
          />
        </article>
      )}

      <article>
        <h1>
          Nombre de convives maximum du restaurant <br />
          35 personnes
        </h1>
      </article>
    </main>
  )
}
Admin.layout = (page: HTMLElement) => <Layout children={page} />

export default Admin
