import { z } from 'zod';

import { createUserSchema } from '@/endpoints/prisma/schemas/user.schema';
import { updateUserSchema, searchUserSchema, deleteMultipleUsersSchema } from '@/endpoints/prisma/schemas/user.schema';
import { createError, createResponse } from '@/utils';
import { CreateExample } from '@/utils/createExample';

import { openApiRegistry } from '../registry';
import { addGlobalResponses } from '../utils/global-responses';

export const registerAdminUsersEndpoints = () => {
  // POST /admin/users/search - 사용자 목록 검색
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/users/search',
    summary: '🔎 사용자 목록 검색',
    description: '부분 일치(ILIKE) 기반으로 사용자 목록을 검색합니다. delYn이 제공되지 않으면 기본값 N으로 조회합니다.',
    tags: [ 'admin-users', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: searchUserSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '사용자 목록 조회 성공',
                value: createResponse('SUCCESS', 'USER_SEARCH_SUCCESS', {
                  list: [ CreateExample.user('list'), ],
                  totalCnt: 1,
                }),
              },
              error: {
                summary: '사용자 목록 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'USER_SEARCH_ERROR'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
              hasRoles: true, // 권한 사용
            }),
          },
        },
      },
    },
  });

  // GET /admin/users/{userNo} - 사용자 단건 조회 (번호)
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/users/{userNo}',
    summary: '🔍 사용자 단건 조회 (번호)',
    description: '사용자 번호로 단건 조회합니다.',
    tags: [ 'admin-users', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        userNo: z.coerce.number().int().positive().openapi({
          description: '사용자 번호',
          example: 1,
        }),
      }),
    },
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '사용자 조회 성공',
                value: createResponse('SUCCESS', 'USER_FETCH_SUCCESS', CreateExample.user('detail')),
              },
              notFound: {
                summary: '사용자를 찾을 수 없음',
                value: createError('NOT_FOUND', 'USER_NOT_FOUND'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
              hasRoles: true, // 권한 사용
            }),
          },
        },
      },
    },
  });

  // GET /admin/users/name/{name} - 사용자 단건 조회 (이름)
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/users/name/{name}',
    summary: '🔍 사용자 단건 조회 (이름)',
    description: '사용자명을 기준으로 단건 조회합니다(완전 일치).',
    tags: [ 'admin-users', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        name: z.string().openapi({
          description: '사용자명',
          example: '홍길동',
        }),
      }),
    },
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '사용자 조회 성공',
                value: createResponse('SUCCESS', 'USER_FETCH_SUCCESS', CreateExample.user()),
              },
              notFound: {
                summary: '사용자를 찾을 수 없음',
                value: createError('NOT_FOUND', 'USER_NOT_FOUND'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
              hasRoles: true, // 권한 사용
            }),
          },
        },
      },
    },
  });

  // GET /admin/users/email/{email} - 사용자 단건 조회 (이메일)
  openApiRegistry.registerPath({
    method: 'get',
    path: '/admin/users/email/{email}',
    summary: '🔍 사용자 단건 조회 (이메일)',
    description: '이메일 주소를 기준으로 단건 조회합니다(완전 일치).',
    tags: [ 'admin-users', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        email: z.string().email().openapi({
          description: '이메일 주소',
          example: 'user@example.com',
        }),
      }),
    },
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '사용자 조회 성공',
                value: createResponse('SUCCESS', 'USER_FETCH_SUCCESS', CreateExample.user('detail')),
              },
              notFound: {
                summary: '사용자를 찾을 수 없음',
                value: createError('NOT_FOUND', 'USER_NOT_FOUND'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
              hasRoles: true, // 권한 사용
            }),
          },
        },
      },
    },
  });

  // POST /admin/users - 새 사용자 생성
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/users',
    summary: '👤 새 사용자 생성',
    description: 'ADMIN 권한으로 새로운 사용자 계정을 생성합니다.',
    tags: [ 'admin-users', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: createUserSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '사용자 생성 성공',
                value: createResponse('CREATED', 'USER_CREATE_SUCCESS', CreateExample.user('detail')),
              },
              conflict: {
                summary: '이미 존재하는 이메일',
                value: createError('CONFLICT', 'EMAIL_IN_USE'),
              },
              error: {
                summary: '사용자 생성 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'USER_CREATE_ERROR'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
              hasRoles: true, // 권한 사용
            }),
          },
        },
      },
    },
  });

  // PUT /admin/users/{userNo} - 사용자 정보 수정
  openApiRegistry.registerPath({
    method: 'put',
    path: '/admin/users/{userNo}',
    summary: '✏️ 사용자 정보 수정',
    description: 'ADMIN 권한으로 특정 사용자의 정보를 수정합니다.',
    tags: [ 'admin-users', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        userNo: z.coerce.number().int().positive().openapi({
          description: '사용자 번호',
          example: 1,
        }),
      }),
      body: {
        content: {
          'application/json': {
            schema: updateUserSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '사용자 수정 성공',
                value: createResponse('SUCCESS', 'USER_UPDATE_SUCCESS', CreateExample.user('detail')),
              },
              notFound: {
                summary: '사용자를 찾을 수 없음',
                value: createError('NOT_FOUND', 'USER_NOT_FOUND'),
              },
              conflict: {
                summary: '사용자명 중복',
                value: createError('CONFLICT', 'USER_NAME_EXISTS'),
              },
              error: {
                summary: '사용자 수정 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'USER_UPDATE_ERROR'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
              hasRoles: true, // 권한 사용
            }),
          },
        },
      },
    },
  });

  // PUT /admin/users/multiple - 다수 사용자 일괄 수정
  openApiRegistry.registerPath({
    method: 'put',
    path: '/admin/users/multiple',
    summary: '✏️ 다수 사용자 일괄 수정',
    description: 'ADMIN 권한으로 다수 사용자 정보를 일괄 수정합니다.',
    tags: [ 'admin-users', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: updateUserSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '다수 사용자 수정 성공',
                value: createResponse('SUCCESS', 'USER_UPDATE_SUCCESS', {
                  successCnt: 1,
                  failCnt: 0,
                  failNoList: [],
                }),
              },
              error: {
                summary: '사용자 수정 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'USER_UPDATE_ERROR'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
              hasRoles: true, // 권한 사용
            }),
          },
        },
      },
    },
  });

  // DELETE /admin/users/{userNo} - 사용자 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/users/{userNo}',
    summary: '🗑️ 사용자 삭제',
    description: 'ADMIN 권한으로 특정 사용자를 삭제합니다.',
    tags: [ 'admin-users', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        userNo: z.coerce.number().int().positive().openapi({
          description: '사용자 번호',
          example: 1,
        }),
      }),
    },
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '사용자 삭제 성공',
                value: createResponse('SUCCESS', 'USER_DELETE_SUCCESS', true),
              },
              notFound: {
                summary: '사용자를 찾을 수 없음',
                value: createError('NOT_FOUND', 'USER_NOT_FOUND'),
              },
              error: {
                summary: '사용자 삭제 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'USER_DELETE_ERROR'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
              hasRoles: true, // 권한 사용
            }),
          },
        },
      },
    },
  });

  // DELETE /admin/users/multiple - 다수 사용자 일괄 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/users/multiple',
    summary: '🗑️ 다수 사용자 일괄 삭제',
    description: 'ADMIN 권한으로 다수 사용자를 일괄 삭제합니다.',
    tags: [ 'admin-users', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: deleteMultipleUsersSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: '응답',
        content: {
          'application/json': {
            schema: z.looseObject({}),
            examples: addGlobalResponses({
              success: {
                summary: '다수 사용자 삭제 성공',
                value: createResponse('SUCCESS', 'USER_DELETE_SUCCESS', {
                  successCnt: 1,
                  failCnt: 0,
                  failNoList: [],
                }),
              },
              error: {
                summary: '사용자 삭제 실패',
                value: createError('INTERNAL_SERVER_ERROR', 'USER_DELETE_ERROR'),
              },
            }, {
              hasAuthGuard: true, // JWT 인증 사용
              hasRoles: true, // 권한 사용
            }),
          },
        },
      },
    },
  });
};
