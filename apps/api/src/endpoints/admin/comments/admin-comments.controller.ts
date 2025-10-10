import { Body, Controller, Query, Req, UseGuards } from '@nestjs/common';

import { MESSAGE } from '@/code/messages';
import { Endpoint } from '@/decorators/endpoint.decorator';
import type { AuthRequest, DeleteCommentDto, UpdateCommentDto, ResponseDto } from '@/dto';
import { AnalyzeStatDto } from '@/dto/common.dto';
import { AdminCommentsService } from '@/endpoints/admin/comments/admin-comments.service';
import { AdminAuthGuard } from '@/endpoints/auth/admin-auth.guard';
import type {
  AnalyzeCommentStatItemType,
  TopPostsByCommentItemType,
  TopUsersByCommentItemType,
  AverageCommentPerPostItemType,
  CommentStatusDistributionItemType,
  CommentApprovalRateItemType,
  CommentSpamRateItemType,
  CommentReplyRatioItemType,
  CommentAverageDepthItemType,
  PostsWithoutCommentsItemType
} from '@/endpoints/prisma/types/comment.types';
import type { MultipleResultType } from '@/endpoints/prisma/types/common.types';
import { createError, createResponse } from '@/utils';

@Controller('admin/comments')
@UseGuards(AdminAuthGuard)
export class AdminCommentsController {
  constructor(private readonly adminCommentsService: AdminCommentsService) { }

  // ========================================================
  // 댓글 통계 관련 엔드포인트
  // ========================================================

