import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class MarketCategoryDto {
  @ApiProperty({
    description: 'MarketId',
    example: 'uuid',
  })
  @IsNotEmpty()
  @IsString()
  readonly marketId: string;

  @ApiProperty({
    description: 'CategoryId',
    example: 'uuid',
  })
  @IsNotEmpty()
  @IsString()
  readonly categoryId: string;
}

export default MarketCategoryDto;
