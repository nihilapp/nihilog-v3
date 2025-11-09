import {
  categorySubscribeSchema,
  categorySubscribeItemListSchema,
  createCategorySubscribeSchema,
  updateCategorySubscribeSchema,
  deleteCategorySubscribeSchema,
  searchCategorySubscribeSchema
} from '@nihilog/schemas';
import { createZodDto } from 'nestjs-zod';

// 카테고리 구독 기본 DTO
export class CategorySubscribeDto extends createZodDto(categorySubscribeSchema) {}

// 카테고리 구독 생성 DTO
export class CreateCategorySubscribeDto extends createZodDto(createCategorySubscribeSchema) {}

// 카테고리 구독 수정 DTO
export class UpdateCategorySubscribeDto extends createZodDto(updateCategorySubscribeSchema) {}

// 카테고리 구독 삭제 DTO
export class DeleteCategorySubscribeDto extends createZodDto(deleteCategorySubscribeSchema) {}

// 카테고리 구독 검색 DTO
export class SearchCategorySubscribeDto extends createZodDto(searchCategorySubscribeSchema) {}

// Swagger 문서화를 위한 카테고리 구독 아이템 DTO
export class CategorySubscribeItemDto extends createZodDto(categorySubscribeItemListSchema) {}
