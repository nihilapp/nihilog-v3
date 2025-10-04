import { createZodDto } from 'nestjs-zod';

import {
  createPostSchema,
  deletePostSchema,
  searchPostSchema,
  updatePostSchema
} from '@/endpoints/prisma/schemas/post.schema';

// 게시글 생성 DTO
export class CreatePostDto extends createZodDto(createPostSchema) {}

// 게시글 수정 DTO
export class UpdatePostDto extends createZodDto(updatePostSchema) {}

// 게시글 삭제 DTO
export class DeletePostDto extends createZodDto(deletePostSchema) {}

// 게시글 검색 DTO
export class SearchPostDto extends createZodDto(searchPostSchema) {}
