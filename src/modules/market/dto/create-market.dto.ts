import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CreateMarketDto {
  @ApiProperty({
    description: 'Title',
    example: 'Makro',
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: 'Address',
    example: 'Buyuk Ipak yoli metro',
  })
  @IsNotEmpty()
  @IsString()
  readonly address: string;
}

export default CreateMarketDto;
