import { Module } from '@nestjs/common';
import { ProductKeywordService } from './product-keyword.service';
import { ProductKeywordController } from './product-keyword.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductKeyword } from './entities/product-keyword.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProductKeyword])],
  controllers: [ProductKeywordController],
  providers: [ProductKeywordService],
  exports:[ProductKeywordService]
})
export class ProductKeywordModule {}
