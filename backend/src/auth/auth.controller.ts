import { Controller, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiTags, ApiResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@Controller('auth')
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: 400,
    description: 'Invalid data'
  })
  registerUser(@Body() userObject: CreateUserDto) {
    return this.authService.register(userObject);
  }

  @Post('login')
  @ApiNotFoundResponse({description:"User Not found"})
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    schema: {
      example: {
        "payload": {
          "userid": "string",
          "email": "string",
          "role": "string"
        },
        "token": "token"
      }
    }
  })
  loginUser(@Body() userObjectLogin: LoginAuthDto){
    return this.authService.login(userObjectLogin);
  }
  
}
