import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductCategoryModule } from '../product-category/product-category.module';
import { ReviewModule } from '../review/review.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]),ProductCategoryModule,ReviewModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports:[ProductService]
})
export class ProductModule {}
