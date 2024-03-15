import env from '#start/env'
import mail from '@adonisjs/mail/services/main'

export async function send_mail_password_forgot(email: string) {
  const mailer = await mail.sendLater((message) => {
    message
      .to(email)
      .from(env.get('STMP_EMAIL'))
      .subject('Forgot your password ?')
      .text('forget password')
  })

  console.log(mailer)

  return false
}
