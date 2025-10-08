import { z } from 'zod';

import { MESSAGE } from '@/code/messages';
import {
  updateCommentSchema,
  deleteCommentSchema
} from '@/endpoints/prisma/schemas/comment.schema';
import { createError, createResponse } from '@/utils';

import { openApiRegistry } from '../registry';
import { addGlobalResponses } from '../utils/global-responses';

export const registerAdminCommentsEndpoints = () => {
  // PUT /admin/comments/multiple - 관리자 댓글 일괄 수정
  openApiRegistry.registerPath({
    method: 'put',
    path: '/admin/comments/multiple',
    summary: '🔄 관리자 댓글 일괄 수정',
    description: 'ADMIN 권한으로 다수 댓글을 일괄 수정합니다.',
    tags: [ 'admin-comments', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: updateCommentSchema,
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
                summary: '관리자 댓글 일괄 수정 성공',
                value: createResponse('SUCCESS', MESSAGE.COMMENT.ADMIN.MULTIPLE_UPDATE_SUCCESS, {
                  successCnt: 3,
                  failCnt: 0,
                  failNoList: [],
                }),
              },
              error: {
                summary: '관리자 댓글 일괄 수정 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.COMMENT.ADMIN.MULTIPLE_UPDATE_ERROR),
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

  // DELETE /admin/comments/multiple - 관리자 댓글 일괄 삭제
  openApiRegistry.registerPath({
    method: 'delete',
    path: '/admin/comments/multiple',
    summary: '🗑️ 관리자 댓글 일괄 삭제',
    description: 'ADMIN 권한으로 다수 댓글을 일괄 삭제합니다.',
    tags: [ 'admin-comments', ],
    security: [ { 'JWT-auth': [], }, ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: deleteCommentSchema,
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
                summary: '관리자 댓글 일괄 삭제 성공',
                value: createResponse('SUCCESS', MESSAGE.COMMENT.ADMIN.MULTIPLE_DELETE_SUCCESS, {
                  successCnt: 3,
                  failCnt: 0,
                  failNoList: [],
                }),
              },
              error: {
                summary: '관리자 댓글 일괄 삭제 실패',
                value: createError('INTERNAL_SERVER_ERROR', MESSAGE.COMMENT.ADMIN.MULTIPLE_DELETE_ERROR),
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
