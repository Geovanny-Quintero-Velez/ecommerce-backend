import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateJwtToken(token: string): Promise<User> {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.userService.findOne(decoded.sub);
      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }

  private generateAccessToken(user: User): string {
    const payload: JwtPayload = { sub: user.userid, role: user.role };
    return this.jwtService.sign(payload);
  }

}
