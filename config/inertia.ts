<<<<<<< HEAD
import { sendUserData } from '#functions/get_user_data'
import { defineConfig } from '@adonisjs/inertia'

export default defineConfig({
  rootView: 'home',
  sharedData: {
    errors: (ctx) => ctx.session.flashMessages.get('errors'),
    user: async (ctx) => await sendUserData(ctx),
  },
=======
import { sendUserData } from '#services/get_user_data'
import { defineConfig } from '@adonisjs/inertia'

export default defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    errors: (ctx) => ctx.session?.flashMessages.get('errors'),
    user: async (ctx) => await sendUserData(ctx),
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: false,
    entrypoint: 'inertia/app/ssr.tsx',
  },
>>>>>>> origin/release
})
