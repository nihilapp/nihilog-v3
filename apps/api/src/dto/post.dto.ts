import { createZodDto } from 'nestjs-zod';

import {
  createPostBookmarkSchema,
  createPostSchema,
  deletePostBookmarkSchema,
  deletePostSchema,
  searchPostBookmarkSchema,
  searchPostSchema,
  updatePostSchema
} from '@/endpoints/prisma/schemas/post.schema';

// 포스트 생성 DTO
export class CreatePostDto extends createZodDto(createPostSchema) {}

// 포스트 수정 DTO
export class UpdatePostDto extends createZodDto(updatePostSchema) {}

// 포스트 삭제 DTO
export class DeletePostDto extends createZodDto(deletePostSchema) {}

// 포스트 검색 DTO
export class SearchPostDto extends createZodDto(searchPostSchema) {}

// 포스트 북마크 생성 DTO
export class CreatePostBookmarkDto extends createZodDto(createPostBookmarkSchema) {}

// 포스트 북마크 삭제 DTO
export class DeletePostBookmarkDto extends createZodDto(deletePostBookmarkSchema) {}

// 포스트 북마크 검색 DTO
export class SearchPostBookmarkDto extends createZodDto(searchPostBookmarkSchema) {}
