import type { HttpContext } from '@adonisjs/core/http'

export default class UserInfoController {
  async index({ auth }: HttpContext) {
    return auth.user
  }
}
