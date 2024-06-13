import { PartialType } from '@nestjs/swagger';
import { CreateProductKeywordDto } from './create-product-keyword.dto';

export class UpdateProductKeywordDto extends PartialType(CreateProductKeywordDto) {}
