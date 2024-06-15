import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import {v4 as uuid} from  'uuid';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {

  constructor(@InjectRepository(Category) private readonly categoriesRepository:Repository<Category>){
    
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const category= this.categoriesRepository.create(createCategoryDto)

    return await this.categoriesRepository.save(category);
  }

  async findAll() {
    return await this.categoriesRepository.find();
  }

  async findOne(id: uuid) {
    console.log("**********************")
    console.log("La id:"+id)
    console.log("**********************")
    const category = await this.categoriesRepository.findOne({ where: { categoryId: id } });
    if(!category){
        throw new NotFoundException("Category not found")
    }
    return category;
  }

  async update(id: uuid, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.preload({
      ...updateCategoryDto
    })
    if(!category){
      throw new NotFoundException("Category not found")
    }
    return await this.categoriesRepository.save(category);
  }

  async remove(id: uuid) {
    const category=await this.findOne(id)
    return await this.categoriesRepository.remove(category);
  }
}
