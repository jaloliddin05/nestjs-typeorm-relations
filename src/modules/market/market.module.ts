import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';

@Module({
  providers: [MarketService],
  controllers: [MarketController]
})
export class MarketModule {}
