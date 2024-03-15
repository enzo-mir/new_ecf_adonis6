import type { HttpContext } from '@adonisjs/core/http'
import { allHours, allImages, getCardData } from '#services/get_props_data_service'
import { send_mail_password_forgot } from '#services/mailer_service'

export default class PropsPagesController {
  async home({ inertia }: HttpContext) {
    /*     await send_mail_password_forgot('miraglioenzo93@gmail.com')
     */ return inertia.render('home', {
      images: await allImages(),
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
