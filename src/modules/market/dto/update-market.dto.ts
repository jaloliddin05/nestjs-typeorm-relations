import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class UpdateMarketDto {
  @ApiProperty({
    description: 'Title',
    example: 'Karzinko',
  })
  @IsOptional()
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: 'Address',
    example: 'TTZ-4',
  })
  @IsOptional()
  @IsString()
  readonly address: string;
}

export default UpdateMarketDto;
