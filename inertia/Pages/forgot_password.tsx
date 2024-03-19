import Layout from './components/layout/layout'
import styles from '../css/password_forgot.module.css'
import { useForm } from '@inertiajs/react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { newPwdSchema } from '../types/new_password_schema'
import { ZodError } from 'zod'

const ForgotPassword = ({ email }: { email: string }) => {
  const { data, setData, post } = useForm<{
    password: string
    confirmPassword: string
    email: string
  }>({
    email,
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState<string>('')

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    try {
      setError('')
      newPwdSchema.parse(data)
      post('/profile/new_password', {
        data,
        onError: (err) => {
          setError(err as unknown as string)
        },
      })
    } catch (errors) {
      if (errors instanceof ZodError) {
        setError(errors.issues[0].message)
      }
    }
  }
  return (
    <main className={styles.main_page}>
      <h1>Rénitialisation de mot de passe pour l'email: {email}</h1>
      {error ? <p>{error}</p> : null}
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">
          <p>Mot de passe</p>
          <input type="password" name="password" id="password" onChange={handleChange} required />
        </label>
        <label htmlFor="confirmPassword">
          <p>Confirmation du mot de passe</p>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Sauvegarder</button>
      </form>
    </main>
  )
}
ForgotPassword.layout = (page: HTMLElement) => <Layout children={page} />

export default ForgotPassword
