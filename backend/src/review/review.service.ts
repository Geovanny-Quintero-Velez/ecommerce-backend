import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const review = this.reviewRepository.create(createReviewDto);
    return this.reviewRepository.save(review);
  }

  async update(id: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const review = await this.reviewRepository.preload({
      reviewid: id,
      ...updateReviewDto,
    });
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return this.reviewRepository.save(review);
  }

  async findOne(id: string): Promise<Review> {
    const review = await this.reviewRepository.findOne({ where: { reviewid: id,deletedat: null } });
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return review;
  }

  async findByProduct(id: string): Promise<Review[]> {
    const review = await this.reviewRepository.find({ where: { productid: id,deletedat: null } });
    return review;
  }

  async findAll(): Promise<Review[]> {
    return this.reviewRepository.find({where:{deletedat: null}});
  }

  async findOneD(id: string): Promise<Review> {
    const review = await this.reviewRepository.findOne({ where: { reviewid: id } });
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return review;
  }


  async findAllD(): Promise<Review[]> {
    return this.reviewRepository.find({});
  }

  async remove(id: string): Promise<Review> {
    let result = await this.findOne(id);
    result.deletedat=new Date()
    return this.reviewRepository.save(result)


  }
}
