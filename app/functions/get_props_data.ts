import { imagesAddType } from '#types/image_edit_type'
import { HourType } from '#types/hours_type'
import Database from '@adonisjs/lucid/services/db'
import { z } from 'zod'

async function getCardData() {
  const starters = await Database.rawQuery('SELECT * FROM `starters`')
  const dishs = await Database.rawQuery('SELECT * FROM `dishs`')
  const desserts = await Database.rawQuery('SELECT * FROM `desserts`')
  const menus = await Database.rawQuery('SELECT * FROM `menus`')
  return {
    starters: starters[0],
    dishs: dishs[0],
    desserts: desserts[0],
    menus: menus[0],
  }
}

async function allImages() {
  const images = (await Database.rawQuery(
    'SELECT `id`, `title`, `description`, `url` FROM `images`'
  )) as z.infer<typeof imagesAddType>[][]
  return images[0]
}
const allHours: z.infer<typeof HourType>[][] = await Database.rawQuery(
  'SELECT * FROM `hours` WHERE 1'
)
const getUsersInformation = async () => {
  const allUsers = await Database.rawQuery('SELECT `id`,`name`,`email`,`role` FROM users ')
  return allUsers[0]
}
export { getCardData, allImages, allHours, getUsersInformation }
