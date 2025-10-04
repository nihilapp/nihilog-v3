import { createZodDto } from 'nestjs-zod';

import {
  createPostBookmarkSchema,
  deletePostBookmarkSchema,
  searchPostBookmarkSchema
} from '@/endpoints/prisma/schemas/bookmark.schema';

// 게시글 북마크 생성 DTO
export class CreatePostBookmarkDto extends createZodDto(createPostBookmarkSchema) {}

// 게시글 북마크 삭제 DTO
export class DeletePostBookmarkDto extends createZodDto(deletePostBookmarkSchema) {}

// 게시글 북마크 검색 DTO
export class SearchPostBookmarkDto extends createZodDto(searchPostBookmarkSchema) {}
