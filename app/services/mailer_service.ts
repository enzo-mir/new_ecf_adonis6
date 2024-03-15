import env from '#start/env'
import mail from '@adonisjs/mail/services/main'
import { Encryption } from '@adonisjs/core/encryption'
const encryption = new Encryption({
  secret: env.get('SECRET_ENCRYPT'),
})
export async function send_mail_password_forgot(email: string) {
  const urlEncrypted = encryption.encrypt(email, '1 hours')
  const mailer = await mail.sendLater((message) => {
    message
      .to(email)
      .from(env.get('SMTP_EMAIL'))
      .subject('Mot de passe oublié')
      .html(
        `<p>Cliquez sur le lien pour rénitialiser votre mot de passe (lien valable 1 heures)</p> <a href="${env.get('DOMAIN') + 'forgot_password/' + urlEncrypted}">Rénitialiser mon mot de passe</a>`
      )
  })
  return mailer
}

export async function decryptEmail(emailParsed: string) {
  const emailDecrypt: string | null = encryption.decrypt(emailParsed)
  return emailDecrypt
}
