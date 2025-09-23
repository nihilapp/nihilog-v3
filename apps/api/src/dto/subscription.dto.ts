import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';

import type { YnType } from '@/endpoints/drizzle/schemas/user.schema';
import {
  userSubscriptionSchema,
  createSubscriptionSchema,
  updateSubscriptionSchema
} from '@drizzle/schemas/subscription.schema';

// 구독 정보 조회 DTO
export class UserSubscriptionDto extends createZodDto(userSubscriptionSchema.partial()) {
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
    type: [ Number, ],
    example: [ 1, 2, 3, ],
    required: false,
  })
  declare sbcrCtgryList?: number[];

  @ApiProperty({
    description: '구독 태그 목록',
    type: [ Number, ],
    example: [ 1, 2, 3, ],
    required: false,
  })
  declare sbcrTagList?: number[];

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
  declare crtDt?: string;

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
  declare updtDt?: string;

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
export class CreateSubscriptionDto extends createZodDto(createSubscriptionSchema) {
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

  @ApiProperty({
    description: '구독 카테고리 목록 (JSON 문자열)',
    example: '[1,2,3]',
    required: false,
  })
  declare sbcrCtgryList?: string | null;

  @ApiProperty({
    description: '구독 태그 목록 (JSON 문자열)',
    example: '[1,2,3]',
    required: false,
  })
  declare sbcrTagList?: string | null;
}

// 구독 설정 수정 DTO
export class UpdateSubscriptionDto extends createZodDto(updateSubscriptionSchema) {
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
    description: '구독 카테고리 번호 목록',
    type: [ Number, ],
    example: [ 1, 2, 3, ],
    required: false,
  })
  declare sbcrCtgryList?: number[];

  @ApiProperty({
    description: '구독 태그 번호 목록',
    type: [ Number, ],
    example: [ 1, 2, 3, ],
    required: false,
  })
  declare sbcrTagList?: number[];
}
