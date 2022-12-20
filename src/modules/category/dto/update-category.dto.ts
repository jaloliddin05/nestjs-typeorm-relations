import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class UpdateCategoryDto {
  @ApiProperty({
    name: 'Title',
    description: 'technologies',
  })
  @IsOptional()
  @IsString()
  readonly title: string;
}

export default UpdateCategoryDto;
