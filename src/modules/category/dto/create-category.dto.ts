import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CreateCategoryDto {
  @ApiProperty({
    description: 'Title',
    example: 'foods',
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;
}

export default CreateCategoryDto;
