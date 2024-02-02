import type { HttpContext } from '@adonisjs/core/http'
import Database from '@adonisjs/lucid/services/db'
import { allHours, allImages, getCardData } from '#functions/get_props_data'
import { UserDbSceama } from '#types/user_type'
import { z } from 'zod'

export default class PropsPagesController {
  private async getUserData(ctx: HttpContext) {
    const dbResponse = await Database.rawQuery(
      `SELECT * FROM users WHERE email = "${ctx.auth.user?.email}"`
    )
    return dbResponse[0][0] as z.infer<typeof UserDbSceama>
  }

  async home(ctx: HttpContext) {
    if (ctx.auth.user) {
      const currentReservation = await Database.rawQuery(
        'SELECT guests, date, hours, email FROM reservations WHERE email = ?',
        [ctx.auth.user.email]
      )

      const userData = ctx.auth.user
        ? (await this.getUserData(ctx))!.role === 0
          ? {
              user: {
                ...(await this.getUserData(ctx)),
                currentReservation: currentReservation[0],
              },
            }
          : { admin: {} }
        : {}

      delete userData.user!['id']
      delete userData.user!['password']
      delete userData.user!['role']
      return ctx.inertia.render('home', {
        userData: userData,
        images: allImages[0],
        hours: allHours[0],
      })
    } else {
      return ctx.inertia.render('home', {
        userData: undefined,
        images: allImages[0],
        hours: allHours[0],
      })
    }
  }

  async card(ctx: HttpContext) {
    if (ctx.auth.user) {
      const currentReservation = await Database.rawQuery(
        'SELECT guests, date, hours, email FROM reservations WHERE email = ?',
        [ctx.auth.user.email]
      )

      const userData = ctx.auth.user
        ? (await this.getUserData(ctx))!.role === 0
          ? {
              user: {
                ...(await this.getUserData(ctx)),
                currentReservation: currentReservation[0],
              },
            }
          : { admin: {} }
        : {}
      delete userData.user?.id
      delete userData.user?.password
      delete userData.user?.role

      return ctx.inertia.render('card', {
        userData,
        cardData: await getCardData(),
        hours: allHours[0],
      })
    } else {
      return ctx.inertia.render('card', {
        userData: undefined,
        cardData: await getCardData(),
        hours: allHours[0],
      })
    }
  }
}
