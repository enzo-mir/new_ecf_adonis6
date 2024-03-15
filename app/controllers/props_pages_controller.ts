import type { HttpContext } from '@adonisjs/core/http'
import { allImages, getCardData } from '#services/get_props_data_service'

export default class PropsPagesController {
  async home({ inertia }: HttpContext) {
    return inertia.render('home', {
      images: await allImages(),
    })
  }

  async card(ctx: HttpContext) {
    return ctx.inertia.render('card', {
      cardData: await getCardData(),
    })
  }
}
