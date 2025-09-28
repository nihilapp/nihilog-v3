import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';

import type { YnType } from '@/endpoints/drizzle/schemas/common.schema';
import {
  tagSubscribeSchema,
  tagSubscribeItemListSchema,
  createTagSubscribeSchema,
  updateTagSubscribeSchema,
  multipleCreateTagSubscribeSchema,
  multipleUpdateTagSubscribeSchema,
  multipleDeleteTagSubscribeSchema,
  searchTagSubscribeSchema
} from '@/endpoints/drizzle/schemas/tag-subscribe.schema';

export class TagSubscribeDto extends createZodDto(tagSubscribeSchema) {
  @ApiProperty({
    description: '태그 구독 번호',
    example: 1,
    required: false,
  })
  declare tagSbcrNo?: number;

  @ApiProperty({
    description: '구독 번호',
    example: 1,
    required: false,
  })
  declare sbcrNo?: number;

  @ApiProperty({
    description: '태그 번호',
    example: 1,
    required: false,
  })
  declare tagNo?: number;

  @ApiProperty({
    description: '태그 이름',
    example: 'JavaScript',
    required: false,
  })
  declare tagNm?: string;

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

// 태그 구독 생성 DTO
export class CreateTagSubscribeDto extends createZodDto(createTagSubscribeSchema) {
  @ApiProperty({
    description: '구독 번호',
    example: 1,
  })
  declare sbcrNo: number;

  @ApiProperty({
    description: '태그 번호',
    example: 1,
  })
  declare tagNo: number;

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

// 태그 구독 수정 DTO
export class UpdateTagSubscribeDto extends createZodDto(updateTagSubscribeSchema) {
  @ApiProperty({
    description: '태그 구독 번호',
    example: 1,
    required: false,
  })
  declare tagSbcrNo?: number;

  @ApiProperty({
    description: '구독 번호',
    example: 1,
    required: false,
  })
  declare sbcrNo?: number;

  @ApiProperty({
    description: '태그 번호',
    example: 1,
    required: false,
  })
  declare tagNo?: number;

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
    description: '태그 번호 목록',
    example: [ 1, 2, 3, ],
    required: false,
  })
  declare tagNoList?: number[];
}

// 태그 구독 다건 생성 DTO
export class MultipleCreateTagSubscribeDto extends createZodDto(multipleCreateTagSubscribeSchema) {
  @ApiProperty({
    description: '구독 번호',
    example: 1,
  })
  declare sbcrNo: number;

  @ApiProperty({
    description: '태그 번호 목록',
    example: [ 1, 2, 3, ],
  })
  declare tagNoList: number[];

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

// 태그 구독 다건 수정 DTO
export class MultipleUpdateTagSubscribeDto extends createZodDto(multipleUpdateTagSubscribeSchema) {
  @ApiProperty({
    description: '태그 구독 번호 목록',
    example: [ 1, 2, 3, ],
    required: false,
  })
  declare tagSbcrNoList?: number[];

  @ApiProperty({
    description: '구독 번호',
    example: 1,
    required: false,
  })
  declare sbcrNo?: number;

  @ApiProperty({
    description: '태그 번호 목록',
    example: [ 1, 2, 3, ],
    required: false,
  })
  declare tagNoList?: number[];

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

// 태그 구독 다건 삭제 DTO
export class MultipleDeleteTagSubscribeDto extends createZodDto(multipleDeleteTagSubscribeSchema) {
  @ApiProperty({
    description: '태그 구독 번호 목록',
    example: [ 1, 2, 3, ],
  })
  declare tagSbcrNoList: number[];

  @ApiProperty({
    description: '구독 번호',
    example: 1,
  })
  declare sbcrNo: number;
}

// 태그 구독 검색 DTO
export class SearchTagSubscribeDto extends createZodDto(searchTagSubscribeSchema) {
  @ApiProperty({
    description: '검색 타입',
    example: 'tagNm',
    enum: [ 'tagNm', ],
    required: false,
  })
  declare srchType?: 'tagNm';

  @ApiProperty({
    description: '검색 키워드',
    example: 'JavaScript',
    required: false,
  })
  declare srchKywd?: string;

  @ApiProperty({
    description: '시작행',
    example: 0,
    required: false,
  })
  declare strtRow?: number;

  @ApiProperty({
    description: '끝행',
    example: 10,
    required: false,
  })
  declare endRow?: number;

  @ApiProperty({
    description: '페이지',
    example: 1,
    required: false,
  })
  declare page?: number;

  @ApiProperty({
    description: '구독 번호',
    example: 1,
    required: false,
  })
  declare sbcrNo?: number;

  @ApiProperty({
    description: '태그 번호',
    example: 1,
    required: false,
  })
  declare tagNo?: number;

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

// Swagger 문서화를 위한 태그 구독 아이템 DTO
export class TagSubscribeItemDto extends createZodDto(tagSubscribeItemListSchema) {
  @ApiProperty({
    description: '태그 번호',
    example: 1,
  })
  declare tagNo: number;

  @ApiProperty({
    description: '태그 이름',
    example: '태그 1',
  })
  declare tagNm: string;
}
