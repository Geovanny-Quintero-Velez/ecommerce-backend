import { PartialType } from '@nestjs/swagger';
import { CreateWishListDto } from './create-wish-list.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateWishListDto extends PartialType(CreateWishListDto) {

}
