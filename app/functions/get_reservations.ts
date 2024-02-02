import { HttpContext } from '@adonisjs/core/http'
import Database from '@adonisjs/lucid/services/db'

export const currentReservation = async (ctx: HttpContext) => {
  if (ctx.auth.user) {
    const reservations = await Database.rawQuery(
      'SELECT guests, date, hours, email FROM reservations WHERE email = ?',
      [ctx.auth.user?.email]
    )
    return reservations[0]
  } else {
    return undefined
  }
}
