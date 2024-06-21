import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PasswordService } from 'src/password/password.service';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, PasswordService],
  exports:[UserService, PasswordService]
})
export class UserModule {}
