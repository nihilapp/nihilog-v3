import { applyDecorators, HttpCode, HttpStatus, UseGuards, Get, Post, Put, Patch, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
  ApiBody,
  ApiResponse
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import { MESSAGE_CODE, RESPONSE_CODE } from '@/code';
import { RoleAuthGuard, Roles } from '@/endpoints/auth/role-auth.guard';
import { UserRoleType } from '@/endpoints/drizzle/schemas/user.schema';

// ParamConfig를 튜플로 변경
type ParamConfig = [
  string, // name
  string, // description
  string, // type
  boolean? // required
];

// QueryConfig를 튜플로 변경
type QueryConfig = [
  string, // name
  string, // description
  string, // type
  boolean?, // required
  unknown? // example
];

// 응답 설정 - 튜플 형식
type ResponseConfig = [
  string, // description
  [
    boolean, // error
    keyof typeof RESPONSE_CODE, // code
    keyof typeof MESSAGE_CODE, // message
    unknown // data
  ]
];

// BodyConfig를 튜플로 변경
type BodyConfig = [
  string, // description
  new (...args: any[]) => any // type
];

type EndpointOptions = {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  summary: string;
  description: string;
  options?: {
    authGuard?: string;
    roles?: UserRoleType[];
    params?: ParamConfig[];
    queries?: QueryConfig[];
    responses?: ResponseConfig[];
    body?: BodyConfig;
    throttle?: [number, number]; // [limit, ttl]
    serialize?: boolean; // ClassSerializerInterceptor 사용 여부
  };
};

export function Endpoint({
  endpoint,
  method,
  summary,
  description,
  options,
}: EndpointOptions) {
  // HTTP 메서드 데코레이터 추가
  const getHttpMethodDecorator = (httpMethod: string, path: string) => {
    switch (httpMethod) {
    case 'GET':
      return Get(path);
    case 'POST':
      return Post(path);
    case 'PUT':
      return Put(path);
    case 'PATCH':
      return Patch(path);
    case 'DELETE':
      return Delete(path);
    default:
      return Get(path);
    }
  };

  const decorators = [
    getHttpMethodDecorator(method, endpoint),
    ApiOperation({
      summary,
      description,
      // endpoint 정보를 operation에 포함
      operationId: `${method.toLowerCase()}_${endpoint.replace(/[/:]/g, '_')}`,
    }),
    HttpCode(HttpStatus.OK),
  ];

  // 인증 가드 추가
  if (options?.authGuard) {
    decorators.push(ApiBearerAuth(options.authGuard));
  }

  // 롤 기반 인증 추가
  if (options?.roles && options.roles.length > 0) {
    decorators.push(UseGuards(RoleAuthGuard));
    decorators.push(Roles(...options.roles));
  }

  // 스로틀링 추가
  if (options?.throttle) {
    const [ limit, ttl, ] = options.throttle;
    decorators.push(Throttle({ default: { limit, ttl, }, }));
  }

  // 직렬화 인터셉터 추가
  if (options?.serialize) {
    decorators.push(UseInterceptors(ClassSerializerInterceptor));
  }

  // 파라미터 추가 - 튜플 형식 처리
  if (options?.params && options.params.length > 0) {
    options.params.forEach((param) => {
      const [ paramName, paramDescription, paramType, paramRequired, ] = param; // 튜플 구조분해할당

      // 문자열 타입을 생성자 함수로 변환
      const getTypeConstructor = (type: string) => {
        switch (type.toLowerCase()) {
        case 'string':
          return String;
        case 'number':
          return Number;
        case 'boolean':
          return Boolean;
        case 'date':
          return Date;
        case 'array':
          return Array;
        case 'object':
          return Object;
        default:
          return String;
        }
      };

      decorators.push(ApiParam({
        name: paramName,
        description: paramDescription,
        type: getTypeConstructor(paramType),
        required: paramRequired ?? true,
      }));
    });
  }

  // 쿼리 파라미터 추가 - 튜플 형식 처리
  if (options?.queries && options.queries.length > 0) {
    options.queries.forEach((query) => {
      const [ queryName, queryDescription, queryType, queryRequired, queryExample, ] = query; // 튜플 구조분해할당

      // 문자열 타입을 생성자 함수로 변환
      const getTypeConstructor = (type: string) => {
        switch (type.toLowerCase()) {
        case 'string':
          return String;
        case 'number':
          return Number;
        case 'boolean':
          return Boolean;
        case 'date':
          return Date;
        case 'array':
          return Array;
        case 'object':
          return Object;
        default:
          return String;
        }
      };

      decorators.push(ApiQuery({
        name: queryName,
        description: queryDescription,
        type: getTypeConstructor(queryType),
        required: queryRequired ?? false,
        example: queryExample,
      }));
    });
  }

  // 요청 본문 추가 - 튜플 형식 처리
  if (options?.body) {
    const [ bodyDescription, bodyType, ] = options.body; // 튜플 구조분해할당
    decorators.push(ApiBody({
      description: bodyDescription,
      type: bodyType,
    }));
  }

  // 응답 추가 - 튜플 형식 처리
  if (options?.responses && options.responses.length > 0) {
    const responseExamples = options.responses.map((response) => {
      const [ responseDescription, exampleArray, ] = response; // 튜플 구조분해할당
      const [ error, code, message, data, ] = exampleArray; // example 배열 구조분해할당

      return {
        description: responseDescription,
        example: {
          error,
          code: RESPONSE_CODE[code],
          message: MESSAGE_CODE[message],
          data,
        },
      };
    });

    // oneOf 스키마로 여러 응답 형태 표현
    decorators.push(ApiResponse({
      description: '응답',
      schema: {
        oneOf: responseExamples.map((resp) => ({
          type: 'object',
          description: resp.description,
          example: resp.example,
        })),
      },
    }));
  }

  // endpoint에서 파라미터 추출하여 자동 검증
  const pathParams = endpoint.match(/:([^/]+)/g);
  if (pathParams && pathParams.length > 0) {
    pathParams.forEach((param) => {
      const paramName = param.substring(1); // : 제거
      // 이미 options.params에 정의된 파라미터가 있는지 확인
      const existingParam = options?.params?.find((p) => p[0] === paramName);
      if (!existingParam) {
        // 자동으로 파라미터 추가
        decorators.push(ApiParam({
          name: paramName,
          description: `${paramName} 파라미터`,
          type: String,
          required: true,
        }));
      }
    });
  }

  return applyDecorators(...decorators);
}
