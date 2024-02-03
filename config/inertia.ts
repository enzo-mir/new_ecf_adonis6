import { currentReservation } from '#functions/get_reservations'
import { defineConfig } from '@adonisjs/inertia'

export default defineConfig({
  rootView: 'home',
  sharedData: {
    errors: (ctx) => ctx.session.flashMessages.get('errors'),
    user: async (ctx) => {
      if (await ctx.auth.check()) {
        return ctx.auth.authenticate()
      }
    },
    currentReservation: (ctx) => currentReservation(ctx),
  },
})
