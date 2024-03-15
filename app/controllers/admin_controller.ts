import type { HttpContext } from '@adonisjs/core/http'
import { HourType } from '#types/hours_type'
import { z } from 'zod'
import { cardUpdateType } from '#types/card_managment_type'
import Database from '@adonisjs/lucid/services/db'
import { userconfigCreateUser, usersConfigScheama } from '#types/user_type'
import Hash from '@adonisjs/core/services/hash'
export default class AdminController {
  async hours(ctx: HttpContext) {
    try {
      const hoursData = HourType.parse(ctx.request.all())
      for (let i = 0; i < hoursData.data.length; i++) {
        const element = hoursData.data[i]
        if (element.time === 'lunch') {
          const rowUpdated = await Database.rawQuery(
            `UPDATE hours SET lunch = "${element.target}" WHERE day = "${element.day}"`
          )
          if (rowUpdated[0].changedRows > 0) {
            const allHoursToSend = await Database.rawQuery('SELECT * FROM `hours`')
            return ctx.response.json({ hours: allHoursToSend[0] })
          } else {
            return ctx.response.badRequest()
          }
        } else if (element.time === 'dinner') {
          const rowUpdated = await Database.rawQuery(
            `UPDATE hours SET dinner = "${element.target}" WHERE day = "${element.day}"`
          )
          if (rowUpdated[0].changedRows > 0) {
            const allHoursToSend = await Database.rawQuery('SELECT * FROM `hours`')
            return ctx.response.json({ hours: allHoursToSend[0] })
          } else {
            return ctx.response.badRequest()
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
  async userUpdate(ctx: HttpContext) {
    try {
      const usersInfo = usersConfigScheama.parse(ctx.request.all())

      if (usersInfo.password === '') {
        let updateUser
        if (usersInfo.emailChange) {
          updateUser = await Database.rawQuery(
            'UPDATE `users` SET name = ?, email = ?, role = ? WHERE id = ?',
            [usersInfo.name, usersInfo.email, usersInfo.role, usersInfo.id]
          )
        } else {
          updateUser = await Database.rawQuery(
            'UPDATE `users` SET name = ?, role = ? WHERE id = ?',
            [usersInfo.name, usersInfo.role, usersInfo.id]
          )
        }

        if (updateUser[0].affectedRows > 0) {
          ctx.response.redirect().back()
        } else {
          throw new Error('Echec lors de la mise à jour des données')
        }
      } else {
        let updateUser
        const passwordHashed = await Hash.make(usersInfo.password!)
        if (usersInfo.emailChange) {
          updateUser = await Database.rawQuery(
            'UPDATE `users` SET name = ?, role = ?, password = ? WHERE id = ?',
            [usersInfo.name, usersInfo.role, passwordHashed, usersInfo.id]
          )
        } else {
          updateUser = await Database.rawQuery(
            'UPDATE `users` SET name = ?, email = ?, role = ?, password = ? WHERE id = ?',
            [usersInfo.name, usersInfo.email, usersInfo.role, passwordHashed, usersInfo.id]
          )
        }
        if (updateUser[0].affectedRows > 0) {
          ctx.response.redirect().back()
        } else {
          throw new Error('Echec lors de la mise à jour des données')
        }
      }
    } catch (error) {
      ctx.session.flash({
        errors:
          error instanceof z.ZodError
            ? JSON.parse(error.message)[0]?.message
            : error.code === 'ER_DUP_ENTRY'
              ? "L'email est déja utilisé"
              : error.message,
      })
      return ctx.response.redirect().back()
    }
  }
  async deleteUser(ctx: HttpContext) {
    const params: number = ctx.request.param('id')
    try {
      const lineDeleted = await Database.rawQuery('DELETE FROM `users` WHERE `id` = ?', [params])
      if (lineDeleted[0].affectedRows) {
        ctx.response.redirect().back()
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
  async createUser(ctx: HttpContext) {
    try {
      const userInfos = userconfigCreateUser.parse(ctx.request.all())
      try {
        const hashedPassword = await Hash.make(userInfos.password)
        await Database.rawQuery(
          `INSERT INTO users (name, email, password, role) VALUES ("${userInfos.name}", "${userInfos.email}", "${hashedPassword}", ${1})`
        ).catch(() => {
          throw new Error("L'email est déja utilisé")
        })

        ctx.response.redirect().back()
      } catch (error) {
        throw Error(error.message || 'Erreur lors de la création du compte')
      }
    } catch (error) {
      console.log(error)

      ctx.session.flash({
        errors: error instanceof z.ZodError ? JSON.parse(error.message)[0]?.message : error.message,
      })
      return ctx.response.redirect().back()
    }
  }
}
