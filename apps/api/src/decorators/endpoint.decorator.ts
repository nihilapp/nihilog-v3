import { applyDecorators, HttpCode, HttpStatus, UseGuards, Get, Post, Put, Patch, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UserRoleType } from '@nihilog/schemas';

import { JwtAuthGuard } from '@/endpoints/auth/jwt-auth.guard';
import { RoleAuthGuard, Roles } from '@/endpoints/auth/role-auth.guard';

type EndpointOptions = {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  options?: {
    authGuard?: string;
    roles?: UserRoleType[];
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
    getHttpMethodDecorator(
      method,
      endpoint
    ),
    HttpCode(HttpStatus.OK),
  ];

  // 인증 가드 추가
  if (options?.authGuard === 'JWT-auth') {
    decorators.push(UseGuards(JwtAuthGuard));
  }

  // 롤 기반 인증 추가 (개발 환경에서는 우회)
  if (options?.roles && options.roles.length > 0 && process.env.NODE_ENV !== 'development') {
    decorators.push(UseGuards(RoleAuthGuard));
    decorators.push(Roles(...options.roles));
  }

  // 직렬화 인터셉터 추가
  if (options?.serialize) {
    decorators.push(UseInterceptors(ClassSerializerInterceptor));
  }

  return applyDecorators(...decorators);
}
