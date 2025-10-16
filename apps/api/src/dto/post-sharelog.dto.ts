import { createZodDto } from 'nestjs-zod';

import { createPostShareLogSchema } from '@/endpoints/prisma/schemas/post-sharelog.schema';

// 포스트 공유 로그 생성 DTO
export class CreatePostShareLogDto extends createZodDto(createPostShareLogSchema) {}
