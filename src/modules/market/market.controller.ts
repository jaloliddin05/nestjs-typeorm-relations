import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  Delete,
  Patch,
  Param,
  Get,
} from '@nestjs/common';

import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { Market } from './market.entity';
import { MarketService } from './market.service';
import { CreateMarketDto, MarketCategoryDto, UpdateMarketDto } from './dto';

@ApiTags('Market')
@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get('/')
  @ApiOperation({ summary: 'Method: returns all markets' })
  @ApiOkResponse({
    description: 'The markets were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getData(): Promise<{ items: Market[]; totalItemsCount: number }> {
    try {
      return await this.marketService.getAll();
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns single market by id' })
  @ApiOkResponse({
    description: 'The market was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string): Promise<Market> {
    return this.marketService.getOne(id);
  }

  @Get('/category/:id')
  @ApiOperation({ summary: 'Method: returns markets by category' })
  @ApiOkResponse({
    description: 'The markets was returned by category',
  })
  @HttpCode(HttpStatus.OK)
  async getByCategory(
    @Param('id') id: string,
  ): Promise<{ items: Market[]; totalItemsCount: number }> {
    return this.marketService.getMarketsByCategory(id);
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new market' })
  @ApiCreatedResponse({
    description: 'The market was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() categoryData: CreateMarketDto): Promise<InsertResult> {
    try {
      return await this.marketService.create(categoryData);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/category')
  @ApiOperation({ summary: 'Method: adds category to market' })
  @ApiCreatedResponse({
    description: 'The category was added to market successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async addCategory(@Body() addData: MarketCategoryDto): Promise<Market> {
    try {
      return await this.marketService.addCategory(addData);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Method: updates market by id' })
  @ApiOkResponse({
    description: 'Market was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() categoryData: UpdateMarketDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    try {
      return await this.marketService.change(categoryData, id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deletes market by id' })
  @ApiOkResponse({
    description: 'Market was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string): Promise<DeleteResult> {
    try {
      return await this.marketService.deleteOne(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/category/delete')
  @ApiOperation({ summary: 'Method: delete category from market' })
  @ApiOkResponse({
    description: 'The category was deleted from market',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCategory(@Body() deleteData: MarketCategoryDto): Promise<Market> {
    try {
      return await this.marketService.deleteCategory(deleteData);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
