import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { hash, compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { Role } from 'src/user/Role/role.enum';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService:UserService,
    private jwtService: JwtService
    ) {}

  async register(userDto: CreateUserDto){
    const { password } = userDto;
    const plainToHash = await hash(password, 10);
    const userObject = new CreateUserDto();
    userObject.email = userDto.email;
    userObject.username = userDto.username;
    userObject.password = plainToHash;
    userObject.role = Role.USER;
    userObject.name=userDto.name;
    userObject.lastname=userDto.lastname;
    userObject.birthdate=userDto.birthdate
    return this.userService.create(userObject);
  }

  async login(userObjectLogin:LoginAuthDto){
    const { email, password } = userObjectLogin;
    const findUser = await this.userService.findByEmail(email)
    if(!findUser) throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);

    const checkPassword = await compare(password, findUser.password);

    if(!checkPassword) throw new HttpException('INVALID_PASSWORD', HttpStatus.FORBIDDEN);

    const payload = {userid: findUser.userid, email: findUser.email, role: findUser.role};
    
    const token = await this.jwtService.sign(payload);
    const data = {
      payload,
      token
    };

    return data;
  }

  private decodeToken(token: string){
    console.log(token)
    return this.jwtService.decode(token);
  }
}
