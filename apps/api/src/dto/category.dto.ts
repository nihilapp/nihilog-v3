import {
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
  searchCategorySchema
} from '@nihilog/schemas';
import { createZodDto } from 'nestjs-zod';

export class CreateCategoryDto extends createZodDto(createCategorySchema) {}
export class UpdateCategoryDto extends createZodDto(updateCategorySchema) {}
export class DeleteCategoryDto extends createZodDto(deleteCategorySchema) {}
export class SearchCategoryDto extends createZodDto(searchCategorySchema) {}
