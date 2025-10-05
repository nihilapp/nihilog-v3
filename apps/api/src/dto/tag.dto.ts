import { createZodDto } from 'nestjs-zod';

import {
  createTagSchema,
  updateTagSchema,
  deleteTagSchema,
  createPstTagMpngSchema,
  updatePstTagMpngSchema,
  deletePstTagMpngSchema,
  searchTagSchema,
  searchPstTagMpngSchema
} from '@/endpoints/prisma/schemas/tag.schema';

// 태그 생성 DTO
export class CreateTagDto extends createZodDto(createTagSchema) {}

// 태그 수정 DTO
export class UpdateTagDto extends createZodDto(updateTagSchema) {}

// 태그 삭제 DTO
export class DeleteTagDto extends createZodDto(deleteTagSchema) { }

export class SearchTagDto extends createZodDto(searchTagSchema) {}

// 포스트-태그 매핑 생성 DTO
export class CreatePstTagMpngDto extends createZodDto(createPstTagMpngSchema) {}

// 포스트-태그 매핑 수정 DTO
export class UpdatePstTagMpngDto extends createZodDto(updatePstTagMpngSchema) {}

// 포스트-태그 매핑 삭제 DTO
export class DeletePstTagMpngDto extends createZodDto(deletePstTagMpngSchema) { }

export class SearchPstTagMpngDto extends createZodDto(searchPstTagMpngSchema) {}
