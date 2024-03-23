import type { HttpContext } from '@adonisjs/core/http'
import { CreateUserScheama, LoginUserScheama } from '#types/user_type'
import { z } from 'zod'
import Database from '@adonisjs/lucid/services/db'
import Hash from '@adonisjs/core/services/hash'
import User from '#models/user'

export default class AuthentificationsController {
  async login(ctx: HttpContext) {
    try {
      let userinfo = LoginUserScheama.parse(ctx.request.all())
      const user = await User.verifyCredentials(userinfo.email, userinfo.password)
      await ctx.auth.use('web').login(user)
      if (user.role === 1) {
        return ctx.response.redirect().toPath('/admin')
      }

      return ctx.response.redirect().back()
    } catch (error) {
      ctx.session.flash({
        errors:
          error instanceof z.ZodError
            ? JSON.parse(error.message)[0]?.message
            : "Ces informations d'identification ne correspondent pas.",
      })
      return ctx.response.redirect().back()
    }
  }

  async register(ctx: HttpContext) {
    try {
      const registerData = CreateUserScheama.parse({
        ...ctx.request.all(),
        alergy: ctx.request.only(['alergy']).alergy || '',
      })

      const hashedPassword = await Hash.make(registerData.password!)

      const insertionQuery = await Database.rawQuery(
        `INSERT INTO users(name, email, password, guests, alergy) VALUES
         ("${registerData.name}","${registerData.email}","${hashedPassword}",${registerData.guests},"${registerData.alergy}")`
      )
      if (insertionQuery[0].affectedRows > 0) {
        const user = await User.verifyCredentials(registerData.email, registerData.password)
        ctx.auth.use('web').login(user)
        return ctx.response.redirect().back()
      } else {
        throw new Error('Problème lors de la création du compte')
      }
    } catch (error) {
      ctx.session.flash({
        errors:
          error instanceof z.ZodError
            ? JSON.parse(error.message)[0]?.message
            : error.code === 'ER_DUP_ENTRY'
              ? "L'email est déja utilisé"
              : error.message,
      })
      return ctx.response.redirect().back()
    }
  }
}
