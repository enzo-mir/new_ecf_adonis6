import { sendUserData } from '#functions/get_user_data'
import { defineConfig } from '@adonisjs/inertia'

export default defineConfig({
  rootView: 'home',
  sharedData: {
    errors: (ctx) => ctx.session.flashMessages.get('errors'),
    user: async (ctx) => await sendUserData(ctx),
  },
})
