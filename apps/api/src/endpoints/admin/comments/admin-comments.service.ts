import { Injectable } from '@nestjs/common';
import { CommentStatus } from '@nihilog/db';
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
} from '@nihilog/schemas';
import type { MultipleResultType, RepoResponseType } from '@nihilog/schemas';

import { MESSAGE } from '@/code/messages';
import type { DeleteCommentDto, UpdateCommentDto } from '@/dto';
import type { AnalyzeStatDto } from '@/dto/common.dto';
import { CommentRepository } from '@/endpoints/repositories/comment.repository';
import { prismaResponse } from '@/utils/prismaResponse';

@Injectable()
export class AdminCommentsService {
  constructor(private readonly commentRepository: CommentRepository) { }

  // ========================================================
  // 댓글 통계 관련 메서드
  // ========================================================

  /**
   * @description 댓글 분석 통계 (시간대별 합산)
   * @param analyzeStatData 분석 통계 데이터
   * @param pstNo 포스트 번호 (선택적)
   */
  async adminGetAnalyzeCommentData(analyzeStatData: AnalyzeStatDto, pstNo?: number): Promise<RepoResponseType<AnalyzeCommentStatItemType[]> | null> {
    return this.commentRepository.getAnalyzeCommentData(
      analyzeStatData,
      pstNo
    );
  }

  /**
   * @description 포스트별 댓글 수 TOP N
   * @param analyzeStatData 분석 통계 데이터
   */
  async adminGetTopPostsByCommentCount(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<TopPostsByCommentItemType[]> | null> {
    return this.commentRepository.getTopPostsByCommentCount(
      analyzeStatData.limit || 10,
      analyzeStatData
    );
  }

  /**
   * @description 사용자별 댓글 작성 수 TOP N
   * @param analyzeStatData 분석 통계 데이터
   */
  async adminGetTopUsersByCommentCount(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<TopUsersByCommentItemType[]> | null> {
    return this.commentRepository.getTopUsersByCommentCount(
      analyzeStatData.limit || 10,
      analyzeStatData
    );
  }

  /**
   * @description 평균 댓글 수 / 포스트
   * @param analyzeStatData 분석 통계 데이터
   */
  async adminGetAverageCommentCountPerPost(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<AverageCommentPerPostItemType[]> | null> {
    return this.commentRepository.getAverageCommentCountPerPost(analyzeStatData);
  }

  /**
   * @description 댓글 상태별 분포
   */
  async adminGetCommentStatusDistribution(): Promise<RepoResponseType<CommentStatusDistributionItemType[]> | null> {
    return this.commentRepository.getCommentStatusDistribution();
  }

  /**
   * @description 댓글 승인율
   * @param analyzeStatData 분석 통계 데이터
   */
  async adminGetCommentApprovalRate(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<CommentApprovalRateItemType[]> | null> {
    return this.commentRepository.getCommentApprovalRate(analyzeStatData);
  }

  /**
   * @description 스팸 댓글 비율
   * @param analyzeStatData 분석 통계 데이터
   */
  async adminGetCommentSpamRate(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<CommentSpamRateItemType[]> | null> {
    return this.commentRepository.getCommentSpamRate(analyzeStatData);
  }

  /**
   * @description 답글 비율
   * @param analyzeStatData 분석 통계 데이터
   */
  async adminGetCommentReplyRatio(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<CommentReplyRatioItemType[]> | null> {
    return this.commentRepository.getCommentReplyRatio(analyzeStatData);
  }

  /**
   * @description 평균 답글 깊이
   * @param analyzeStatData 분석 통계 데이터
   */
  async adminGetCommentAverageDepth(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<CommentAverageDepthItemType[]> | null> {
    return this.commentRepository.getCommentAverageDepth(analyzeStatData);
  }

  /**
   * @description 댓글 없는 포스트 목록
   */
  async adminGetPostsWithoutComments(): Promise<RepoResponseType<PostsWithoutCommentsItemType[]> | null> {
    return this.commentRepository.getPostsWithoutComments();
  }

  // ========================================================
  // 기존 관리자 기능
  // ========================================================

  /**
   * @description 관리자 댓글 일괄 수정
   * @param userNo 사용자 번호
   * @param updateData 수정 데이터
   */
  async adminMultipleUpdateComment(userNo: number, updateData: UpdateCommentDto): Promise<RepoResponseType<MultipleResultType> | null> {
    // 상태 유효성 검증
    if (updateData.cmntSts !== undefined) {
      const validStatuses = [
        CommentStatus.PENDING,
        CommentStatus.APPROVED,
        CommentStatus.REJECTED,
        CommentStatus.SPAM,
      ];
      if (!validStatuses.includes(updateData.cmntSts)) {
        return prismaResponse(
          false,
          null,
          'BAD_REQUEST',
          MESSAGE.COMMENT.ADMIN.INVALID_STATUS
        );
      }
    }

    // 댓글 내용 검증 (USER 메시지 사용 - 일반 사용자와 동일한 검증 규칙)
    if (updateData.cmntCntnt !== undefined) {
      if (!updateData.cmntCntnt || updateData.cmntCntnt.trim().length === 0) {
        return prismaResponse(
          false,
          null,
          'BAD_REQUEST',
          MESSAGE.COMMENT.USER.CONTENT_REQUIRED
        );
      }
      if (updateData.cmntCntnt.length > 1000) {
        return prismaResponse(
          false,
          null,
          'BAD_REQUEST',
          MESSAGE.COMMENT.USER.CONTENT_TOO_LONG
        );
      }
    }

    return this.commentRepository.multipleUpdateComment(
      userNo,
      updateData
    );
  }

  /**
   * @description 관리자 댓글 일괄 삭제
   * @param userNo 사용자 번호
   * @param deleteData 삭제 데이터
   */
  async adminMultipleDeleteComment(userNo: number, deleteData: DeleteCommentDto): Promise<RepoResponseType<MultipleResultType> | null> {
    return this.commentRepository.multipleDeleteComment(
      userNo,
      deleteData
    );
  }
}
