import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';

import { UserInfoDto } from '@/dto/user.dto';
import { createExampleUser } from '@/utils';
import {
  listResponseSchema,
  multipleResultSchema,
  responseSchema
} from '@drizzle/schemas/response.schema';

// 기본 응답 DTO
export class ResponseDto<TData = any> extends createZodDto(responseSchema()) {
  @ApiProperty({
    description: '에러 여부',
    example: false,
  })
  declare error: boolean;

  @ApiProperty({
    description: '응답 메시지',
    example: '요청이 성공적으로 처리되었습니다.',
  })
  declare message: string;

  @ApiProperty({
    description: '응답 코드',
    example: 'SUCCESS',
  })
  declare code: string;

  @ApiProperty({
    description: '응답 데이터',
    example: null,
  })
  declare data?: TData | null;

  @ApiProperty({
    description: '응답일시',
    example: '2024-01-01T00:00:00.000Z',
  })
  declare responseTime?: string;
}

export class ListDto<TData = any> {
  @ApiProperty({
    description: '데이터 목록',
    type: 'array',
    items: { type: 'object', },
  })
  declare list: TData[];

  @ApiProperty({
    description: '전체 개수',
    example: 100,
  })
  declare totalCnt: number;
}

export class MultipleResultDto extends createZodDto(multipleResultSchema) {
  @ApiProperty({
    description: '성공 개수',
    example: 100,
  })
  declare successCnt?: number;

  @ApiProperty({
    description: '실패 개수',
    example: 10,
  })
  declare failCnt?: number;

  @ApiProperty({
    description: '실패 번호 목록',
    example: [ 1, 2, 3, ],
  })
  declare failNoList?: number[];
}

// 리스트 응답 DTO
export class ListResponseDto<TData = any> extends createZodDto(listResponseSchema()) {
  @ApiProperty({
    description: '에러 여부',
    example: false,
  })
  declare error: boolean;

  @ApiProperty({
    description: '응답 메시지',
    example: '요청이 성공적으로 처리되었습니다.',
  })
  declare message: string;

  @ApiProperty({
    description: '응답 코드',
    example: 'SUCCESS',
  })
  declare code: string;

  @ApiProperty({
    description: '리스트 데이터',
    type: 'object',
    properties: {
      list: {
        type: 'array',
        items: { type: 'object', },
        description: '데이터 목록',
      },
      totalCnt: {
        type: 'number',
        description: '전체 개수',
        example: 100,
      },
    },
  })
  declare data: {
    list: TData[];
    totalCnt: number;
  };
}

export class SignInResponseDto {
  @ApiProperty({
    description: '사용자 정보',
    type: UserInfoDto,
    example: createExampleUser(),
  })
  declare user: UserInfoDto;

  @ApiProperty({
    description: '액세스 토큰',
    example: 'access_token',
  })
  declare acsToken: string;

  @ApiProperty({
    description: '리프레시 토큰',
    example: 'refresh_token',
  })
  declare reshToken: string;

  @ApiProperty({
    description: '액세스 토큰 만료 시간',
    example: 1717000000,
  })
  declare accessTokenExpiresAt: number;
}
