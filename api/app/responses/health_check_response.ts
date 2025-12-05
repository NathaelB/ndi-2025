import { ApiProperty } from '@foadonis/openapi/decorators'

export class HealthCheckResponse {
  @ApiProperty({ description: 'Health check status' })
  declare status: string

  @ApiProperty({ description: 'Is the service healthy', required: false })
  declare isHealthy?: boolean

  @ApiProperty({ description: 'Health check reports', required: false })
  declare reports?: Record<string, any>
}
