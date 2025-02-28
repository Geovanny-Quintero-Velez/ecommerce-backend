import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWishListDto } from './dto/create-wish-list.dto';
import { UpdateWishListDto } from './dto/update-wish-list.dto';
import { WishList } from './entities/wish-list.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewService } from '../review/review.service';

@Injectable()
export class WishListService {
  constructor(
    @InjectRepository(WishList)
    private wishListRepository: Repository<WishList>,
    private readonly reviewsService:ReviewService
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

  async findProducts(id: string): Promise<WishList> {
    const wishList = await this.wishListRepository.findOne({ where: { wishlistid: id, deletedat:null } });
    if (!wishList) {
      throw new NotFoundException('WishList not found');
    }
    return wishList;
  }

  async findWishListSummary(userId: string): Promise<any> {
    const query = this.wishListRepository.createQueryBuilder('w')
    .select([
      'p.productid as productid',
      'p.name as name',
      'p.description as description',
      'p.price as price',
      'p.keyword as keyword',
      'p.stock as stock',
      'p.discount as discount',
      'p.createdat as createdat',
      'p.deletedat as deletedat',
      'p.lastmodifiedby as lastmodifiedby',
      'p.lastmodifiedat as lastmodifiedat',
    ])
    .addSelect("array_agg(DISTINCT jsonb_build_object('img', pi.img, 'imageid', pi.imageid)) as images")
    .addSelect("array_agg(DISTINCT jsonb_build_object('category', c.name, 'categoryid', c.categoryid)) as categories")
    .innerJoin('product', 'p', 'p.productid = w.productid')
    .innerJoin('productcategory', 'pc', 'p.productid = pc.productid')
    .innerJoin('productimage', 'pi', 'p.productid = pi.productid')
    .innerJoin('category', 'c', 'pc.categoryid = c.categoryid')
    .where('w.userid = :userId', { userId })
    .groupBy('p.productid')
    .orderBy('p.name');
    const resultQ = await query.getRawMany()
    console.log(resultQ)
    /*
    let result={
      ...resultQ.pop(),
      reviewscount:0,
      rating:0
    }
    if(result.deletedat || !result.productid){
      throw new NotFoundException(`Product with ID ${userId} not found`)
    }
    const reviews=await this.reviewsService.findByProduct(userId)
    result.reviewscount=reviews.length
    let rating=0
    for (let i=0;i<reviews.length;i++){
      const review=reviews[i]
      rating+=review.rate
    }
    rating=rating/(reviews.length|1)
    result.rating=rating*/
    return resultQ;
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
