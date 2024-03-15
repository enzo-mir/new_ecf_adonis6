import React from 'react'

const ForgetPassword = ({ email }: { email: string }) => {
  return (
    <>
      <form action="" id="forgot_password">
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            defaultValue={email}
            placeholder="Entrez votre email"
            required
          />
        </label>
        <button type="submit">Envoyer</button>
      </form>
    </>
  )
}

export default ForgetPassword
