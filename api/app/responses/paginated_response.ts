import { ApiProperty } from '@foadonis/openapi/decorators'

class PaginationMeta {
  @ApiProperty({ description: 'Total number of records' })
  declare total: number

  @ApiProperty({ description: 'Number of records per page' })
  declare perPage: number

  @ApiProperty({ description: 'Current page number' })
  declare currentPage: number

  @ApiProperty({ description: 'Last page number' })
  declare lastPage: number

  @ApiProperty({ description: 'URL of the first page', required: false })
  declare firstPageUrl?: string | null

  @ApiProperty({ description: 'URL of the last page', required: false })
  declare lastPageUrl?: string | null

  @ApiProperty({ description: 'URL of the next page', required: false })
  declare nextPageUrl?: string | null

  @ApiProperty({ description: 'URL of the previous page', required: false })
  declare previousPageUrl?: string | null
}

export class PaginatedResponse<T> {
  @ApiProperty({ description: 'Paginated data' })
  declare data: T[]

  @ApiProperty({ description: 'Pagination metadata', type: PaginationMeta })
  declare meta: PaginationMeta
}
