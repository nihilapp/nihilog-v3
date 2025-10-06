import { applyDecorators, HttpCode, HttpStatus, UseGuards, Get, Post, Put, Patch, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { RoleAuthGuard, Roles } from '@/endpoints/auth/role-auth.guard';
import { UserRoleType } from '@/endpoints/prisma/schemas/user.schema';

type EndpointOptions = {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  options?: {
    authGuard?: string;
    roles?: UserRoleType[];
    throttle?: [number, number]; // [limit, ttl]
    serialize?: boolean; // ClassSerializerInterceptor 사용 여부
  };
};

export function Endpoint({
  endpoint,
  method,
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
    HttpCode(HttpStatus.OK),
  ];

  // 인증 가드 추가 (ApiBearerAuth 제거 - Zod OpenAPI에서 처리)
  if (options?.authGuard) {
    // JWT 인증은 Zod OpenAPI에서 처리하므로 여기서는 제거
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

  return applyDecorators(...decorators);
}
