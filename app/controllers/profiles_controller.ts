import type { HttpContext } from '@adonisjs/core/http'
import { updateZodType } from '#types/user_type'
import { z } from 'zod'
import Database from '@adonisjs/lucid/services/db'
import Hash from '@adonisjs/core/services/hash'

export default class ProfilesController {
  async update(ctx: HttpContext) {
    try {
      const userUpdateData = await updateZodType.parseAsync(ctx.request.all())

      if (userUpdateData.password === null) {
        const updateQuery = await Database.rawQuery(
          `UPDATE users SET name = "${userUpdateData.name}",email = "${userUpdateData.email}",guests = ${userUpdateData.guests},alergy = "${userUpdateData.alergy}" WHERE email = "${ctx.auth.user?.email}"`
        )
        console.log(updateQuery)

        if (updateQuery[0].changedRows > 0) {
          return ctx.response.redirect().back()
        } else {
          throw new Error('Echec lors de la mise à jour des données')
        }
      } else {
        let hashedPassword = await Hash.make(userUpdateData.password)

        const updateQuery = await Database.rawQuery(
          `UPDATE users SET name = "${userUpdateData.name}",email = "${userUpdateData.email}",guests = ${userUpdateData.guests},alergy = "${userUpdateData.alergy}",password="${hashedPassword}" WHERE email = "${ctx.auth.user?.email}"`
        )

        if (updateQuery[0].changedRows > 0) {
          return ctx.response.redirect().back()
        } else {
          throw new Error('Echec lors de la mise à jour des données')
        }
      }
    } catch (error) {
      ctx.session.flash({
        errors: error instanceof z.ZodError ? JSON.parse(error.message)[0]?.message : error.message,
      })
      return ctx.response.redirect().back()
    }
  }

  async logout(ctx: HttpContext) {
    await ctx.auth.use('web').logout()
    if (ctx.auth.use('web').isLoggedOut) {
      return ctx.response.redirect().back()
    } else {
      return ctx.response.badGateway()
    }
  }

  async delete(ctx: HttpContext) {
    try {
      const lineDeleted = await Database.rawQuery('DELETE FROM `users` WHERE `id` = ?', [
        (await ctx.auth.authenticate())!.id,
      ])
      if (lineDeleted[0].affectedRows) {
        await this.logout(ctx)
      } else {
        throw new Error('Une erreur est survenus lors de la suppression du compte')
      }
    } catch (error) {
      ctx.session.flash({
        errors: error.message,
      })
      return ctx.response.redirect().back()
    }
  }
}
