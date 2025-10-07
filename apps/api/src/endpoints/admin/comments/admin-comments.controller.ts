import { Body, Controller, Req, UseGuards } from '@nestjs/common';

import { Endpoint } from '@/decorators/endpoint.decorator';
import type { AuthRequest, DeleteCommentDto, UpdateCommentDto, ResponseDto } from '@/dto';
import { AdminCommentsService } from '@/endpoints/admin/comments/admin-comments.service';
import { AdminAuthGuard } from '@/endpoints/auth/admin-auth.guard';
import type { MultipleResultType } from '@/endpoints/prisma/types/common.types';
import { createError, createResponse } from '@/utils';

@Controller('admin/comments')
@UseGuards(AdminAuthGuard)
export class AdminCommentsController {
  constructor(private readonly adminCommentsService: AdminCommentsService) { }

  /**
   * @description 관리자 댓글 일괄 수정
   * @param req 인증 요청
   * @param updateData 댓글 일괄 수정 데이터
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'PUT',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminMultipleUpdateComment(
    @Req() req: AuthRequest,
    @Body() updateData: UpdateCommentDto
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminCommentsService.adminMultipleUpdateComment(req.user.userNo, updateData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_COMMENT_MULTIPLE_UPDATE_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'ADMIN_COMMENT_MULTIPLE_UPDATE_SUCCESS',
      result.data
    );
  }

  /**
   * @description 관리자 댓글 일괄 삭제
   * @param req 인증 요청
   * @param deleteData 댓글 일괄 삭제 데이터
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'DELETE',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminMultipleDeleteComment(
    @Req() req: AuthRequest,
    @Body() deleteData: DeleteCommentDto
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminCommentsService.adminMultipleDeleteComment(req.user.userNo, deleteData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_COMMENT_MULTIPLE_DELETE_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'ADMIN_COMMENT_MULTIPLE_DELETE_SUCCESS',
      result.data
    );
  }
}
