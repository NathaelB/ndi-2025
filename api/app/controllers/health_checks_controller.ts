import { healthChecks } from '#start/health'
import type { HttpContext } from '@adonisjs/core/http'
import { ApiOperation } from '@foadonis/openapi/decorators'

export default class HealthChecksController {
  @ApiOperation({ summary: 'Check if the application is ready to handle requests' })
  async ready({ response }: HttpContext) {
    const report = await healthChecks.run()

    if (report.isHealthy) {
      return response.ok(report)
    }

    return response.serviceUnavailable(report)
  }

  @ApiOperation({ summary: 'Check if the application is alive' })
  async live() {
    return { status: 'ok' }
  }
}
