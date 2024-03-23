import { useForm } from '@inertiajs/react'
import React from 'react'
import type { UsersInformationType } from '../../../types/user_type.store'

function FormComponent({
  id,
  role,
  email,
  name,
  setCurrentId,
  setErrorMessage,
}: UsersInformationType & {
  setCurrentId(val: number | null): void
  setErrorMessage(val: string): void
}) {
  const { post, processing, data, setData, reset } = useForm<
    UsersInformationType & { password: string; emailChange: boolean }
  >({
    id,
    role,
    email,
    name,
    password: '',
    emailChange: false,
  })
  const defaultEmail = data.email
  function handleChangeValues(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setData({
      ...data,
      [e.target.name]: e.target.name === 'role' ? Number.parseInt(e.target.value) : e.target.value,
    })
  }

  function handlSubmitEdition(e: React.MouseEvent | null) {
    e instanceof MouseEvent ? e.preventDefault() : null
    post('/admin/userUpdate', {
      data: { ...data, emailChange: defaultEmail !== data.email },
      onSuccess: () => {
        setCurrentId(null)
        setErrorMessage('')
      },

      onError: (message) => {
        setErrorMessage(message as unknown as string)
      },
    })
  }

  return (
    <>
      <td>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChangeValues}
          onKeyDown={(e) => (e.code === 'Enter' ? handlSubmitEdition(null) : null)}
        />
      </td>
      <td>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChangeValues}
          onKeyDown={(e) => (e.code === 'Enter' ? handlSubmitEdition(null) : null)}
        />
      </td>

      <td>
        <input
          type="text"
          name="password"
          value={data.password}
          onChange={handleChangeValues}
          onKeyDown={(e) => (e.code === 'Enter' ? handlSubmitEdition(null) : null)}
        />
      </td>

      <td>
        <select name="role" onChange={handleChangeValues}>
          {role === 0 ? (
            <>
              <option value={0}>Client</option>
              <option value={1}>Admin</option>
            </>
          ) : (
            <>
              <option value={1}>Admin</option>
              <option value={0}>Client</option>
            </>
          )}
        </select>
      </td>

      <td>
        <button onClick={handlSubmitEdition} disabled={processing}>
          Confirmer
        </button>
        <button
          onClick={() => {
            setCurrentId(null)
            reset()
          }}
        >
          Annuler
        </button>
      </td>
    </>
  )
}

export default FormComponent
