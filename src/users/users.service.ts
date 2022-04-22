import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>){}

  async create(user: CreateUserDto) {
    const newUser = this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async findByUsername(username: string){
    const user = this.usersRepository.findOne({username});
    if(user){
      return user;
    }
    throw new HttpException('User with this username not found', HttpStatus.NOT_FOUND);
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne(id, {withDeleted: true});
    if(user){
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async update(id: number, user: UpdateUserDto) {
    await this.usersRepository.update(id, user);
    const updatedUser = this.usersRepository.findOne(id);
    if(updatedUser){
      return updatedUser;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async delete(id: number) {
    const deleteResponse = await this.usersRepository.softDelete(id);
    if(!deleteResponse.affected){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async restore(id: number) {
    const restoreResponse = await this.usersRepository.restore(id);
    if(!restoreResponse.affected){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number){
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersRepository.update(userId, { currentHashedRefreshToken });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number){
    const user = await this.findOne(userId);
    const isRefreshTokenMatching = await bcrypt.compare(refreshToken, user.currentHashedRefreshToken);
    if(isRefreshTokenMatching){
      return user;
    }
  }

  async removeRefreshToken(userId: number){
    return this.usersRepository.update(userId, {currentHashedRefreshToken: null});
  }
}
