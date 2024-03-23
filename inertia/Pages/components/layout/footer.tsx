import { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import Reserv from '../reservations/reservation.js'
import { AnimatePresence } from 'framer-motion'
import styles from '../../../css/footer.module.css'
import { PropsType } from './layout.js'
import { hourStore } from '../../../data/store/api_data.store.js'

const Footer = () => {
  const [res, setRes] = useState(false)
  const { props } = usePage() as unknown as PropsType
  const hours = hourStore((state) => state.hours)

  return (
    <footer className={styles.footer}>
      <AnimatePresence>{res ? <Reserv res={setRes} /> : null}</AnimatePresence>
      <table className={styles.hours}>
        <thead>
          <tr>
            <th>Horaires d&#39;ouvertures</th>
          </tr>
        </thead>
        <tbody>
          {(hours.length ? hours : props.hours).map((elem, id) => {
            return (
              <tr key={id}>
                <td>{elem.day}</td>
                <td>{elem.lunch}</td>
                <td>{elem.dinner}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <nav>
        <ul>
          <li>
            <Link href="/">Accueil</Link>
          </li>
          <li>
            <Link href="/carte">Carte</Link>
          </li>
          <li>
            <button className="btnReserve" onClick={() => setRes(true)}>
              Réserver
            </button>
          </li>
        </ul>
      </nav>
      <p>Tous droits réservés</p>
    </footer>
  )
}

export default Footer
