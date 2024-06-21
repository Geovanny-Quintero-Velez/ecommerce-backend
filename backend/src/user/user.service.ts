import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {v4 as uuid} from  'uuid';
import { User } from './entities/user.entity';
import { Role } from './role/role.enum';
import { PasswordService } from 'src/password/password.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private usersRepository: Repository<User>,
  private passwordService: PasswordService){

  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.passwordService.hashPassword(createUserDto.password);

    const user = this.usersRepository.create({
      ...createUserDto,
      role: Role.USER,
      password: hashedPassword,
    });

    return await this.usersRepository.save(user);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { userid: id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async update(id: uuid, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.preload({
      ...updateUserDto,
    })
    if(!user){
      throw new NotFoundException("Category not found")
    }
    return await this.usersRepository.save(user);
  }

  async remove(id: uuid) {
    const user=await this.findOne(id)
    return await this.usersRepository.remove(user);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && await this.passwordService.comparePasswords(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.validateUser(loginUserDto.email, loginUserDto.password);
    if (!user) {
      throw new NotFoundException("Invalid credentials");
    } else {
      return user;
    }
  }
}
