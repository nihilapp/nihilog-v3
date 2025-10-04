import { createZodDto } from 'nestjs-zod';

import {
  userSubscribeSchema,
  createSubscribeSchema,
  updateSubscribeSchema,
  searchSubscribeSchema
} from '@/endpoints/prisma/schemas/subscribe.schema';

// 구독 정보 조회 DTO
export class UserSubscribeDto extends createZodDto(userSubscribeSchema.partial()) {}

// 구독 설정 생성 DTO
export class CreateSubscribeDto extends createZodDto(createSubscribeSchema) {}

// 구독 설정 수정 DTO
export class UpdateSubscribeDto extends createZodDto(updateSubscribeSchema) {}

// 구독 설정 검색 DTO
export class SearchSubscribeDto extends createZodDto(searchSubscribeSchema) {}
