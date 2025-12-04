import { ApiProperty } from '@foadonis/openapi/decorators'

export class MessageResponse {
  @ApiProperty({ description: 'Response message' })
  declare message: string
}
