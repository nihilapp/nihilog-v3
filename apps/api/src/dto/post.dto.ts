import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';

import type { YnType } from '@/endpoints/drizzle/schemas/common.schema';
import {
  postSchema,
  createPostSchema,
  updatePostSchema,
  deletePostSchema,
  searchPostSchema
} from '@/endpoints/drizzle/schemas/post.schema';

// 게시글 기본 DTO
export class PostDto extends createZodDto(postSchema) {
  @ApiProperty({
    description: '게시글 번호',
    example: 1,
    required: false,
  })
  declare pstNo?: number;

  @ApiProperty({
    description: '사용자 번호',
    example: 1,
  })
  declare userNo: number;

  @ApiProperty({
    description: '카테고리 번호',
    example: 1,
    required: false,
  })
  declare ctgryNo?: number | null;

  @ApiProperty({
    description: '게시글 제목',
    example: '게시글 제목입니다',
  })
  declare pstTtl: string;

  @ApiProperty({
    description: '게시글 요약',
    example: '게시글 요약입니다',
    required: false,
  })
  declare pstSmry?: string | null;

  @ApiProperty({
    description: '게시글 본문 (JSON)',
    example: { content: '게시글 본문입니다', },
  })
  declare pstMtxt: Record<string, any>;

  @ApiProperty({
    description: '게시글 코드 (슬러그)',
    example: 'post-slug',
    required: false,
  })
  declare pstCd?: string | null;

  @ApiProperty({
    description: '썸네일 링크',
    example: 'https://example.com/thumbnail.jpg',
    required: false,
  })
  declare pstThmbLink?: string | null;

  @ApiProperty({
    description: '조회수',
    example: 0,
  })
  declare pstView: number;

  @ApiProperty({
    description: '게시물 상태',
    enum: [ 'EMPTY', 'WRITING', 'FINISHED', ],
    example: 'EMPTY',
  })
  declare pstStts: 'EMPTY' | 'WRITING' | 'FINISHED';

  @ApiProperty({
    description: '발행 일시',
    example: '2024-01-01 00:00:00',
    required: false,
  })
  declare publDt?: string | null;

  @ApiProperty({
    description: '공개 여부',
    enum: [ 'Y', 'N', ],
    example: 'Y',
  })
  declare rlsYn: YnType;

  @ApiProperty({
    description: '보관 여부',
    enum: [ 'Y', 'N', ],
    example: 'N',
  })
  declare archYn: YnType;

  @ApiProperty({
    description: '비밀글 여부',
    enum: [ 'Y', 'N', ],
    example: 'N',
    required: false,
  })
  declare secrYn?: YnType | null;

  @ApiProperty({
    description: '게시물 비밀번호',
    example: 'password123',
    required: false,
  })
  declare pstPswd?: string | null;

  @ApiProperty({
    description: '사용 여부',
    enum: [ 'Y', 'N', ],
    example: 'Y',
  })
  declare useYn: YnType;

  @ApiProperty({
    description: '삭제 여부',
    enum: [ 'Y', 'N', ],
    example: 'N',
  })
  declare delYn: YnType;

  @ApiProperty({
    description: '생성자 번호',
    example: 1,
    required: false,
  })
  declare crtNo?: number | null;

  @ApiProperty({
    description: '생성 일시',
    example: '2024-01-01 00:00:00',
    required: false,
  })
  declare crtDt?: string | null;

  @ApiProperty({
    description: '수정자 번호',
    example: 1,
    required: false,
  })
  declare updtNo?: number | null;

  @ApiProperty({
    description: '수정 일시',
    example: '2024-01-01 00:00:00',
    required: false,
  })
  declare updtDt?: string | null;

  @ApiProperty({
    description: '삭제자 번호',
    example: 1,
    required: false,
  })
  declare delNo?: number | null;

  @ApiProperty({
    description: '삭제 일시',
    example: '2024-01-01 00:00:00',
    required: false,
  })
  declare delDt?: string | null;

  @ApiProperty({
    description: '행 번호',
    example: 1,
    required: false,
  })
  declare rowNo?: number;

  @ApiProperty({
    description: '총 개수',
    example: 10,
    required: false,
  })
  declare totalCnt?: number;

  @ApiProperty({
    description: '게시글 번호 목록',
    example: [ 1, 2, 3, ],
    required: false,
  })
  declare pstNoList?: number[];
}

// 게시글 생성 DTO
export class CreatePostDto extends createZodDto(createPostSchema) {
  @ApiProperty({
    description: '게시글 제목',
    example: '게시글 제목입니다',
  })
  declare pstTtl: string;

  @ApiProperty({
    description: '게시글 본문 (JSON)',
    example: { content: '게시글 본문입니다', },
  })
  declare pstMtxt: Record<string, any>;

  @ApiProperty({
    description: '게시글 요약',
    example: '게시글 요약입니다',
    required: false,
  })
  declare pstSmry?: string;

  @ApiProperty({
    description: '게시글 코드 (슬러그)',
    example: 'post-slug',
    required: false,
  })
  declare pstCd?: string;

  @ApiProperty({
    description: '썸네일 링크',
    example: 'https://example.com/thumbnail.jpg',
    required: false,
  })
  declare pstThmbLink?: string;

  @ApiProperty({
    description: '게시물 상태',
    enum: [ 'EMPTY', 'WRITING', 'FINISHED', ],
    example: 'EMPTY',
  })
  declare pstStts: 'EMPTY' | 'WRITING' | 'FINISHED';

