import type { HttpContext } from '@adonisjs/core/http'
import Database from '@adonisjs/lucid/services/db'
import { UpdatedFormDataType } from '#types/user_type'
async function getUserData(ctx: HttpContext) {
  const userDatabase = await Database.rawQuery(
    'SELECT name, email, guests, alergy from users WHERE id = ? AND email = ?',
    [ctx.auth.user?.id, ctx.auth.user?.email]
  )
  return userDatabase[0][0] as UpdatedFormDataType
}
async function getReservation(ctx: HttpContext) {
  const reservations: Array<Array<UpdatedFormDataType>> = await Database.rawQuery(
    'SELECT `guests`,`date`,`hours`,`email` FROM `reservations` WHERE email = ?',
    [ctx.auth.user?.email]
  )
  if (reservations[0].length) {
    let tableReservation: Array<object> = []

    reservations[0].map((reservation) => tableReservation.push(reservation))
    return reservations[0][0] as UpdatedFormDataType
  } else {
    return []
  }
}

export { getUserData, getReservation }
