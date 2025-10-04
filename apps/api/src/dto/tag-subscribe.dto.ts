import { createZodDto } from 'nestjs-zod';

import {
  tagSubscribeSchema,
  tagSubscribeItemListSchema,
  createTagSubscribeSchema,
  updateTagSubscribeSchema,
  deleteTagSubscribeSchema,
  searchTagSubscribeSchema
} from '@/endpoints/prisma/schemas/tag-subscribe.schema';

export class TagSubscribeDto extends createZodDto(tagSubscribeSchema) {}

// 태그 구독 생성 DTO
export class CreateTagSubscribeDto extends createZodDto(createTagSubscribeSchema) {}

// 태그 구독 수정 DTO
export class UpdateTagSubscribeDto extends createZodDto(updateTagSubscribeSchema) {}

// 태그 구독 삭제 DTO
export class DeleteTagSubscribeDto extends createZodDto(deleteTagSubscribeSchema) {}

// 태그 구독 검색 DTO
export class SearchTagSubscribeDto extends createZodDto(searchTagSubscribeSchema) {}

// Swagger 문서화를 위한 태그 구독 아이템 DTO
export class TagSubscribeItemDto extends createZodDto(tagSubscribeItemListSchema) {}
