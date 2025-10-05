import { createZodDto } from 'nestjs-zod';

import { baseSearchSchema } from '@/endpoints/prisma/schemas/search.schema';

// 범용 검색 DTO
export class SearchDto extends createZodDto(baseSearchSchema) {}
