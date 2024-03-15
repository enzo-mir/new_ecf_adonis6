import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import type { StatusPageRange, StatusPageRenderer } from '@adonisjs/core/types/http'
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
import { errors } from '@adonisjs/core'
>>>>>>> origin/release
>>>>>>> 97234da35e74503be710bd143ef312b0348765fd

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
<<<<<<< HEAD
  protected debug = !app.inProduction

=======
<<<<<<< HEAD
  protected debug = !app.inProduction

=======
  /*   protected debug = !app.inProduction
   */
>>>>>>> origin/release
>>>>>>> 97234da35e74503be710bd143ef312b0348765fd
  /**
   * Status pages are used to display a custom HTML pages for certain error
   * codes. You might want to enable them in production only, but feel
   * free to enable them in development as well.
   */
<<<<<<< HEAD
  protected renderStatusPages = app.inProduction

=======
<<<<<<< HEAD
  protected renderStatusPages = app.inProduction

=======
  /*   protected renderStatusPages = app.inProduction
   */
>>>>>>> origin/release
>>>>>>> 97234da35e74503be710bd143ef312b0348765fd
  /**
   * Status pages is a collection of error code range and a callback
   * to return the HTML contents to send as a response.
   */
  protected statusPages: Record<StatusPageRange, StatusPageRenderer> = {
<<<<<<< HEAD
    /*   '404': (error, { inertia }) => inertia.render('errors/not_found', { error }),
    '500..599': (error, { inertia }) => inertia.render('errors/server_error', { error }), */
=======
<<<<<<< HEAD
    '404': (error, { view }) => {
      return view.render('pages/errors/not_found', { error })
    },
    '500..599': (error, { view }) => {
      return view.render('pages/errors/server_error', { error })
    },
=======
    '404': (error, { inertia }) => inertia.render('errors/not_found', { error }),
    '500..599': (error, { inertia }) => inertia.render('errors/server_error', { error }),
>>>>>>> origin/release
>>>>>>> 97234da35e74503be710bd143ef312b0348765fd
  }

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: unknown, ctx: HttpContext) {
    return super.handle(error, ctx)
  }

  /**
   * The method is used to report error to the logging service or
   * the a third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
