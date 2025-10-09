import { createZodDto } from 'nestjs-zod';

import {
  createPostBookmarkSchema,
  createPostSchema,
  deletePostBookmarkSchema,
  deletePostSchema,
  searchPostBookmarkSchema,
  searchPostSchema,
  updatePostSchema,
  analyzeStatSchema
} from '@/endpoints/prisma/schemas/post.schema';

// 게시글 생성 DTO
export class CreatePostDto extends createZodDto(createPostSchema) {}

// 게시글 수정 DTO
export class UpdatePostDto extends createZodDto(updatePostSchema) {}

// 게시글 삭제 DTO
export class DeletePostDto extends createZodDto(deletePostSchema) {}

// 게시글 검색 DTO
export class SearchPostDto extends createZodDto(searchPostSchema) {}

// 게시글 조회수 통계 DTO
export class AnalyzeStatDto extends createZodDto(analyzeStatSchema) {}

// 게시글 북마크 생성 DTO
export class CreatePostBookmarkDto extends createZodDto(createPostBookmarkSchema) {}

// 게시글 북마크 삭제 DTO
export class DeletePostBookmarkDto extends createZodDto(deletePostBookmarkSchema) {}

// 게시글 북마크 검색 DTO
export class SearchPostBookmarkDto extends createZodDto(searchPostBookmarkSchema) {}
