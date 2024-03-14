import { z } from 'zod'

export const cardUpdateType = z.object({
  id: z.number(),
  title: z.string(),
  desc: z.string().optional(),
  price: z.number().nullable(),
  formula: z.string().nullable(),
  choice_edit: z
    .string()
    .refine((val: string) => val === 'starters' || 'dishs' || 'desserts' || 'formula', {
      message: 'Choix de données erronées',
    }),
})

export type CardInfoType = {
  formula: string | null
  title: string
  desc: string
  price: number
}
