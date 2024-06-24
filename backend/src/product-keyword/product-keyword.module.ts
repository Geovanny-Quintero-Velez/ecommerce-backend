import { Module } from '@nestjs/common';
import { ProductKeywordService } from './product-keyword.service';
import { ProductKeywordController } from './product-keyword.controller';

@Module({
  controllers: [ProductKeywordController],
  providers: [ProductKeywordService],
  exports:[ProductKeywordService]
})
export class ProductKeywordModule {}
