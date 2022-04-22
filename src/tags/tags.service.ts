import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { TagNotFoundException } from './exception/tag-not-found.exception';

@Injectable()
export class TagsService {

  constructor(@InjectRepository(Tag) private readonly tagRepository: Repository<Tag>){}

  async create(tag: CreateTagDto) {
    const newTag = this.tagRepository.create(tag); //falta await?
    await this.tagRepository.save(newTag);
    return newTag;
  }

  findAll() {
    return this.tagRepository.find();
  }

  async findOne(id: number) {
    const tag = await this.tagRepository.findOne(id, {relations: ['product'], withDeleted: true});
    if(tag){
      return tag;
    }
    throw new TagNotFoundException(id);
  }

  async update(id: number, tag: UpdateTagDto) {
    await this.tagRepository.update(id, tag);
    const updatedTag = this.tagRepository.findOne(id, {relations: ['product']});
    if(updatedTag){
      return updatedTag;
    }
    throw new TagNotFoundException(id);
  }

  async delete(id: number) {
    const deleteResponse = await this.tagRepository.softDelete(id);
    if(!deleteResponse.affected){
      throw new TagNotFoundException(id);
    }
  }

  async restore(id: number) {
    const restoreResponse = await this.tagRepository.restore(id);
    if(!restoreResponse.affected){
      throw new TagNotFoundException(id);
    }
  }
}
