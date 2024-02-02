import { z } from 'zod'
export const ReservationFromBodySheama = z.object({
  name: z.string().refine((value) => /^[a-zA-Z]+$/.test(value), {
    message: 'Le champs nom doit contenir uniquement des lettres',
  }),
  email: z.string({ invalid_type_error: 'email invalide' }).email({ message: 'email invalide' }),
  guests: z
    .number()
    .min(1, { message: "Le nombre d'invité doit être supérieur à 1" })
    .max(9, { message: "Le nombre d'invité doit être inférieur à 10" }),
  alergy: z.string().refine((value) => /^([a-z+A-Z\\,]+[a-z+A-Z])$/gm.test(value) || !value, {
    message: 'Syntaxe des alergies : alergie1,alergie2 ...',
  }),
  date: z
    .string()
    .refine(
      (val) =>
        !Number.isNaN(new Date(val).getTime()) &&
        new Date(val).getTime() > new Date().getTime() - 86400000,
      {
        message: 'Veuillez choisir une date valide',
      }
    ),

  hourTargeted: z
    .string({
      invalid_type_error: 'Une heure doit être sélectionnée',
      required_error: 'Une heure doit être sélectionnée',
    })
    .refine((val) => new RegExp(/^([0-1]?[0-9]|2[0-3])(h|H)([0-5][0-9])?/gy).test(val), {
      message: 'Une heure doit être sélectionnée',
    }),
  timeTargeted: z.string().refine((val) => val === 'dinner' || 'lunch', {
    message: "Errreur lors du choix de l'heure",
  }),
})

export const DeleteReservationScheama = ReservationFromBodySheama.omit({
  name: true,
  alergy: true,
  hourTargeted: true,
  timeTargeted: true,
}).extend({
  hours: z
    .string({
      invalid_type_error: 'Une heure doit être sélectionnée',
      required_error: 'Une heure doit être sélectionnée',
    })
    .refine((val) => new RegExp(/^([0-1]?[0-9]|2[0-3])(h|H)([0-5][0-9])?/gy).test(val), {
      message: 'Une heure doit être sélectionnée',
    }),
})
export const UserDataReservation = z.array(DeleteReservationScheama)