  @ApiProperty({
    description: '발행 일시',
    example: '2024-01-01 00:00:00',
    required: false,
  })
  declare publDt?: string;

  @ApiProperty({
    description: '공개 여부',
    enum: [ 'Y', 'N', ],
    example: 'Y',
    required: false,
  })
  declare rlsYn?: YnType;

  @ApiProperty({
    description: '보관 여부',
    enum: [ 'Y', 'N', ],
    example: 'N',
    required: false,
  })
  declare archYn?: YnType;

  @ApiProperty({
    description: '비밀글 여부',
    enum: [ 'Y', 'N', ],
    example: 'N',
    required: false,
  })
  declare secrYn?: YnType;

  @ApiProperty({
    description: '게시물 비밀번호',
    example: 'password123',
    required: false,
  })
  declare pstPswd?: string;

  @ApiProperty({
    description: '카테고리 번호',
    example: 1,
    required: false,
  })
  declare ctgryNo?: number;

  @ApiProperty({
    description: '사용 여부',
    enum: [ 'Y', 'N', ],
    example: 'Y',
    required: false,
  })
  declare useYn?: YnType;

  @ApiProperty({
    description: '삭제 여부',
    enum: [ 'Y', 'N', ],
    example: 'N',
    required: false,
  })
  declare delYn?: YnType;
}

// 게시글 수정 DTO
export class UpdatePostDto extends createZodDto(updatePostSchema) {
  @ApiProperty({
    description: '게시글 번호',
    example: 1,
    required: false,
  })
  declare pstNo?: number;

  @ApiProperty({
    description: '게시글 제목',
    example: '수정된 게시글 제목입니다',
    required: false,
  })
  declare pstTtl?: string;

  @ApiProperty({
    description: '게시글 요약',
    example: '수정된 게시글 요약입니다',
    required: false,
  })
  declare pstSmry?: string;

  @ApiProperty({
    description: '게시글 본문 (JSON)',
    example: { content: '수정된 게시글 본문입니다', },
    required: false,
  })
  declare pstMtxt?: Record<string, any>;

  @ApiProperty({
    description: '게시글 코드 (슬러그)',
    example: 'updated-post-slug',
    required: false,
  })
  declare pstCd?: string;

  @ApiProperty({
    description: '썸네일 링크',
    example: 'https://example.com/updated-thumbnail.jpg',
    required: false,
  })
  declare pstThmbLink?: string;

  @ApiProperty({
    description: '게시물 상태',
    enum: [ 'EMPTY', 'WRITING', 'FINISHED', ],
    example: 'FINISHED',
    required: false,
  })
  declare pstStts?: 'EMPTY' | 'WRITING' | 'FINISHED';

  @ApiProperty({
    description: '발행 일시',
    example: '2024-01-01 00:00:00',
    required: false,
  })
  declare publDt?: string;

  @ApiProperty({
    description: '공개 여부',
    enum: [ 'Y', 'N', ],
    example: 'Y',
    required: false,
  })
  declare rlsYn?: YnType;

  @ApiProperty({
    description: '보관 여부',
    enum: [ 'Y', 'N', ],
    example: 'N',
    required: false,
  })
  declare archYn?: YnType;

  @ApiProperty({
    description: '비밀글 여부',
    enum: [ 'Y', 'N', ],
    example: 'N',
    required: false,
  })
  declare secrYn?: YnType;

  @ApiProperty({
    description: '게시물 비밀번호',
    example: 'password123',
    required: false,
  })
  declare pstPswd?: string;

  @ApiProperty({
    description: '카테고리 번호',
    example: 1,
    required: false,
  })
  declare ctgryNo?: number;

  @ApiProperty({
    description: '사용 여부',
    enum: [ 'Y', 'N', ],
    example: 'Y',
    required: false,
  })
  declare useYn?: YnType;

  @ApiProperty({
    description: '삭제 여부',
    enum: [ 'Y', 'N', ],
    example: 'N',
    required: false,
  })
  declare delYn?: YnType;

  @ApiProperty({
    description: '게시글 번호 목록',
    example: [ 1, 2, 3, ],
    required: false,
  })
  declare pstNoList?: number[];

  @ApiProperty({
    description: '수정자 번호',
    example: 1,
    required: false,
  })
  declare updtNo?: number;

  @ApiProperty({
    description: '수정 일시',
    example: '2024-01-01 00:00:00',
    required: false,
  })
  declare updtDt?: string;

  @ApiProperty({
    description: '삭제자 번호',
    example: 1,
    required: false,
  })
  declare delNo?: number;

  @ApiProperty({
    description: '삭제 일시',
    example: '2024-01-01 00:00:00',
    required: false,
  })
  declare delDt?: string;
}

// 게시글 삭제 DTO
export class DeletePostDto extends createZodDto(deletePostSchema) {
  @ApiProperty({
    description: '게시글 번호',
    example: 1,
    required: false,
  })
  declare pstNo?: number;

  @ApiProperty({
    description: '게시글 번호 목록',
    example: [ 1, 2, 3, ],
    required: false,
  })
  declare pstNoList?: number[];
}

// 게시글 검색 DTO
export class SearchPostDto extends createZodDto(searchPostSchema) {
  @ApiProperty({
    description: '검색 타입 (pstTtl, pstSmry, pstMtxt 중 하나)',
    example: 'pstTtl',
    required: false,
    enum: [ 'pstTtl', 'pstSmry', 'pstMtxt', ],
  })
  declare srchType?: 'pstTtl' | 'pstSmry' | 'pstMtxt';
}
