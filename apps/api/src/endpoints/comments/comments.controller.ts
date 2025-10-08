import { Body, Controller, Param, Req } from '@nestjs/common';

import { MESSAGE } from '@/code/messages';
import { Endpoint } from '@/decorators/endpoint.decorator';
import type { AuthRequest, CreateCommentDto, DeleteCommentDto, SearchCommentDto, UpdateCommentDto, ResponseDto } from '@/dto';
import { CommentsService } from '@/endpoints/comments/comments.service';
import type { SelectCommentListItemType, SelectCommentType } from '@/endpoints/prisma/types/comment.types';
import type { ListType } from '@/endpoints/prisma/types/common.types';
import { createError, createResponse } from '@/utils';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  /**
   * @description 댓글 목록 조회
   * @param searchData 검색 조건 DTO
   */
  @Endpoint({
    endpoint: '/search',
    method: 'POST',
  })
  async getCommentList(@Body() searchData: SearchCommentDto): Promise<ResponseDto<ListType<SelectCommentListItemType>>> {
    const result = await this.commentsService.getCommentList(searchData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.COMMENT.USER.SEARCH_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.COMMENT.USER.SEARCH_SUCCESS,
      result.data
    );
  }

  /**
   * @description 댓글 상세 조회
   * @param cmntNo 댓글 번호
   */
  @Endpoint({
    endpoint: '/:cmntNo',
    method: 'GET',
  })
  async getCommentByCmntNo(@Param('cmntNo') cmntNo: number): Promise<ResponseDto<SelectCommentType>> {
    const result = await this.commentsService.getCommentByCmntNo(cmntNo);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.COMMENT.USER.GET_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.COMMENT.USER.GET_SUCCESS,
      result.data
    );
  }

  /**
   * @description 댓글 작성
   * @param req 인증 요청
   * @param createData 댓글 생성 데이터
   */
  @Endpoint({
    endpoint: '',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
    },
  })
  async createComment(
    @Req() req: AuthRequest,
    @Body() createData: CreateCommentDto
  ): Promise<ResponseDto<SelectCommentType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.commentsService.createComment(req.user.userNo, createData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.COMMENT.USER.CREATE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.COMMENT.USER.CREATE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 댓글 수정
   * @param req 인증 요청
   * @param updateData 댓글 수정 데이터
   */
  @Endpoint({
    endpoint: '',
    method: 'PUT',
    options: {
      authGuard: 'JWT-auth',
    },
  })
  async updateComment(
    @Req() req: AuthRequest,
    @Body() updateData: UpdateCommentDto
  ): Promise<ResponseDto<SelectCommentType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.commentsService.updateComment(req.user.userNo, updateData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.COMMENT.USER.UPDATE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.COMMENT.USER.UPDATE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 댓글 삭제
   * @param req 인증 요청
   * @param deleteData 댓글 삭제 데이터
   */
  @Endpoint({
    endpoint: '',
    method: 'DELETE',
    options: {
      authGuard: 'JWT-auth',
    },
  })
  async deleteComment(
    @Req() req: AuthRequest,
    @Body() deleteData: DeleteCommentDto
  ): Promise<ResponseDto<boolean>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.commentsService.deleteComment(req.user.userNo, deleteData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.COMMENT.USER.DELETE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.COMMENT.USER.DELETE_SUCCESS,
      result.data
    );
  }
}
