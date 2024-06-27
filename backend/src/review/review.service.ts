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
    const review = await this.reviewRepository.findOne({ where: { reviewid: id } });
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return review;
  }

  async findByProduct(id: string): Promise<Review[]> {
    const review = await this.reviewRepository.find({ where: { productid: id } });
    return review;
  }

  async findAll(): Promise<Review[]> {
    return this.reviewRepository.find();
  }

  async remove(id: string): Promise<void> {
    const result = await this.reviewRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Review not found');
    }
  }
}
