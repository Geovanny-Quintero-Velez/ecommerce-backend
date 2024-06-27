import { Controller, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() userObject: CreateUserDto) {
    return this.authService.register(userObject);
  }

  @Post('login')
  loginUser(@Body() userObjectLogin: LoginAuthDto){
    return this.authService.login(userObjectLogin);
  }
  
}
