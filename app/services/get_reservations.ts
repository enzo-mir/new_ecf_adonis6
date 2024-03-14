import { HttpContext } from '@adonisjs/core/http'
import Database from '@adonisjs/lucid/services/db'

export const getCurrentReservation = async (ctx: HttpContext) => {
  if (await ctx.auth.use('web').check()) {
    const reservations = await Database.rawQuery(
      'SELECT guests, date, hours, email FROM reservations WHERE user_id = ?',
      [(await ctx.auth.use('web').authenticate())!.id]
    )
    return reservations[0]
  } else {
    return undefined
  }
}
