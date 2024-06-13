import { Test, TestingModule } from '@nestjs/testing';
import { ProductKeywordService } from './product-keyword.service';

describe('ProductKeywordService', () => {
  let service: ProductKeywordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductKeywordService],
    }).compile();

    service = module.get<ProductKeywordService>(ProductKeywordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
