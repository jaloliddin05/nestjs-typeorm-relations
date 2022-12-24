import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class UpdateProductDto {
  @ApiProperty({
    description: 'Product name',
    example: 'Iphone 13',
  })
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Product price',
    example: 1800,
  })
  @IsOptional()
  @IsNumber()
  readonly price: number;

  @ApiProperty({
    description: 'CategoryId',
    example: '844acc84-aff3-4f45-8608-be5431e00645',
  })
  @IsOptional()
  @IsString()
  readonly category: string;
}

export default UpdateProductDto;
