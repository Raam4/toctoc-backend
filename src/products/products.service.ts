import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductNotFoundException } from './exception/product-not-found.exception';

@Injectable()
export class ProductsService {

  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>){}

  async create(product: CreateProductDto) {
    const newProduct = this.productRepository.create(product); //falta await?
    await this.productRepository.save(newProduct);
    return newProduct;
  }

  findAll() {
    return this.productRepository.find({relations: ['tags']});
  }

  async findOne(id: number){
    const product = await this.productRepository.findOne(id, {relations: ['tags'], withDeleted: true});
    if(product){
      return product
    }
    throw new ProductNotFoundException(id);
  }

  async update(id: number, product: UpdateProductDto) {
    await this.productRepository.update(id, product);
    const updatedProduct = this.productRepository.findOne(id, {relations: ['tags']});
    if(updatedProduct){
      return updatedProduct;
    }
    throw new ProductNotFoundException(id);
  }

  async delete(id: number) {
    const deleteResponse = await this.productRepository.softDelete(id);
    if(!deleteResponse.affected){
      throw new ProductNotFoundException(id);
    }
  }

  async restore(id: number){
    const restoreResponse = await this.productRepository.restore(id);
    if(!restoreResponse.affected){
      throw new ProductNotFoundException(id);
    }
  }
}
