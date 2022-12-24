import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CreateProductDto {
  @ApiProperty({
    description: 'Product name',
    example: 'Iphone 14',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Product price',
    example: 2000,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @ApiProperty({
    description: 'CategoryId',
    example: '844acc84-aff3-4f45-8608-be5431e00645',
  })
  @IsNotEmpty()
  @IsString()
  readonly category: string;
}

export default CreateProductDto;
