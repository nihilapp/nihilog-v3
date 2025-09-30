import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';

import {
  categorySubscribeSchema,
  categorySubscribeItemListSchema,
  createCategorySubscribeSchema,
  updateCategorySubscribeSchema,
  multipleCreateCategorySubscribeSchema,
  multipleUpdateCategorySubscribeSchema,
  multipleDeleteCategorySubscribeSchema
} from '@/endpoints/drizzle/schemas/category-subscribe.schema';
import type { YnType } from '@/endpoints/drizzle/schemas/common.schema';

import { SearchDto } from './search.dto';

// 카테고리 구독 기본 DTO
export class CategorySubscribeDto extends createZodDto(categorySubscribeSchema) {
  @ApiProperty({
    description: '카테고리 구독 번호',
    example: 1,
    required: false,
  })
  declare ctgrySbcrNo?: number;

  @ApiProperty({
    description: '구독 번호',
    example: 1,
    required: false,
  })
  declare sbcrNo?: number;

  @ApiProperty({
    description: '카테고리 번호',
    example: 1,
    required: false,
  })
  declare ctgryNo?: number;

  @ApiProperty({
    description: '카테고리 이름',
    example: 'JavaScript',
    required: false,
  })
  declare ctgryNm?: string;

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
    description: '사용 여부',
    example: 'Y',
    enum: [ 'Y', 'N', ],
    required: true,
  })
  declare useYn: YnType;

  @ApiProperty({
    description: '삭제 여부',
    example: 'N',
    enum: [ 'Y', 'N', ],
    required: true,
  })
  declare delYn: YnType;

  @ApiProperty({
    description: '생성자 번호',
    example: 1,
    required: false,
  })
  declare crtNo?: number;

  @ApiProperty({
    description: '생성 일시',
    example: '2024-01-01 00:00:00',
    required: false,
  })
  declare crtDt?: string;

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

// 카테고리 구독 생성 DTO
export class CreateCategorySubscribeDto extends createZodDto(createCategorySubscribeSchema) {
  @ApiProperty({
    description: '구독 번호',
    example: 1,
  })
  declare sbcrNo: number;

  @ApiProperty({
    description: '카테고리 번호',
    example: 1,
  })
  declare ctgryNo: number;

  @ApiProperty({
    description: '사용 여부',
    example: 'Y',
    enum: [ 'Y', 'N', ],
  })
  declare useYn: YnType;

  @ApiProperty({
    description: '삭제 여부',
    example: 'N',
    enum: [ 'Y', 'N', ],
  })
  declare delYn: YnType;
}

// 카테고리 구독 수정 DTO
export class UpdateCategorySubscribeDto extends createZodDto(updateCategorySubscribeSchema) {
  @ApiProperty({
    description: '카테고리 구독 번호',
    example: 1,
    required: false,
  })
  declare ctgrySbcrNo?: number;

  @ApiProperty({
    description: '구독 번호',
    example: 1,
    required: false,
  })
  declare sbcrNo?: number;

  @ApiProperty({
    description: '카테고리 번호',
    example: 1,
    required: false,
  })
  declare ctgryNo?: number;

  @ApiProperty({
    description: '사용 여부',
    example: 'Y',
    enum: [ 'Y', 'N', ],
    required: false,
  })
  declare useYn?: YnType;

  @ApiProperty({
    description: '삭제 여부',
    example: 'N',
    enum: [ 'Y', 'N', ],
    required: false,
  })
  declare delYn?: YnType;

  @ApiProperty({
    description: '카테고리 번호 목록',
    example: [ 1, 2, 3, ],
    required: false,
  })
  declare ctgryNoList?: number[];
}

// 카테고리 구독 다건 생성 DTO
export class MultipleCreateCategorySubscribeDto extends createZodDto(multipleCreateCategorySubscribeSchema) {
  @ApiProperty({
    description: '구독 번호',
    example: 1,
  })
  declare sbcrNo: number;

  @ApiProperty({
    description: '카테고리 번호 목록',
    example: [ 1, 2, 3, ],
  })
  declare ctgryNoList: number[];

  @ApiProperty({
    description: '사용 여부',
    example: 'Y',
    enum: [ 'Y', 'N', ],
  })
  declare useYn: YnType;

  @ApiProperty({
    description: '삭제 여부',
    example: 'N',
    enum: [ 'Y', 'N', ],
  })
  declare delYn: YnType;
}

// 카테고리 구독 다건 수정 DTO
export class MultipleUpdateCategorySubscribeDto extends createZodDto(multipleUpdateCategorySubscribeSchema) {
  @ApiProperty({
    description: '카테고리 구독 번호 목록',
    example: [ 1, 2, 3, ],
    required: false,
  })
  declare ctgrySbcrNoList?: number[];

  @ApiProperty({
    description: '구독 번호',
    example: 1,
    required: false,
  })
  declare sbcrNo?: number;

  @ApiProperty({
    description: '카테고리 번호 목록',
    example: [ 1, 2, 3, ],
    required: false,
  })
  declare ctgryNoList?: number[];

  @ApiProperty({
    description: '사용 여부',
    example: 'Y',
    enum: [ 'Y', 'N', ],
    required: false,
  })
  declare useYn?: YnType;

  @ApiProperty({
    description: '삭제 여부',
    example: 'N',
    enum: [ 'Y', 'N', ],
    required: false,
  })
  declare delYn?: YnType;
}

// 카테고리 구독 다건 삭제 DTO
export class MultipleDeleteCategorySubscribeDto extends createZodDto(multipleDeleteCategorySubscribeSchema) {
  @ApiProperty({
    description: '카테고리 구독 번호 목록',
    example: [ 1, 2, 3, ],
  })
  declare ctgrySbcrNoList: number[];

  @ApiProperty({
    description: '구독 번호',
    example: 1,
  })
  declare sbcrNo: number;
}

// 카테고리 구독 검색 DTO
export class SearchCategorySubscribeDto extends SearchDto {
  @ApiProperty({
    description: '검색 타입 (ctgryNm 중 하나)',
    example: 'ctgryNm',
    required: false,
    enum: [ 'ctgryNm', ],
  })
  declare srchType?: 'ctgryNm';
}

// Swagger 문서화를 위한 카테고리 구독 아이템 DTO
export class CategorySubscribeItemDto extends createZodDto(categorySubscribeItemListSchema) {
  @ApiProperty({
    description: '카테고리 번호',
    example: 1,
  })
  declare ctgryNo: number;

  @ApiProperty({
    description: '카테고리 이름',
    example: '카테고리 1',
  })
  declare ctgryNm: string;
}
