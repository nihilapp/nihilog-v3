import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';

import { CategorySubscribeItemDto } from '@/dto/category-subscribe.dto';
import { TagSubscribeItemDto } from '@/dto/tag-subscribe.dto';
import type { CategorySubscribeItemListType } from '@/endpoints/drizzle/schemas/category-subscribe.schema';
import type { YnType } from '@/endpoints/drizzle/schemas/common.schema';
import {
  userSubscribeSchema,
  createSubscribeSchema,
  updateSubscribeSchema
} from '@/endpoints/drizzle/schemas/subscribe.schema';
import type { TagSubscribeItemListType } from '@/endpoints/drizzle/schemas/tag-subscribe.schema';

import { SearchDto } from './search.dto';

// 구독 정보 조회 DTO
export class UserSubscribeDto extends createZodDto(userSubscribeSchema.partial()) {
  @ApiProperty({
    description: '구독 번호',
    example: 1,
    required: false,
  })
  declare sbcrNo?: number;

  @ApiProperty({
    description: '사용자 번호',
    example: 1,
  })
  declare userNo: number;

  @ApiProperty({
    description: '이메일 알림 전체 on/off',
    enum: [ 'Y', 'N', ],
    example: 'Y',
  })
  declare emlNtfyYn: YnType;

  @ApiProperty({
    description: '새 글 알림',
    enum: [ 'Y', 'N', ],
    example: 'Y',
  })
  declare newPstNtfyYn: YnType;

  @ApiProperty({
    description: '내 댓글 답글 알림',
    enum: [ 'Y', 'N', ],
    example: 'Y',
  })
  declare cmntRplNtfyYn: YnType;

  @ApiProperty({
    description: '구독 카테고리 목록',
    type: [ CategorySubscribeItemDto, ],
    example: [ { ctgryNo: 1, ctgryNm: '카테고리 1', }, ],
    required: false,
  })
  declare sbcrCtgryList?: CategorySubscribeItemListType[];

  @ApiProperty({
    description: '구독 태그 목록',
    type: [ TagSubscribeItemDto, ],
    example: [ { tagNo: 1, tagNm: '태그 1', }, ],
    required: false,
  })
  declare sbcrTagList?: TagSubscribeItemListType[];

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
    description: '생성 날짜 (YYYY-MM-DD HH:MM:SS)',
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
    description: '수정 날짜 (YYYY-MM-DD HH:MM:SS)',
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
    description: '삭제 날짜 (YYYY-MM-DD HH:MM:SS)',
    example: '2024-01-01 00:00:00',
    required: false,
  })
  declare delDt?: string | null;
}

// 구독 설정 생성 DTO
export class CreateSubscribeDto extends createZodDto(createSubscribeSchema) {
  @ApiProperty({
    description: '사용자 번호',
    example: 1,
  })
  declare userNo: number;

  @ApiProperty({
    description: '이메일 알림 전체 on/off',
    enum: [ 'Y', 'N', ],
    example: 'Y',
    required: false,
  })
  declare emlNtfyYn: YnType;

  @ApiProperty({
    description: '새 글 알림',
    enum: [ 'Y', 'N', ],
    example: 'Y',
    required: false,
  })
  declare newPstNtfyYn: YnType;

  @ApiProperty({
    description: '내 댓글 답글 알림',
    enum: [ 'Y', 'N', ],
    example: 'Y',
    required: false,
  })
  declare cmntRplNtfyYn: YnType;
}

// 구독 설정 수정 DTO
export class UpdateSubscribeDto extends createZodDto(updateSubscribeSchema) {
  @ApiProperty({
    description: '이메일 알림 전체 on/off',
    enum: [ 'Y', 'N', ],
    example: 'Y',
    required: false,
  })
  declare emlNtfyYn?: YnType;

  @ApiProperty({
    description: '새 글 알림',
    enum: [ 'Y', 'N', ],
    example: 'Y',
    required: false,
  })
  declare newPstNtfyYn?: YnType;

  @ApiProperty({
    description: '내 댓글 답글 알림',
    enum: [ 'Y', 'N', ],
    example: 'Y',
    required: false,
  })
  declare cmntRplNtfyYn?: YnType;

  @ApiProperty({
    description: '사용자 번호 목록',
    type: [ Number, ],
    example: [ 1, 2, 3, ],
    required: false,
  })
  declare userNoList?: number[];
}

export class SearchSubscribeDto extends SearchDto {
  @ApiProperty({
    description: '검색 타입 (userNm, emlAddr 중 하나)',
    example: 'userNm',
    required: false,
    enum: [ 'userNm', 'emlAddr', ],
  })
  declare srchType?: 'userNm' | 'emlAddr';
}
