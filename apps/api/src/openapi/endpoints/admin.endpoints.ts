import { z } from 'zod';

import { MESSAGE } from '@/code/messages';
import { updateUserSchema } from '@/endpoints/prisma/schemas/user.schema';
import { createError, createResponse } from '@/utils';
import { CreateExample } from '@/utils/createExample';

import { openApiRegistry } from '../registry';
import { addGlobalResponses } from '../utils/global-responses';

export const registerAdminEndpoints = () => {
  // PATCH /admin/profile - 관리자 프로필 수정
  openApiRegistry.registerPath({
    method: 'patch',
    path: '/admin/profile',
    summary: '✏️ 프로필 정보 수정',
    description: '현재 로그인된 관리자의 프로필을 업데이트합니다.',
    tags: [ 'admin', ],
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
            examples: addGlobalResponses(
              {
                success: {
                  summary: '프로필 수정 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.USER.USER.UPDATE_SUCCESS,
                    CreateExample.user('detail')
                  ),
                },
                imageChangeSuccess: {
                  summary: '프로필 이미지 변경 성공',
                  value: createResponse(
                    'SUCCESS',
                    MESSAGE.USER.USER.IMAGE_CHANGE_SUCCESS,
                    CreateExample.user('detail')
                  ),
                },
                notFound: {
                  summary: '관리자를 찾을 수 없음',
                  value: createError(
                    'NOT_FOUND',
                    MESSAGE.USER.USER.NOT_FOUND
                  ),
                },
                conflict: {
                  summary: '사용자명 중복',
                  value: createError(
                    'CONFLICT',
                    MESSAGE.USER.USER.NAME_EXISTS
                  ),
                },
                imageChangeError: {
                  summary: '프로필 이미지 변경 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.USER.USER.IMAGE_CHANGE_ERROR
                  ),
                },
                error: {
                  summary: '프로필 업데이트 실패',
                  value: createError(
                    'INTERNAL_SERVER_ERROR',
                    MESSAGE.USER.USER.UPDATE_ERROR
                  ),
                },
              },
              {
                hasAuthGuard: true, // JWT 인증 사용
                hasRoles: true, // 권한 사용
              }
            ),
          },
        },
      },
    },
  });
};
