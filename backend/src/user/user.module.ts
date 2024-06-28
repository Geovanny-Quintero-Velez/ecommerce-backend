import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports:[TypeOrmModule.forFeature([User]),OrderModule],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
