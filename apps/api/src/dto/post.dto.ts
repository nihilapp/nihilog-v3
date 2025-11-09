import {
  createPostBookmarkSchema,
  createPostSchema,
  createPostShareLogSchema,
  createPostViewLogSchema,
  deletePostBookmarkSchema,
  deletePostSchema,
  searchPostBookmarkSchema,
  searchPostSchema,
  updatePostSchema
} from '@nihilog/schemas';
import { createZodDto } from 'nestjs-zod';

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

// 포스트 조회 로그 생성 DTO
export class CreatePostViewLogDto extends createZodDto(createPostViewLogSchema) {}

// 포스트 공유 로그 생성 DTO
export class CreatePostShareLogDto extends createZodDto(createPostShareLogSchema) {}
