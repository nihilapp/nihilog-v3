import { Body, Controller, Query, Req, UseGuards } from '@nestjs/common';

import { MESSAGE } from '@/code/messages';
import { Endpoint } from '@/decorators/endpoint.decorator';
import type { AuthRequest, ResponseDto } from '@/dto';
import { AnalyzeStatDto } from '@/dto/common.dto';
import { CreatePostDto, DeletePostDto, UpdatePostDto } from '@/dto/post.dto';
import { AdminPostsService } from '@/endpoints/admin/posts/admin-posts.service';
import { AdminAuthGuard } from '@/endpoints/auth/admin-auth.guard';
import type { MultipleResultType } from '@/endpoints/prisma/types/common.types';
import type { AnalyzePostItemType, SelectPostType, SharePlatformStatItemType, AverageViewStatItemType, AverageBookmarkStatItemType, TopPopularPostItemType, TopCommentPostItemType, PostStatusRatioItemType } from '@/endpoints/prisma/types/post.types';
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
    endpoint: '/analyze/overview',
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
    endpoint: '/analyze/shares',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetPostShareStatsByPlatform(
    @Req() req: AuthRequest,
    @Query('pstNo') pstNo: number | undefined,
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
    endpoint: '/analyze/average-views',
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
   * @description 관리자 - 게시글당 평균 북마크 수 조회 (시간대별)
   * @param analyzeStatData 분석 통계 데이터
   */
  @Endpoint({
    endpoint: '/analyze/average-bookmarks',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetAverageBookmarkCountPerPost(
    @Req() req: AuthRequest,
    @Body() analyzeStatData: AnalyzeStatDto
  ): Promise<ResponseDto<AverageBookmarkStatItemType[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.postsService.getAverageBookmarkCountPerPost(analyzeStatData);

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
   * @description 관리자 - 인기 게시글 TOP N (조회수 기준)
   * @param limit 상위 N개
   * @param analyzeStatData 분석 통계 데이터 (선택사항)
   */
  @Endpoint({
    endpoint: '/analyze/top-popular',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetTopPopularPostsByViewCount(
    @Req() req: AuthRequest,
    @Body() body: { limit: number; analyzeStatData?: AnalyzeStatDto }
  ): Promise<ResponseDto<TopPopularPostItemType[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const { limit, analyzeStatData, } = body;
    const result = await this.postsService.getTopPopularPostsByViewCount(limit, analyzeStatData);

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
   * @description 관리자 - 댓글 많은 게시글 TOP N
   * @param limit 상위 N개
   * @param analyzeStatData 분석 통계 데이터 (선택사항)
   */
  @Endpoint({
    endpoint: '/analyze/top-comments',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetTopPostsByCommentCount(
    @Req() req: AuthRequest,
    @Body() body: { limit: number; analyzeStatData?: AnalyzeStatDto }
  ): Promise<ResponseDto<TopCommentPostItemType[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const { limit, analyzeStatData, } = body;
    const result = await this.postsService.getTopPostsByCommentCount(limit, analyzeStatData);

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
   * @description 관리자 - 게시글 상태 비율 조회
   * @param analyzeStatData 분석 통계 데이터 (선택사항)
   */
  @Endpoint({
    endpoint: '/analyze/status-ratio',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetPostStatusRatio(
    @Req() req: AuthRequest,
    @Body() analyzeStatData?: AnalyzeStatDto
  ): Promise<ResponseDto<PostStatusRatioItemType[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.postsService.getPostStatusRatio(analyzeStatData);

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
