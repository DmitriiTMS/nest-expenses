import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto, id: number) {
    const isExist = await this.categoryRepository.findBy({
      user: {
        id: id
      },
      title: createCategoryDto.title
    })
    if(isExist.length) throw new BadRequestException('Категория с таким заголовком уже существует category.service.ts')
    const newCategory = {
      title: createCategoryDto.title,
      user: {
        id: id
      }
    }
    return await this.categoryRepository.save(newCategory);
  }

  async findAll(id: number) {
    return await this.categoryRepository.find({
      where: {
        user: {
          id: id
        }
      },
      relations: {
        transactions: true
      }
    });
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id: id},
      relations: {
        user: true,
        transactions: true
      }
    });
     if(!category) throw new NotFoundException('Такой категории не существует category.service.ts findOne')
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: { id: id}
    });
    if(!category) throw new NotFoundException('Такой категории не существует category.service.ts update')
    return await this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id: id}
    });
    if(!category) throw new NotFoundException('Такой категории не существует category.service.ts remove')
    return this.categoryRepository.delete(id);
  }
}
