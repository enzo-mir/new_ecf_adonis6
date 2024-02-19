import { type FormEvent, useEffect, useState } from 'react'
import { connectStore, userDataStore } from '../../data/store/connect.store.js'
import { Cross } from '../../assets/style/cross.js'
import { motion } from 'framer-motion'
import { updateZodType } from '../../types/user_managment_type.js'
import { z } from 'zod'
import React from 'react'
import { useForm } from '@inertiajs/react'
import type { User } from '../../types/user_type.store.js'
import styles from '../../../css/profil.module.css'
import overlayStyles from '../../../css/overlay.module.css'
const ProfilComponent = ({ setDisplayProfil }: { setDisplayProfil(vale: boolean): void }) => {
  const userData = userDataStore((state) => state.userData)
  const setConnectedUser = connectStore((state) => state.setConnectedUser)
  const [validationMessage, setValidationMessage] = useState<string>('')
  const [editable, setEditable] = useState<boolean>(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.removeAttribute('style')
      setEditable(false)
    }
  }, [])
  const { post, data, setData, reset, processing } = useForm({
    name: userData.name,
    email: userData.email,
    guests: userData.guests,
    password: '',
    alergy: userData.alergy,
  })

  function validationForm(e: FormEvent) {
    e.preventDefault()
    setValidationMessage('')
    try {
      updateZodType.parse(data)
      post('/profile/update', {
        data,
        onError: (err) => {
          setValidationMessage(err as unknown as string)
        },
        onSuccess: () => {
          setValidationMessage('Mise à jour du compte effectuée')
          setEditable(false)
        },
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationMessage(error.errors[0].message)
      } else {
        setValidationMessage(error.message)
      }
    }
  }

  const EditableCta = () => {
    function logout() {
      post('/profile/logout', {
        onSuccess: () => {
          setValidationMessage('Déconnection ...')
          setTimeout(() => {
            setDisplayProfil(false)
            setConnectedUser(false)
            reset()
          }, 1000)
        },
      })
    }

    function deleteAccount() {
      post('/profile/delete', {
        onSuccess: () => {
          setValidationMessage('Profil effacé !')
          setTimeout(() => {
            setDisplayProfil(false)
            setConnectedUser(false)
            reset()
            setDisplayProfil(false)
          }, 1000)
        },
        onError: (err) => {
          setValidationMessage(err as unknown as string)
        },
      })
    }
    return (
      <div className={styles.ctaProfil}>
        {editable ? (
          <button type="submit" disabled={processing}>
            Édition finit
          </button>
        ) : (
          <button
            onMouseDown={() => {
              setEditable(true)
              setValidationMessage('')
            }}
          >
            Éditer les infos
          </button>
        )}

        <button onMouseDown={logout}>Déconnection</button>
        <button onMouseDown={deleteAccount}>supprimer le compte</button>
      </div>
    )
  }

  return (
    <div className={overlayStyles.overlay} onClick={() => setDisplayProfil(false)}>
      <motion.section
        className={styles.profil_section}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: '-20%', opacity: 0 }}
        animate={{ y: '0', opacity: 1 }}
        exit={{ y: '-20%', opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Cross onClick={() => setDisplayProfil(false)} />
        {validationMessage ? <p className={styles.validationMessage}>{validationMessage}</p> : null}
        {editable ? (
          <form onSubmit={validationForm}>
            <div className="profilAcount">
              <label htmlFor="name">
                nom :
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </label>
              <label htmlFor="email">
                e-mail :
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </label>
            </div>
            <div className="addsOn">
              <label htmlFor="guests">
                Convives (par défaut) :
                <input
                  type="number"
                  min={1}
                  name="guests"
                  value={data.guests}
                  onChange={(e) =>
                    setData({
                      ...data,
                      guests: Number.parseInt(e.target.value),
                    })
                  }
                />
              </label>
              <label htmlFor="alergy">
                Alergies :
                <input
                  type="text"
                  name="alergy"
                  value={data.alergy}
                  onChange={(e) => setData({ ...data, alergy: e.target.value })}
                />
              </label>
            </div>
            <div className={styles.passwordField}>
              <label htmlFor="name">
                Mot de passe :
                <input
                  type="text"
                  autoComplete="new-password"
                  name="name"
                  value={data.password || ''}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                />
              </label>
            </div>
            <EditableCta />
          </form>
        ) : (
          <div>
            <div className="profilAcount">
              <p>
                nom : <strong>{data.name}</strong>
              </p>
              <p>
                e-mail : <strong>{data.email}</strong>
              </p>
            </div>
            <div className="addsOn">
              <p>
                convives (par défaut) : <strong>{data.guests!}</strong>
              </p>
              <p>
                alergies : <strong>{data.alergy || 'aucune'}</strong>
              </p>
            </div>
            <EditableCta />
          </div>
        )}
      </motion.section>
    </div>
  )
}
export default ProfilComponent
