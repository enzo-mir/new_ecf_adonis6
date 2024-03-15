import type { HttpContext } from '@adonisjs/core/http'
import { getCardData, getUsersInformation } from '#services/get_props_data_service'

export default class PropsPagesController {
  async home({ inertia }: HttpContext) {
    return inertia.render('home', {})
  }

  async card(ctx: HttpContext) {
    return ctx.inertia.render('card', {
      cardData: await getCardData(),
      images: null,
    })
  }

  async admin(ctx: HttpContext) {
    if (ctx.auth.user?.role === 1) {
      return ctx.inertia.render('admin', {
        cardData: await getCardData(),
        usersInformation: await getUsersInformation(),
      })
    } else {
      return ctx.inertia.render('undefined_page')
    }
  }
}
