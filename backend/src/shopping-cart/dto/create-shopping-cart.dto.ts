import { IsOptional ,IsUUID,IsNotEmpty} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateOrderDetailDto } from 'src/order-detail/dto/update-order-detail.dto';

export class CreateShoppingCartDto {

  @IsUUID()
  @IsNotEmpty()
  orderid: string;

  @Type(() => UpdateOrderDetailDto)
  @IsOptional()
  items?: UpdateOrderDetailDto[];


    
}