  /**
   * @description 댓글 분석 통계
   * @param analyzeStatData 분석 통계 데이터
   * @param pstNo 게시글 번호 (선택적, 쿼리 스트링)
   */
  @Endpoint({
    endpoint: '/analyze/overview',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetAnalyzeCommentData(
    @Body() analyzeStatData: AnalyzeStatDto,
    @Query('pstNo') pstNo?: number
  ): Promise<ResponseDto<AnalyzeCommentStatItemType[]>> {
    const result = await this.adminCommentsService.adminGetAnalyzeCommentData(analyzeStatData, pstNo);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.COMMENT.ADMIN.ANALYZE_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.COMMENT.ADMIN.ANALYZE_SUCCESS, result.data);
  }

  /**
   * @description 게시글별 댓글 수 TOP N
   * @param limit 상위 N개
   * @param analyzeStatData 분석 통계 데이터 (선택적)
   */
  @Endpoint({
    endpoint: '/analyze/top-posts',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetTopPostsByCommentCount(
    @Query('limit') limit: number,
    @Body() analyzeStatData?: AnalyzeStatDto
  ): Promise<ResponseDto<TopPostsByCommentItemType[]>> {
    const result = await this.adminCommentsService.adminGetTopPostsByCommentCount(limit || 10, analyzeStatData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.COMMENT.ADMIN.STATISTICS_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.COMMENT.ADMIN.STATISTICS_SUCCESS, result.data);
  }

  /**
   * @description 사용자별 댓글 작성 수 TOP N
   * @param limit 상위 N개
   * @param analyzeStatData 분석 통계 데이터 (선택적)
   */
  @Endpoint({
    endpoint: '/analyze/top-users',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetTopUsersByCommentCount(
    @Query('limit') limit: number,
    @Body() analyzeStatData?: AnalyzeStatDto
  ): Promise<ResponseDto<TopUsersByCommentItemType[]>> {
    const result = await this.adminCommentsService.adminGetTopUsersByCommentCount(limit || 10, analyzeStatData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.COMMENT.ADMIN.STATISTICS_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.COMMENT.ADMIN.STATISTICS_SUCCESS, result.data);
  }

  /**
   * @description 평균 댓글 수 / 게시글
   * @param analyzeStatData 분석 통계 데이터
   */
  @Endpoint({
    endpoint: '/analyze/average-per-post',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetAverageCommentCountPerPost(@Body() analyzeStatData: AnalyzeStatDto): Promise<ResponseDto<AverageCommentPerPostItemType[]>> {
    const result = await this.adminCommentsService.adminGetAverageCommentCountPerPost(analyzeStatData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.COMMENT.ADMIN.STATISTICS_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.COMMENT.ADMIN.STATISTICS_SUCCESS, result.data);
  }

  /**
   * @description 댓글 상태별 분포
   */
  @Endpoint({
    endpoint: '/analyze/status-distribution',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetCommentStatusDistribution(): Promise<ResponseDto<CommentStatusDistributionItemType[]>> {
    const result = await this.adminCommentsService.adminGetCommentStatusDistribution();

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.COMMENT.ADMIN.STATISTICS_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.COMMENT.ADMIN.STATISTICS_SUCCESS, result.data);
  }

  /**
   * @description 댓글 승인율
   * @param analyzeStatData 분석 통계 데이터
   */
  @Endpoint({
    endpoint: '/analyze/approval-rate',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetCommentApprovalRate(@Body() analyzeStatData: AnalyzeStatDto): Promise<ResponseDto<CommentApprovalRateItemType[]>> {
    const result = await this.adminCommentsService.adminGetCommentApprovalRate(analyzeStatData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.COMMENT.ADMIN.STATISTICS_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.COMMENT.ADMIN.STATISTICS_SUCCESS, result.data);
  }

  /**
   * @description 스팸 댓글 비율
   * @param analyzeStatData 분석 통계 데이터
   */
  @Endpoint({
    endpoint: '/analyze/spam-rate',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetCommentSpamRate(@Body() analyzeStatData: AnalyzeStatDto): Promise<ResponseDto<CommentSpamRateItemType[]>> {
    const result = await this.adminCommentsService.adminGetCommentSpamRate(analyzeStatData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.COMMENT.ADMIN.STATISTICS_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.COMMENT.ADMIN.STATISTICS_SUCCESS, result.data);
  }

  /**
   * @description 답글 비율
   * @param analyzeStatData 분석 통계 데이터
   */
  @Endpoint({
    endpoint: '/analyze/reply-ratio',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetCommentReplyRatio(@Body() analyzeStatData: AnalyzeStatDto): Promise<ResponseDto<CommentReplyRatioItemType[]>> {
    const result = await this.adminCommentsService.adminGetCommentReplyRatio(analyzeStatData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.COMMENT.ADMIN.STATISTICS_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.COMMENT.ADMIN.STATISTICS_SUCCESS, result.data);
  }

  /**
   * @description 평균 답글 깊이
   * @param analyzeStatData 분석 통계 데이터
   */
  @Endpoint({
    endpoint: '/analyze/average-depth',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetCommentAverageDepth(@Body() analyzeStatData: AnalyzeStatDto): Promise<ResponseDto<CommentAverageDepthItemType[]>> {
    const result = await this.adminCommentsService.adminGetCommentAverageDepth(analyzeStatData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.COMMENT.ADMIN.STATISTICS_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.COMMENT.ADMIN.STATISTICS_SUCCESS, result.data);
  }

  /**
   * @description 댓글 없는 게시글 목록
   */
  @Endpoint({
    endpoint: '/analyze/posts-without-comments',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetPostsWithoutComments(): Promise<ResponseDto<PostsWithoutCommentsItemType[]>> {
    const result = await this.adminCommentsService.adminGetPostsWithoutComments();

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.COMMENT.ADMIN.STATISTICS_ERROR
      );
    }

    return createResponse('SUCCESS', MESSAGE.COMMENT.ADMIN.STATISTICS_SUCCESS, result.data);
  }

  // ========================================================
  // 기존 관리자 기능
  // ========================================================

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
        result?.error?.message || MESSAGE.COMMENT.ADMIN.MULTIPLE_UPDATE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.COMMENT.ADMIN.MULTIPLE_UPDATE_SUCCESS,
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
        result?.error?.message || MESSAGE.COMMENT.ADMIN.MULTIPLE_DELETE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.COMMENT.ADMIN.MULTIPLE_DELETE_SUCCESS,
      result.data
    );
  }
}
