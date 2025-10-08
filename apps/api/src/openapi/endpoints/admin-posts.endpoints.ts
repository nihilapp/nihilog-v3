import { z } from 'zod';

import { MESSAGE } from '@/code/messages';
import { createPostSchema, updatePostSchema, deletePostSchema, viewStatSchema } from '@/endpoints/prisma/schemas/post.schema';
import { createError, createResponse } from '@/utils';
import { CreateExample } from '@/utils/createExample';

import { openApiRegistry } from '../registry';
import { addGlobalResponses } from '../utils/global-responses';

export const registerAdminPostsEndpoints = () => {
  // POST /admin/posts/{pstNo}/views - 게시글 조회수 통계 조회
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/posts/{pstNo}/views',
    summary: '📊 게시글 조회수 통계 조회',
    description: '관리자가 게시글 조회수 통계를 조회합니다.',
    tags: [ 'admin-posts', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        pstNo: z.coerce.number().int().positive().openapi({
          description: '게시글 번호',
          example: 1,
        }),
      }),
      body: {
        content: {
          'application/json': {
            schema: viewStatSchema,
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
                summary: '게시글 조회수 통계 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.POST.ADMIN.STATISTICS_SUCCESS, [
                  { date: '2024-01-01', count: 100, },
                ]),
              },
              error: {
                summary: '게시글 조회수 통계 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.POST.ADMIN.STATISTICS_ERROR),
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

  // POST /admin/posts/{pstNo}/shares - 게시글 공유 통계 조회
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/posts/{pstNo}/shares',
    summary: '📊 게시글 공유 통계 조회',
    description: '관리자가 게시글 공유 통계를 조회합니다.',
    tags: [ 'admin-posts', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        pstNo: z.coerce.number().int().positive().openapi({
          description: '게시글 번호',
          example: 1,
        }),
      }),
      body: {
        content: {
          'application/json': {
            schema: viewStatSchema,
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
                summary: '게시글 공유 통계 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.POST.ADMIN.STATISTICS_SUCCESS, [
                  { platform: 'facebook', count: 100, },
                ]),
              },
              error: {
                summary: '게시글 공유 통계 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.POST.ADMIN.STATISTICS_ERROR),
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

  // POST /admin/posts/shares - 전체 게시글 공유 통계 조회
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/posts/shares',
    summary: '📊 전체 게시글 공유 통계 조회',
    description: '관리자가 전체 게시글 공유 통계를 조회합니다.',
    tags: [ 'admin-posts', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: viewStatSchema,
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
                summary: '전체 게시글 공유 통계 조회 성공',
                value: createResponse('SUCCESS', MESSAGE.POST.ADMIN.STATISTICS_SUCCESS, [
                  { platform: 'facebook', count: 100, },
                ]),
              },
              error: {
                summary: '전체 게시글 공유 통계 조회 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.POST.ADMIN.STATISTICS_ERROR),
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

  // POST /admin/posts - 새 게시글 작성
  openApiRegistry.registerPath({
    method: 'post',
    path: '/admin/posts',
    summary: '✍️ 새 게시글 작성',
    description: '관리자가 새 게시글을 작성합니다.',
    tags: [ 'admin-posts', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: createPostSchema,
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
                summary: '새 게시글 작성 성공',
                value: createResponse('SUCCESS', MESSAGE.POST.ADMIN.CREATE_SUCCESS, CreateExample.post('detail')),
              },
              error: {
                summary: '새 게시글 작성 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.POST.ADMIN.CREATE_ERROR),
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

  // PUT /admin/posts/{pstNo} - 게시글 수정
  openApiRegistry.registerPath({
    method: 'put',
    path: '/admin/posts/{pstNo}',
    summary: '✏️ 게시글 수정',
    description: '관리자가 게시글을 수정합니다.',
    tags: [ 'admin-posts', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        pstNo: z.coerce.number().int().positive().openapi({
          description: '게시글 번호',
          example: 1,
        }),
      }),
      body: {
        content: {
          'application/json': {
            schema: updatePostSchema,
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
                summary: '게시글 수정 성공',
                value: createResponse('SUCCESS', MESSAGE.POST.ADMIN.UPDATE_SUCCESS, CreateExample.post('detail')),
              },
              error: {
                summary: '게시글 수정 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.POST.ADMIN.UPDATE_ERROR),
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

  // PUT /admin/posts/multiple - 다수 게시글 일괄 수정
  openApiRegistry.registerPath({
    method: 'put',
    path: '/admin/posts/multiple',
    summary: '✏️ 다수 게시글 일괄 수정',
    description: '관리자가 다수 게시글을 일괄 수정합니다.',
    tags: [ 'admin-posts', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: updatePostSchema,
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
                summary: '다수 게시글 일괄 수정 성공',
                value: createResponse('SUCCESS', MESSAGE.POST.ADMIN.UPDATE_SUCCESS, {
                  successCnt: 1,
                  failCnt: 0,
                  failNoList: [],
                }),
              },
              error: {
                summary: '다수 게시글 일괄 수정 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.POST.ADMIN.UPDATE_ERROR),
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

  // DELETE /admin/posts/{pstNo} - 게시글 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/posts/{pstNo}',
    summary: '🗑️ 게시글 삭제',
    description: '관리자가 게시글을 삭제합니다.',
    tags: [ 'admin-posts', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      params: z.object({
        pstNo: z.coerce.number().int().positive().openapi({
          description: '게시글 번호',
          example: 1,
        }),
      }),
      body: {
        content: {
          'application/json': {
            schema: deletePostSchema,
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
                summary: '게시글 삭제 성공',
                value: createResponse('SUCCESS', MESSAGE.POST.ADMIN.DELETE_SUCCESS, true),
              },
              error: {
                summary: '게시글 삭제 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.POST.ADMIN.DELETE_ERROR),
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

  // DELETE /admin/posts/multiple - 다수 게시글 일괄 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/posts/multiple',
    summary: '🗑️ 다수 게시글 일괄 삭제',
    description: '관리자가 다수 게시글을 일괄 삭제합니다.',
    tags: [ 'admin-posts', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: deletePostSchema,
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
                summary: '다수 게시글 일괄 삭제 성공',
                value: createResponse('SUCCESS', MESSAGE.POST.ADMIN.DELETE_SUCCESS, {
                  successCnt: 1,
                  failCnt: 0,
                  failNoList: [],
                }),
              },
              error: {
                summary: '다수 게시글 일괄 삭제 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.POST.ADMIN.DELETE_ERROR),
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
