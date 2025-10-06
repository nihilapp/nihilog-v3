import { Injectable } from '@nestjs/common';

import { CategoryRepository } from '@/endpoints/repositories/category.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) { }
}
