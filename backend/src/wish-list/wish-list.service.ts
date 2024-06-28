import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWishListDto } from './dto/create-wish-list.dto';
import { UpdateWishListDto } from './dto/update-wish-list.dto';
import { WishList } from './entities/wish-list.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WishListService {
  constructor(
    @InjectRepository(WishList)
    private wishListRepository: Repository<WishList>,
  ) {}

  async create(createWishListDto: CreateWishListDto): Promise<WishList> {
    const wishList = this.wishListRepository.create(createWishListDto);
    return this.wishListRepository.save(wishList);
  }

  async update(id: string, updateWishListDto: UpdateWishListDto): Promise<WishList> {
    const wishList = await this.wishListRepository.preload({
      wishlistid: id,
      ...updateWishListDto,
    });
    if (!wishList) {
      throw new NotFoundException('WishList not found');
    }
    return this.wishListRepository.save(wishList);
  }

  async findOne(id: string): Promise<WishList> {
    const wishList = await this.wishListRepository.findOne({ where: { wishlistid: id, deletedat:null } });
    if (!wishList) {
      throw new NotFoundException('WishList not found');
    }
    return wishList;
  }

  async findAll(): Promise<WishList[]> {
    return this.wishListRepository.find({where:{deletedat:null}});
  }

  async findOneD(id: string): Promise<WishList> {
    const wishList = await this.wishListRepository.findOne({ where: { wishlistid: id } });
    if (!wishList) {
      throw new NotFoundException('WishList not found');
    }
    return wishList;
  }

  async findAllD(): Promise<WishList[]> {
    return this.wishListRepository.find({});
  }

  async remove(id: string): Promise<WishList> {
    let result = await this.findOne(id);
    result.deletedat=new Date()
    return this.wishListRepository.save(result)
  }
}
