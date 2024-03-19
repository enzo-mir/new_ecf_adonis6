import { useForm } from '@inertiajs/react'
import { ChangeEvent, FormEvent, useState } from 'react'

const ForgetPassword = ({ email }: { email: string }) => {
  const [error, setError] = useState<string>('')
  const { data, setData, post } = useForm({
    email: email || '',
  })
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setData({
      email: e.target.value,
    })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    post('/profile/forgot_pasword/' + data.email, {
      onSuccess: () => alert('Email envoyé !'),
      onError: (err) => {
        setError(err as unknown as string)
      },
    })
  }
  return (
    <>
      {error ? <i>{error}</i> : null}
      <form id="forgot_password" onSubmit={handleSubmit}>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            defaultValue={data.email}
            placeholder="Entrez votre email"
            required
            onChange={handleChange}
          />
        </label>
        <button type="submit">Envoyer</button>
      </form>
    </>
  )
}

export default ForgetPassword
