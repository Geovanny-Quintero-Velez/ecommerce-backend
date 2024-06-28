import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {v4 as uuid} from  'uuid';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private usersRepository: Repository<User>){

  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { userid: id,deletedat: null  } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email,deletedat: null  } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async findAll() {
    return await this.usersRepository.find({ where: { deletedat: null  }});
  }

  async update(id: uuid, updateUserDto: UpdateUserDto) {
    if(!updateUserDto.userid){
      updateUserDto.userid=id
    }
    const user = await this.usersRepository.preload({
      ...updateUserDto
    })
    if(!user){
      throw new NotFoundException("Category not found")
    }
    return await this.usersRepository.save(user);
  }

  async remove(id: uuid) {
    let user=await this.findOne(id)
    user.deletedat=new Date()
    return await this.usersRepository.save(user);
  }
}
