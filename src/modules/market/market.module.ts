import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';
import { Market } from './market.entity';
import { CategoryModule } from '../category/category.module';
import { MarketRepository } from './market.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Market]), CategoryModule],
  providers: [MarketService, MarketRepository],
  controllers: [MarketController],
})
export class MarketModule {}
