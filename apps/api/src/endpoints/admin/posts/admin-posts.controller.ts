import { Body, Controller, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Endpoint } from '@/decorators/endpoint.decorator';
import type { AuthRequest, ResponseDto } from '@/dto';
import { CreatePostDto, DeletePostDto, UpdatePostDto, ViewStatDto } from '@/dto/post.dto';
import { AdminPostsService } from '@/endpoints/admin/posts/admin-posts.service';
import { AdminAuthGuard } from '@/endpoints/auth/admin-auth.guard';
import type { MultipleResultType } from '@/endpoints/prisma/types/common.types';
import type { SelectPostInfoType, SharePlatformStatItemType, ViewStatItemType } from '@/endpoints/prisma/types/post.types';
import { createError, createResponse } from '@/utils';
import { CreateExample } from '@/utils/createExample';

@ApiTags('admin/posts')
@Controller('admin/posts')
@UseGuards(AdminAuthGuard)
export class AdminPostsController {
  constructor(private readonly postsService: AdminPostsService) {}

  /**
   * @description 관리자 - 게시글 조회수 통계 조회
   * @param pstNo 게시글 번호
   * @param viewStatData 조회수 통계 데이터
   */
  @Endpoint({
    endpoint: '/:pstNo/views',
    method: 'POST',
    summary: '[관리자] 게시글 조회수 통계 조회',
    description: '관리자가 게시글 조회수 통계를 조회합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      params: [
        [ 'pstNo', '게시글 번호', 'number', true, ],
      ],
      body: [ '조회수 통계 데이터', ViewStatDto, ],
      responses: [
        [
          '게시글 조회수 통계 조회 성공',
          [ false, 'SUCCESS', 'POST_VIEW_STATS_SUCCESS', [
            { date: '2024-01-01', count: 100, },
          ], ],
        ],
        [
          '게시글 조회수 통계 조회 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'POST_VIEW_STATS_ERROR', null, ],
        ],
      ],
    },
  })
  async adminGetPostViewStats(
    @Req() req: AuthRequest,
    @Param('pstNo') pstNo: number,
    @Body() viewStatData: ViewStatDto
  ): Promise<ResponseDto<ViewStatItemType[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.postsService.getPostViewStats(pstNo, viewStatData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'POST_VIEW_STATS_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'POST_VIEW_STATS_SUCCESS',
      result.data
    );
  }

  /**
   * @description 관리자 - 게시글 공유 통계 조회
   * @param pstNo 게시글 번호
   * @param viewStatData 공유 통계 데이터
   */
  @Endpoint({
    endpoint: '/:pstNo/shares',
    method: 'POST',
    summary: '[관리자] 게시글 공유 통계 조회',
    description: '관리자가 게시글 공유 통계를 조회합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      params: [
        [ 'pstNo', '게시글 번호', 'number', true, ],
      ],
      body: [ '공유 통계 데이터', ViewStatDto, ],
      responses: [
        [
          '게시글 공유 통계 조회 성공',
          [ false, 'SUCCESS', 'POST_SHARE_STATS_SUCCESS', [
            { platform: 'facebook', count: 100, },
          ], ],
        ],
        [
          '게시글 공유 통계 조회 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'POST_SHARE_STATS_ERROR', null, ],
        ],
      ],
    },
  })
  async adminGetPostShareStatsByPlatform(
    @Req() req: AuthRequest,
    @Param('pstNo') pstNo: number,
    @Body() viewStatData: ViewStatDto
  ): Promise<ResponseDto<SharePlatformStatItemType[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.postsService.getPostShareStatsByPlatform(pstNo, viewStatData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'POST_SHARE_STATS_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'POST_SHARE_STATS_SUCCESS',
      result.data
    );
  }

  /**
   * @description 관리자 - 전체 게시글 공유 통계 조회
   * @param viewStatData 공유 통계 데이터
   */
  @Endpoint({
    endpoint: '/shares',
    method: 'POST',
    summary: '[관리자] 전체 게시글 공유 통계 조회',
    description: '관리자가 전체 게시글 공유 통계를 조회합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      body: [ '공유 통계 데이터', ViewStatDto, ],
      responses: [
        [
          '전체 게시글 공유 통계 조회 성공',
          [ false, 'SUCCESS', 'POST_SHARE_STATS_SUCCESS', [
            { platform: 'facebook', count: 100, },
          ], ],
        ],
        [
          '전체 게시글 공유 통계 조회 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'POST_SHARE_STATS_ERROR', null, ],
        ],
      ],
    },
  })
  async adminGetAllPostShareStatsByPlatform(@Req() req: AuthRequest, @Body() viewStatData: ViewStatDto): Promise<ResponseDto<SharePlatformStatItemType[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.postsService.getAllPostShareStatsByPlatform(viewStatData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'POST_SHARE_STATS_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'POST_SHARE_STATS_SUCCESS',
      result.data
    );
  }

  /**
   * @description 관리자 - 새 게시글 작성
   * @param createData 게시글 생성 데이터
   */
  @Endpoint({
    endpoint: '/',
    method: 'POST',
    summary: '[관리자] 새 게시글 작성',
    description: '관리자가 새 게시글을 작성합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      body: [ '게시글 생성 데이터', CreatePostDto, ],
      responses: [
        [
          '새 게시글 작성 성공',
          [ false, 'SUCCESS', 'ADMIN_POST_CREATE_SUCCESS', [
            CreateExample.post('detail'),
          ], ],
        ],
        [
          '새 게시글 작성 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'ADMIN_POST_CREATE_ERROR', null, ],
        ],
      ],
    },
  })
  async adminCreatePost(
    @Req() req: AuthRequest,
    @Body() createData: CreatePostDto
  ): Promise<ResponseDto<SelectPostInfoType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.postsService.adminCreatePost(req.user.userNo, createData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_POST_CREATE_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_POST_CREATE_SUCCESS', result.data);
  }

  /**
   * @description 관리자 - 게시글 수정
   * @param updateData 게시글 수정 데이터
   */
  @Endpoint({
    endpoint: '/:pstNo',
    method: 'PUT',
    summary: '[관리자] 게시글 수정',
    description: '관리자가 게시글을 수정합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      params: [
        [ 'pstNo', '게시글 번호', 'number', true, ],
      ],
      body: [ '게시글 수정 데이터', UpdatePostDto, ],
      responses: [
        [
          '게시글 수정 성공',
          [ false, 'SUCCESS', 'ADMIN_POST_UPDATE_SUCCESS', CreateExample.post('detail'), ],
        ],
        [
          '게시글 수정 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'ADMIN_POST_UPDATE_ERROR', null, ],
        ],
      ],
    },
  })
  async adminUpdatePost(
    @Req() req: AuthRequest,
    @Body() updateData: UpdatePostDto
  ): Promise<ResponseDto<SelectPostInfoType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.postsService.adminUpdatePost(req.user.userNo, updateData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_POST_UPDATE_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_POST_UPDATE_SUCCESS', result.data);
  }

  /**
   * @description 관리자 - 다수 게시글 일괄 수정
   * @param updateData 게시글 일괄 수정 데이터
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'PUT',
    summary: '[관리자] 다수 게시글 일괄 수정',
    description: '관리자가 다수 게시글을 일괄 수정합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      body: [ '게시글 일괄 수정 데이터', UpdatePostDto, ],
      responses: [
        [
          '다수 게시글 일괄 수정 성공',
          [ false, 'SUCCESS', 'ADMIN_POST_UPDATE_SUCCESS', {
            successCnt: 1,
            failCnt: 0,
            failNoList: [],
          }, ],
        ],
        [
          '다수 게시글 일괄 수정 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'ADMIN_POST_UPDATE_ERROR', null, ],
        ],
      ],
    },
  })
  async adminMultipleUpdatePost(@Req() req: AuthRequest, @Body() updateData: UpdatePostDto): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.postsService.adminMultipleUpdatePost(req.user.userNo, updateData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_POST_UPDATE_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_POST_UPDATE_SUCCESS', result.data);
  }

  /**
   * @description 관리자 - 게시글 삭제
   * @param deleteData 게시글 삭제 데이터
   */
  @Endpoint({
    endpoint: '/:pstNo',
    method: 'DELETE',
    summary: '[관리자] 게시글 삭제',
    description: '관리자가 게시글을 삭제합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      params: [
        [ 'pstNo', '게시글 번호', 'number', true, ],
      ],
      body: [ '게시글 삭제 데이터', DeletePostDto, ],
      responses: [
        [
          '게시글 삭제 성공',
          [ false, 'SUCCESS', 'ADMIN_POST_DELETE_SUCCESS', true, ],
        ],
        [
          '게시글 삭제 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'ADMIN_POST_DELETE_ERROR', false, ],
        ],
      ],
    },
  })
  async adminDeletePost(@Req() req: AuthRequest, @Body() deleteData: DeletePostDto): Promise<ResponseDto<boolean>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.postsService.adminDeletePost(req.user.userNo, deleteData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_POST_DELETE_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_POST_DELETE_SUCCESS', result.data);
  }

  /**
   * @description 관리자 - 다수 게시글 일괄 삭제
   * @param deleteData 게시글 일괄 삭제 데이터
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'DELETE',
    summary: '[관리자] 다수 게시글 일괄 삭제',
    description: '관리자가 다수 게시글을 일괄 삭제합니다.',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
      body: [ '게시글 일괄 삭제 데이터', DeletePostDto, ],
      responses: [
        [
          '다수 게시글 일괄 삭제 성공',
          [ false, 'SUCCESS', 'ADMIN_POST_DELETE_SUCCESS', [
            { successCnt: 1, failCnt: 0, failNoList: [], },
          ], ],
        ],
        [
          '다수 게시글 일괄 삭제 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'ADMIN_POST_DELETE_ERROR', {
            successCnt: 1,
            failCnt: 0,
            failNoList: [],
          }, ],
        ],
      ],
    },
  })
  async adminMultipleDeletePost(@Req() req: AuthRequest, @Body() deleteData: DeletePostDto): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.postsService.adminMultipleDeletePost(req.user.userNo, deleteData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_POST_DELETE_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_POST_DELETE_SUCCESS', result.data);
  }
}
