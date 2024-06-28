import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import {v4 as uuid} from  'uuid';
import { Repository } from 'typeorm';
import { ProductCategoryService } from 'src/product-category/product-category.service';
import { ReviewService } from 'src/review/review.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private readonly productCategoryService:ProductCategoryService,
    private readonly reviewsService:ReviewService
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  async findByCategory( id:string) {
    const products= await this.productCategoryService.findCategory(id)
    let out=[]
    for(let i=0;i<products.length;i++){
      const product=products[i]
      out.push(this.findOne(product.productid))
    }
    return out;
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { productid: id,deletedat: null } });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async findAll() {
    return await this.productsRepository.find({
      where: {
        deletedat: null
      }
    });
  }

  async findOneD(id: string): Promise<Product> {
    
    const product = await this.productsRepository.findOne({ where: { productid: id } });
    console.log(product)
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async findAllD() {
    return await this.productsRepository.find({});
  }

  

  async findProductSummary(productId: string): Promise<any> {
    const query = this.productsRepository.createQueryBuilder('p')
    .select([
      'p.productid as productid',
      'p.name as name',
      'p.description as description',
      'p.price as price',
      'p.stock as stock',
      'p.discount as discount',
      'p.createdat as createdat',
      'p.deletedat as deletedat',
      'p.lastmodifiedby as lastmodifiedby',
      'p.lastmodifiedat as lastmodifiedat',
    ])
    .addSelect('array_agg(DISTINCT pi.img) as imageurls')
    .addSelect('array_agg(DISTINCT pk.keyword) as keywords')
    .addSelect('array_agg(DISTINCT c.name) as categories')
    .innerJoin('productcategory', 'pc', 'p.productid = pc.productid')
    .innerJoin('productimage', 'pi', 'p.productid = pi.productid')
    .innerJoin('productkeyword', 'pk', 'p.productid = pk.productid')
    .innerJoin('category', 'c', 'pc.categoryid = c.categoryid')
    .where('p.productid = :productId', { productId })
    .groupBy('p.productid')
    .orderBy('p.name');
    const resultQ = await query.getRawMany()
    let result={
      ...resultQ.pop(),
      reviewscount:0,
      rating:0
    }

    if(result.deletedat || !result.productid){
      throw new NotFoundException(`Product with ID ${productId} not found`)
    }
    const reviews=await this.reviewsService.findByProduct(productId)
    result.reviewscount=reviews.length
    let rating=0
    for (let i=0;i<reviews.length;i++){
      const review=reviews[i]
      rating+=review.rate
    }
    rating=rating/(reviews.length|1)
    result.rating=rating
    return result;
    }
  
    async findAllProductSummary() {
      const query = this.productsRepository.createQueryBuilder('p')
      .select([
        'p.productid as productid',
        'p.name as name',
        'p.description as description',
        'p.price as price',
        'p.stock as stock',
        'p.discount as discount',
        'p.createdat as createdat',
        'p.deletedat as deletedat',
        'p.lastmodifiedby as lastmodifiedby',
        'p.lastmodifiedat as lastmodifiedat',
      ])
      .addSelect('array_agg(DISTINCT pi.img) as imageurls')
      .addSelect('array_agg(DISTINCT pk.keyword) as keywords')
      .addSelect('array_agg(DISTINCT c.name) as categories')
      .innerJoin('productcategory', 'pc', 'p.productid = pc.productid')
      .innerJoin('productimage', 'pi', 'p.productid = pi.productid')
      .innerJoin('productkeyword', 'pk', 'p.productid = pk.productid')
      .innerJoin('category', 'c', 'pc.categoryid = c.categoryid')
      .groupBy('p.productid')
      .orderBy('p.name');
      const resultQ = await query.getRawMany()
      let result=[]
      for(let i=0;i<resultQ.length;i++){
        let product={
          ...resultQ[i],
          reviewscount:0,
          rating:0
        }
    
        if(product.deletedat || !product.productid){
          
        }else{
          const reviews=await this.reviewsService.findByProduct(product.productid)
          product.reviewscount=reviews.length
          let rating=0
          for (let i=0;i<reviews.length;i++){
            const review=reviews[i]
            rating+=review.rate
          }
          rating=rating/(reviews.length|1)
          product.rating=rating
          result.push(product)
      }

      }
      
      return result;
      }


  async update(id: uuid, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.preload({
      ...updateProductDto
    })
    if(!product){
      throw new NotFoundException("Category not found")
    }
    return await this.productsRepository.save(product);
  }

  async remove(id: uuid) {
    let product=await this.findOne(id)
    product.deletedat=new Date()
    return await this.productsRepository.save(product);
  }
}
