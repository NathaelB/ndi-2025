import { healthChecks } from '#start/health'
import type { HttpContext } from '@adonisjs/core/http'
import { ApiOperation, ApiResponse } from '@foadonis/openapi/decorators'
import { HealthCheckResponse } from '#responses/health_check_response'

export default class HealthChecksController {
  @ApiOperation({ summary: 'Check if the application is ready to handle requests' })
  @ApiResponse({ type: HealthCheckResponse })
  async ready({ response }: HttpContext) {
    const report = await healthChecks.run()

    if (report.isHealthy) {
      return response.ok(report)
    }

    return response.serviceUnavailable(report)
  }

  @ApiOperation({ summary: 'Check if the application is alive' })
  @ApiResponse({ type: HealthCheckResponse })
  async live() {
    return { status: 'ok' }
  }
}
