import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';

import { baseSearchSchema } from '@/endpoints/prisma/schemas/search.schema';

// 범용 검색 DTO
export class SearchDto extends createZodDto(baseSearchSchema) {
  @ApiProperty({
    description: '시작 행 번호 (SQL OFFSET)',
    example: 0,
    required: false,
  })
  declare strtRow?: number;

  @ApiProperty({
    description: '끝 행 번호 (SQL LIMIT)',
    example: 10,
    required: false,
  })
  declare endRow?: number;

  @ApiProperty({
    description: '검색 타입',
    example: 'name',
    required: false,
  })
  declare srchType?: string;

  @ApiProperty({
    description: '검색 키워드',
    example: '검색어',
    required: false,
  })
  declare srchKywd?: string;

  @ApiProperty({
    description: '페이지 번호',
    example: 1,
    required: false,
  })
  declare page?: number;
}
