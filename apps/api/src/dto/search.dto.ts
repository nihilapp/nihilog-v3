import { baseSearchSchema } from '@nihilog/schemas';
import { createZodDto } from 'nestjs-zod';

// 범용 검색 DTO
export class SearchDto extends createZodDto(baseSearchSchema) {}
