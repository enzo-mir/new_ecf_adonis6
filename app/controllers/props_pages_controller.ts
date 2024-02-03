import type { HttpContext } from '@adonisjs/core/http'
import { allHours, allImages, getCardData } from '#functions/get_props_data'

export default class PropsPagesController {
  async home({ inertia }: HttpContext) {
    return inertia.render('home', {
      images: allImages[0],
      hours: allHours[0],
    })
  }

  async card(ctx: HttpContext) {
    return ctx.inertia.render('card', {
      cardData: await getCardData(),
      hours: allHours[0],
    })
  }
}
