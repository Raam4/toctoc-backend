import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';
import { FindOneParams } from 'src/utils/find-one-params';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async create(@Body() tag: CreateTagDto) {
    return this.tagsService.create(tag);
  }

  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @Get(':id')
  async findOne(@Param() {id}: FindOneParams) {
    return this.tagsService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthenticationGuard)
  async update(@Param() {id}: FindOneParams, @Body() tag: UpdateTagDto) {
    return this.tagsService.update(+id, tag);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  async remove(@Param() {id}: FindOneParams) {
    return this.tagsService.delete(+id);
  }
}
