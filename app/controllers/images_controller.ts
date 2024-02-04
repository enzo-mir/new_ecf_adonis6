import type { HttpContext } from '@adonisjs/core/http'
import Database from '@adonisjs/lucid/services/db'
import { imagesAddType, imagesUpdateType } from '#types/image_edit_type'
import Application from '@adonisjs/core/services/app'
import { z } from 'zod'
import fs from 'node:fs'
import { allImages } from '#functions/get_props_data'
export default class ImagesController {
  async deleteImages(ctx: HttpContext, link: string | null) {
    const url: string = link || ctx.request.only(['url']).url
    if (url !== null) {
      const filePath = Application.publicPath(url)

      try {
        fs.unlink(filePath, (err) => {
          if (err) throw new Error('Erreur lors de la suppression')
        })
        await Database.rawQuery(`DELETE from images WHERE url = "${url}"`)
        return ctx.response.status(200).json({
          images: await allImages(),
        })
      } catch (error) {
        ctx.session.flash({
          errors:
            error instanceof z.ZodError ? JSON.parse(error.message)[0]?.message : error.message,
        })
        return ctx.response.redirect().status(400).back()
      }
    } else {
      ctx.session.flash({
        errors: 'Erreur lors de la suppression',
      })
      return ctx.response.redirect().back()
    }
  }

  async upload(ctx: HttpContext) {
    try {
      const imagesData = imagesAddType.parse({
        ...ctx.request.all(),
        image: ctx.request.file('image'),
      })
      var fileName = imagesData.title.replace(/\s/g, '_')
      const getSameName = await Database.rawQuery(`SELECT * from images WHERE name = "${fileName}"`)

      if (await getSameName[0].length) {
        fileName = `${Date.now()}${fileName}`
      }

      try {
        imagesData.image!.move(Application.publicPath('images'), {
          name: fileName,
        })
        await Database.rawQuery(`
                INSERT INTO images (id, title, description, url, name) VALUES (NULL, "${imagesData.title}", "${imagesData.description}", "/images/${fileName}", "${fileName}")
                `)
        return ctx.response.redirect().back()
      } catch (error) {
        ctx.session.flash({
          errors:
            error instanceof z.ZodError ? JSON.parse(error.message)[0]?.message : error.message,
        })
        return ctx.response.redirect().back()
      }
    } catch (error) {
      ctx.session.flash({
        errors: error instanceof z.ZodError ? JSON.parse(error.message)[0]?.message : error.message,
      })
      return ctx.response.redirect().back()
    }
  }
  async delete(ctx: HttpContext) {
    return this.deleteImages(ctx, null)
  }

  async update(ctx: HttpContext) {
    try {
      const imagesData = imagesUpdateType.parse({
        ...ctx.request.all(),
        image: ctx.request.file('image') || null,
      })

      if (imagesData.title || imagesData.description) {
        const updatedLine = await Database.rawQuery(
          `UPDATE images SET title = "${imagesData.title}", description = "${imagesData.description}" WHERE url = "${imagesData.old_url}"`
        )
        if (updatedLine[0].affectedRows > 0) {
          if (imagesData.image && imagesData.old_url) {
            this.deleteImages(ctx, imagesData.old_url!)
            this.upload(ctx)
          }

          return ctx.response.redirect().back()
        } else {
          ctx.session.flash({
            errors: 'Une erreur est survenus lors de la mise à jour des données ',
          })
          return ctx.response.redirect().back()
        }
      } else {
        if (imagesData.image && imagesData.old_url) {
          this.delete(ctx, imagesData.old_url)
          this.upload(ctx)
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
