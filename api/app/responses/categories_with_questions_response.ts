import { ApiProperty } from '@foadonis/openapi/decorators'

class QuestionOptionDto {
  @ApiProperty({ description: 'Option ID' })
  declare id: string

  @ApiProperty({ description: 'Option label' })
  declare label: string

  @ApiProperty({ description: 'Option value' })
  declare value: string
}

class QuestionDto {
  @ApiProperty({ description: 'Question ID' })
  declare id: string

  @ApiProperty({ description: 'Question content' })
  declare content: string

  @ApiProperty({ description: 'Question order' })
  declare order: number

  @ApiProperty({ description: 'Question options', type: [QuestionOptionDto] })
  declare options: QuestionOptionDto[]
}

export class CategoryDto {
  @ApiProperty({ description: 'Category ID' })
  declare id: string

  @ApiProperty({ description: 'Category slug' })
  declare slug: string

  @ApiProperty({ description: 'Category label' })
  declare label: string

  @ApiProperty({ description: 'Category color' })
  declare color: string

  @ApiProperty({ description: 'Questions in this category', type: [QuestionDto] })
  declare questions: QuestionDto[]
}

export class CategoriesWithQuestionsResponse {
  @ApiProperty({ description: 'List of categories with their questions', type: [CategoryDto] })
  declare data: CategoryDto[]
}
