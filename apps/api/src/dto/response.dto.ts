import { ApiProperty } from '@nestjs/swagger';

// 기본 응답 DTO
export class ResponseDto<TData = any> {
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

export class MultipleResultDto {
  @ApiProperty({
    description: '성공 개수',
    example: 100,
  })
  declare successCnt: number;

  @ApiProperty({
    description: '실패 개수',
    example: 10,
  })
  declare failCnt: number;

  @ApiProperty({
    description: '실패 번호 목록',
    example: [ 1, 2, 3, ],
  })
  declare failNoList: number[];
}

// 리스트 응답 DTO
export class ListResponseDto<TData = any> {
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

export class MutationResponseDto {
  @ApiProperty({
    description: '영향받은 행 수',
    example: 1,
  })
  declare rowsAffected: number;

  @ApiProperty({
    description: '영향받은 행 번호 목록',
    example: [ 1, 2, 3, ],
  })
  declare affectedRows: number[];
}
