import { createZodDto } from 'nestjs-zod';

import {
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
  searchCategorySchema
} from '@/endpoints/prisma/schemas/category.schema';

export class CreateCategoryDto extends createZodDto(createCategorySchema) {}
export class UpdateCategoryDto extends createZodDto(updateCategorySchema) {}
export class DeleteCategoryDto extends createZodDto(deleteCategorySchema) {}
export class SearchCategoryDto extends createZodDto(searchCategorySchema) {}
