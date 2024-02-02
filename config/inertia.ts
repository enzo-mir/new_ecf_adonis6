import { currentReservation } from '#functions/get_reservations'
import { defineConfig } from '@adonisjs/inertia'

export default defineConfig({
  rootView: 'home',

  sharedData: {
    errors: (ctx) => ctx.session.flashMessages.get('errors'),
    user: (ctx) => ctx.auth.user,
    currentReservation: (ctx) => currentReservation(ctx),
  },
})
