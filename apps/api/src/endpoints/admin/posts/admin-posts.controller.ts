import { Body, Controller, Param, Query, Req, UseGuards } from '@nestjs/common';

import { MESSAGE } from '@/code/messages';
import { Endpoint } from '@/decorators/endpoint.decorator';
import type { AuthRequest, ResponseDto } from '@/dto';
import { CreatePostDto, DeletePostDto, UpdatePostDto, AnalyzeStatDto } from '@/dto/post.dto';
import { AdminPostsService } from '@/endpoints/admin/posts/admin-posts.service';
import { AdminAuthGuard } from '@/endpoints/auth/admin-auth.guard';
import type { MultipleResultType } from '@/endpoints/prisma/types/common.types';
import type { AnalyzePostItemType, SelectPostType, SharePlatformStatItemType, AverageViewStatItemType } from '@/endpoints/prisma/types/post.types';
import { createError, createResponse } from '@/utils';

@Controller('admin/posts')
@UseGuards(AdminAuthGuard)
export class AdminPostsController {
  constructor(private readonly postsService: AdminPostsService) {}

  /**
   * @description 관리자 - 게시글 분석 데이터 조회
   * @param analyzeStatData 분석 통계 데이터
   * @param pstNo 게시글 번호 (쿼리 파라미터, 선택사항)
   */
  @Endpoint({
    endpoint: '/analyze',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetAnalyzePostData(
    @Req() req: AuthRequest,
    @Body() analyzeStatData: AnalyzeStatDto,
    @Query('pstNo') pstNo?: number
  ): Promise<ResponseDto<AnalyzePostItemType[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.postsService.getAnalyzePostData(analyzeStatData, pstNo);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.POST.ADMIN.STATISTICS_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.POST.ADMIN.STATISTICS_SUCCESS,
      result.data
    );
  }

  /**
   * @description 관리자 - 플랫폼별 공유 통계 조회
   * @param analyzeStatData 분석 통계 데이터
   * @param pstNo 게시글 번호 (선택사항)
   */
  @Endpoint({
    endpoint: '/shares/:pstNo?',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetPostShareStatsByPlatform(
    @Req() req: AuthRequest,
    @Param('pstNo') pstNo: number | undefined,
    @Body() analyzeStatData: AnalyzeStatDto
  ): Promise<ResponseDto<SharePlatformStatItemType[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.postsService.getPostShareStatsByPlatform(analyzeStatData, pstNo);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.POST.ADMIN.STATISTICS_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.POST.ADMIN.STATISTICS_SUCCESS,
      result.data
    );
  }

  /**
   * @description 관리자 - 게시글별 평균 조회수 조회 (시간대별)
   * @param analyzeStatData 분석 통계 데이터
   */
  @Endpoint({
    endpoint: '/average-views',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetAverageForPostView(
    @Req() req: AuthRequest,
    @Body() analyzeStatData: AnalyzeStatDto
  ): Promise<ResponseDto<AverageViewStatItemType[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.postsService.getAverageForPostView(analyzeStatData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.POST.ADMIN.STATISTICS_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.POST.ADMIN.STATISTICS_SUCCESS,
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
        result?.error?.message || MESSAGE.POST.ADMIN.CREATE_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.POST.ADMIN.CREATE_SUCCESS, result.data);
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
        result?.error?.message || MESSAGE.POST.ADMIN.UPDATE_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.POST.ADMIN.UPDATE_SUCCESS, result.data);
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
        result?.error?.message || MESSAGE.POST.ADMIN.UPDATE_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.POST.ADMIN.UPDATE_SUCCESS, result.data);
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
        result?.error?.message || MESSAGE.POST.ADMIN.DELETE_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.POST.ADMIN.DELETE_SUCCESS, result.data);
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
        result?.error?.message || MESSAGE.POST.ADMIN.DELETE_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.POST.ADMIN.DELETE_SUCCESS, result.data);
  }
}
