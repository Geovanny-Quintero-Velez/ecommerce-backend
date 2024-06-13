import { Test, TestingModule } from '@nestjs/testing';
import { ProductKeywordController } from './product-keyword.controller';
import { ProductKeywordService } from './product-keyword.service';

describe('ProductKeywordController', () => {
  let controller: ProductKeywordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductKeywordController],
      providers: [ProductKeywordService],
    }).compile();

    controller = module.get<ProductKeywordController>(ProductKeywordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
