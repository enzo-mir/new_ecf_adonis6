import { Suspense, useState } from 'react'
import React from 'react'
const Reserv = React.lazy(() => import('./components/reservations/reservation.js'))
const Layout = React.lazy(() => import('./components/layout/layout.js'))
import { AnimatePresence, motion } from 'framer-motion'
import { Head } from '@inertiajs/react'
import type { Image } from '../types/data_api_types.js'
import styles from '../css/home.module.css'
import overlayStyles from '../css/overlay.module.css'

const Home = ({ images }: { images: Image[] }) => {
  const [res, setRes] = useState(false)

  const containerVariant = {
    hiddenHeader: { opacity: 0 },
    showHeader: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
    hiddenText: { opacity: 0 },
    showText: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        duration: 1,
      },
    },
  }

  const itemVariant = {
    hiddenHeader: { opacity: '0', x: '-20%' },
    showHeader: { opacity: '1', x: '0' },
    hiddenText: { opacity: '0', y: '-20%' },
    showText: { opacity: '1', y: '0' },
  }
  return (
    <main className={styles.main_wrapper}>
      <Head title="Accueil - Le Quai Antique" />
      <AnimatePresence>
        {res && (
          <Suspense fallback={<div className={overlayStyles.overlay} />}>
            <Reserv res={setRes} />
          </Suspense>
        )}
      </AnimatePresence>
      <section className={styles.hero_section}>
        <img
          src="https://images.unsplash.com/photo-1520209268518-aec60b8bb5ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80"
          alt="restaurant teinté marron conviviale"
          srcSet="https://images.unsplash.com/photo-1520209268518-aec60b8bb5ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80 500w,
            https://images.unsplash.com/photo-1520209268518-aec60b8bb5ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80 700w,
            https://images.unsplash.com/photo-1520209268518-aec60b8bb5ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80 900w,
            https://images.unsplash.com/photo-1520209268518-aec60b8bb5ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80 1200w"
        />
        <motion.aside variants={containerVariant} initial="hiddenHeader" animate="showHeader">
          <motion.h1 variants={itemVariant}>Le Quai Antique</motion.h1>
          <motion.h2 variants={itemVariant}>Votre restaurant de la savoie</motion.h2>
          <motion.button variants={itemVariant}>
            <a href="#contextText">Découvrir</a>
          </motion.button>
        </motion.aside>
      </section>

      <section className={styles.context_section}>
        <div className={styles.textContent} id="contextText">
          <p>
            Venez découvrir la Savoie à travers une expérience gastronomique, installé à Chambéry,
            Le Quai Antique saura vous satisfaire tout au long de votre repas.
          </p>
          <p>
            Nos plats traditionnels de la Savoie charmeront à coup sûr vos papilles gustatives alors
            qu’attendez-vous ? <br />
            <br />
            Venez à table !
          </p>
        </div>
        <button className="btnReserve" onMouseDown={() => setRes(true)}>
          Réservez une table
        </button>
        {images?.length ? (
          <div className={styles.imagesGalery}>
            {images?.map((image: Image, id: number) => {
              return (
                <div key={id}>
                  <img src={image.url} alt="plat du chef" loading="lazy" />
                  <span>
                    <h1>{image.title}</h1>
                    <p>{image.description}</p>
                  </span>
                </div>
              )
            })}
          </div>
        ) : null}
      </section>
    </main>
  )
}
Home.layout = (page: HTMLElement) => <Layout children={page} />

export default Home
