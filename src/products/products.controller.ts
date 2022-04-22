import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';
import { FindOneParams } from 'src/utils/find-one-params';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async create(@Body() product: CreateProductDto) {
    return this.productsService.create(product);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param() {id}: FindOneParams) {
    return this.productsService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthenticationGuard)
  async update(@Param() {id}: FindOneParams, @Body() product: UpdateProductDto) {
    return this.productsService.update(+id, product);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  async delete(@Param() {id}: FindOneParams) {
    return this.productsService.delete(+id);
  }
}
