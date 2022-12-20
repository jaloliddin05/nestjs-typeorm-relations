import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CreateCategoryDto {
  @ApiProperty({
    name: 'Title',
    description: 'foods',
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;
}

export default CreateCategoryDto;
