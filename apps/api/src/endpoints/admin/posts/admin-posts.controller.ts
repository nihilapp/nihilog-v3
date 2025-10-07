import { Body, Controller, Param, Req, UseGuards } from '@nestjs/common';

import { Endpoint } from '@/decorators/endpoint.decorator';
import type { AuthRequest, ResponseDto } from '@/dto';
import { CreatePostDto, DeletePostDto, UpdatePostDto, ViewStatDto } from '@/dto/post.dto';
import { AdminPostsService } from '@/endpoints/admin/posts/admin-posts.service';
import { AdminAuthGuard } from '@/endpoints/auth/admin-auth.guard';
import type { MultipleResultType } from '@/endpoints/prisma/types/common.types';
import type { SelectPostType, SharePlatformStatItemType, ViewStatItemType } from '@/endpoints/prisma/types/post.types';
import { createError, createResponse } from '@/utils';

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
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
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
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
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
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
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
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminCreatePost(
    @Req() req: AuthRequest,
    @Body() createData: CreatePostDto
  ): Promise<ResponseDto<SelectPostType>> {
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
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminUpdatePost(
    @Req() req: AuthRequest,
    @Body() updateData: UpdatePostDto
  ): Promise<ResponseDto<SelectPostType>> {
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
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
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
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
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
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
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
