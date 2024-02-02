import type { HttpContext } from '@adonisjs/core/http'
import { allHours, allImages, getCardData } from '#functions/get_props_data'
import { HourType } from '#types/hours_type'
import { z } from 'zod'
import { cardUpdateType } from '#types/card_managment_type'
import Database from '@adonisjs/lucid/services/db'

export default class AdminController {
  async index(ctx: HttpContext) {
    if (ctx.auth.user?.role === 1) {
      return ctx.inertia.render('Admin', {
        hoursData: allHours[0],
        cardData: getCardData(),
        imagesData: allImages[0],
      })
    } else {
      return ctx.inertia.render('UndefinedPage')
    }
  }

  async hours(ctx: HttpContext) {
    try {
      const hoursData = HourType.parse(ctx.request.all())
      for (let i = 0; i < hoursData.data.length; i++) {
        const element = hoursData.data[i]
        if (element.time == 'lunch') {
          const rowUpdated = await Database.rawQuery(
            `UPDATE hours SET lunch = "${element.target}" WHERE day = "${element.day}"`
          )
          if (rowUpdated[0].changedRows) {
            const allHoursToSend = await Database.rawQuery('SELECT * FROM `hours`')
            return ctx.response.json({ hours: allHoursToSend[0] })
          } else {
            return ctx.response.status(400).json({
              error: 'Une erreur est survenus lor de la mise à jour des données',
            })
          }
        } else if (element.time == 'dinner') {
          const rowUpdated = await Database.rawQuery(
            `UPDATE hours SET dinner = "${element.target}" WHERE day = "${element.day}"`
          )
          if (rowUpdated[0].changedRows) {
            const allHoursToSend = await Database.rawQuery('SELECT * FROM `hours`')
            return ctx.response.json({ hours: allHoursToSend[0] })
          } else {
            return ctx.response.status(400).json({
              error: 'Une erreur est survenus lor de la mise à jour des données',
            })
          }
        }
      }
    } catch (error) {
      return ctx.response.status(400).json({
        error:
          error instanceof z.ZodError
            ? JSON.parse(error.message)[0]?.message
            : 'Une erreur est survenus',
      })
    }
  }

  async cardUpdate(ctx: HttpContext) {
    try {
      const cardInfo = cardUpdateType.parse(ctx.request.all())

      if (cardInfo.formula === null && cardInfo.price !== null && cardInfo.desc) {
        const updatedLine = await Database.rawQuery(
          `UPDATE ${cardInfo.choice_edit} SET name = "${cardInfo.title}", description = "${cardInfo.desc}", price = ${cardInfo.price} WHERE  id = ${cardInfo.id} `
        )
        if (updatedLine[0].changedRows) {
          return ctx.response.redirect().back()
        } else {
          ctx.session.flash({
            errors: 'Erreur lors de la mise à jour des données',
          })
          return ctx.response.redirect().back()
        }
      } else {
        const updatedLine = await Database.rawQuery(
          `UPDATE menus SET name = "${cardInfo.title}", formula = "${cardInfo.formula}" WHERE  id = ${cardInfo.id}`
        )
        if (updatedLine[0].changedRows) {
          return ctx.response.redirect().back()
        } else {
          ctx.session.flash({
            errors: 'Erreur lors de la mise à jour des données',
          })
          return ctx.response.redirect().back()
        }
      }
    } catch (error) {
      ctx.session.flash({
        errors: error instanceof z.ZodError ? JSON.parse(error.message)[0]?.message : error.message,
      })
      return ctx.response.redirect().back()
    }
  }
}
