import { useState } from 'react'
import React from 'react'
const Reserv = React.lazy(() => import('./components/reservation.js'))
import styles from '../../css/card.module.css'
import type {
  CardDataType,
  HourDataType,
  DessertType,
  EntreeType,
  MenuType,
  PlatType,
} from '../types/data_api_types.js'
const Layout = React.lazy(() => import('./components/layout.js'))
import type { User } from '../types/user_type.store.js'
import { Head } from '@inertiajs/react'

const Card = ({
  cardData,
  hours,
  userData,
}: {
  cardData: CardDataType
  hours: Array<HourDataType>
  userData: User
}) => {
  const [res, setRes] = useState(false)
  const { starters, dishs, desserts, menus } = cardData

  function mapingSimilarityFood(
    food: EntreeType | PlatType | DessertType | MenuType,
    title: string
  ) {
    return food === starters || food === dishs ? (
      <>
        <h2>{title}</h2>
        <div className="noshare">
          {food.map((element) => {
            return !element.sharing ? (
              <div key={element.id}>
                <div>
                  <p>{element.name}</p>
                  <p className={styles.desc}>{element.description}</p>
                </div>
                <p>{element.price}€</p>
              </div>
            ) : null
          })}
        </div>
        <div className="share">
          <h2>à partager (ou pas . . .)</h2>
          {food.map((element, id: number) => {
            return element.sharing ? (
              <div key={id}>
                <div>
                  <p>{element.name}</p>
                  <p className={styles.desc}>{element.description}</p>
                </div>
                <p>{element.price}€</p>
              </div>
            ) : null
          })}
        </div>
      </>
    ) : food === desserts ? (
      <>
        <h2>{title}</h2>
        {food.map((element) => {
          return (
            <div key={element.id}>
              <div>
                <p>{element.name}</p>
                <p className={styles.desc}>{element.description}</p>
              </div>
              <p>{element.price}€</p>
            </div>
          )
        })}
      </>
    ) : (
      <>
        <h2>{title}</h2>
        {(food as MenuType).map((element) => {
          return (
            <div key={element.id}>
              <p>{element.name}</p>
              <article>
                <p>Formules : </p>
                <aside>
                  {element.formula.split(',').map((formule: string, index: number) => {
                    return <div key={index}>{formule}</div>
                  })}
                </aside>
              </article>
            </div>
          )
        })}
      </>
    )
  }

  return (
    <>
      {res ? <Reserv res={setRes} /> : null}
      {cardData ? (
        <main className={styles.main_content}>
          <Head title="La carte - Le Quai Antique" />
          <h1>La carte</h1>
          <section className={styles.card_container}>
            <div className={styles.lunch_container}>
              {mapingSimilarityFood(starters, 'les entrées')}
            </div>
            <div className={styles.plat_container}>{mapingSimilarityFood(dishs, 'les plats')}</div>
            <div className={styles.dessert_container}>
              {mapingSimilarityFood(desserts, 'les desserts')}
            </div>
            <div className={styles.menu_container}>{mapingSimilarityFood(menus, 'les menus')}</div>
          </section>
        </main>
      ) : null}
    </>
  )
}

Card.layout = (page: HTMLElement) => <Layout children={page} />
export default Card
