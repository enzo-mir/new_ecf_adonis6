import { decryptEmail, send_mail_password_forgot } from '#services/mailer_service'
import { newPwdSchema } from '#types/new_password_schema'
import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import db from '@adonisjs/lucid/services/db'
import { ZodError, z } from 'zod'

export default class ForgotPasswordsController {
  private emailType = z.object({ email: z.string().email() })
  async forgot_post(ctx: HttpContext) {
    const emailParams = ctx.params
    try {
      const { email } = this.emailType.parse(emailParams)
      const emailExist = await db.rawQuery('SELECT * FROM users WHERE email = ?', [email])
      if (emailExist[0].length > 0) {
        await send_mail_password_forgot(email)
      } else {
        throw new Error("L'email renseigné n'existe pas")
      }
      return ctx.response.redirect().back()
    } catch (error) {
      if (error instanceof ZodError) {
        ctx.session.flash({
          errors: 'Veuillez renseigner un email valide',
        })
      } else {
        ctx.session.flash({
          errors: error.message,
        })
      }
      return ctx.response.redirect().back()
    }
  }

  async index(ctx: HttpContext) {
    const { email } = ctx.params
    const decryptVerif = await decryptEmail(email)
    if (decryptVerif) {
      return ctx.inertia.render('forgot_password', { email: decryptVerif })
    } else {
      return ctx.response.status(404)
    }
  }

  async new_password(ctx: HttpContext) {
    const { email, password, confirmPassword } = ctx.request.all()
    try {
      const payload = newPwdSchema.parse({ email, password, confirmPassword })
      const hashedPasssword = await hash.make(payload.password)
      const newPasswordInsertion = await db.rawQuery(
        'UPDATE `users` SET `password` = ? WHERE `email` = ?',
        [hashedPasssword, payload.email]
      )
      if (newPasswordInsertion[0].affectedRows) {
        return ctx.response.redirect('/')
      } else {
        throw new Error('Une erreur est survenus lors du changement de mot de passe')
      }
    } catch (err) {
      if (err instanceof ZodError) {
        ctx.session.flash({
          errors: 'les deux mot de passes ne correspondent pas',
        })
      } else {
        ctx.session.flash({
          errors: err.message,
        })
      }
      return ctx.response.redirect().back()
    }
  }
}
