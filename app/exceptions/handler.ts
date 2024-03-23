import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import type { StatusPageRange, StatusPageRenderer } from '@adonisjs/core/types/http'
import { errors } from '@adonisjs/core'

export default class HttpExceptionHandler extends ExceptionHandler {
  protected statusPages: Record<StatusPageRange, StatusPageRenderer> = {
    '404': (error, { inertia }) => inertia.render('undefined_page', { error }),
  }

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: unknown, ctx: HttpContext) {
    if (error instanceof errors.E_ROUTE_NOT_FOUND) {
      const undefinedPage = await this.statusPages['404'](error, ctx)

      return ctx.response.status(error.status).send(undefinedPage)
    }
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
