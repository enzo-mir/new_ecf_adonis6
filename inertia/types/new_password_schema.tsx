import { z } from 'zod'

export const newPwdSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .refine((value) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(value), {
        message:
          "Le mot de passe doit être composé d'une majuscule, minuscule, d'un chiffre et avoir une longueur de 8 charactères",
      }),
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: 'Les deux mots de passes sont différents',
  })
