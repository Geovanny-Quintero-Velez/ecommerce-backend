import { Module } from '@nestjs/common';
import { WishListService } from './wish-list.service';
import { WishListController } from './wish-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishList } from './entities/wish-list.entity';
import { ReviewModule } from '../review/review.module';

@Module({
  imports:[TypeOrmModule.forFeature([WishList]),ReviewModule],
  controllers: [WishListController],
  providers: [WishListService],
})
export class WishListModule {}
