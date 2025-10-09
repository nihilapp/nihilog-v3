import { Injectable } from '@nestjs/common';

import { AnalyzeStatDto } from '@/dto/common.dto';
import { type CreatePostDto, type DeletePostDto, type UpdatePostDto } from '@/dto/post.dto';
import type { MultipleResultType, RepoResponseType } from '@/endpoints/prisma/types/common.types';
import type { AnalyzePostItemType, SelectPostType, SharePlatformStatItemType, AverageViewStatItemType, AverageBookmarkStatItemType, TopPopularPostItemType, TopCommentPostItemType, PostStatusRatioItemType } from '@/endpoints/prisma/types/post.types';
import { PostRepository } from '@/endpoints/repositories/post.repository';

@Injectable()
export class AdminPostsService {
  constructor(private readonly postRepository: PostRepository) {}

  /**
   * @description 게시글 분석 데이터 조회
   * @param analyzeStatData 분석 통계 데이터
   * @param pstNo 게시글 번호 (선택사항 - 없으면 전체 게시글)
   */
  async getAnalyzePostData(
    analyzeStatData: AnalyzeStatDto,
    pstNo?: number
  ): Promise<RepoResponseType<AnalyzePostItemType[]> | null> {
    return this.postRepository.getAnalyzePostData(analyzeStatData, pstNo);
  }

  /**
   * @description 플랫폼별 공유 통계 조회
   * @param analyzeStatData 분석 통계 데이터
   * @param pstNo 게시글 번호 (선택사항 - 없으면 전체 게시글)
   */
  async getPostShareStatsByPlatform(
    analyzeStatData: AnalyzeStatDto,
    pstNo?: number
  ): Promise<RepoResponseType<SharePlatformStatItemType[]> | null> {
    return this.postRepository.getPostShareStatsByPlatform(analyzeStatData, pstNo);
  }

  /**
   * @description 게시글별 평균 조회수 조회 (시간대별)
   * @param analyzeStatData 분석 통계 데이터
   */
  async getAverageForPostView(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<AverageViewStatItemType[]> | null> {
    return this.postRepository.getAverageForPostView(analyzeStatData);
  }

  /**
   * @description 게시글당 평균 북마크 수 조회 (시간대별)
   * @param analyzeStatData 분석 통계 데이터
   */
  async getAverageBookmarkCountPerPost(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<AverageBookmarkStatItemType[]> | null> {
    return this.postRepository.getAverageBookmarkCountPerPost(analyzeStatData);
  }

  /**
   * @description 인기 게시글 TOP N (조회수 기준)
   * @param limit 상위 N개
   * @param analyzeStatData 분석 통계 데이터 (선택사항)
   */
  async getTopPopularPostsByViewCount(limit: number, analyzeStatData?: AnalyzeStatDto): Promise<RepoResponseType<TopPopularPostItemType[]> | null> {
    return this.postRepository.getTopPopularPostsByViewCount(limit, analyzeStatData);
  }

  /**
   * @description 댓글 많은 게시글 TOP N
   * @param limit 상위 N개
   * @param analyzeStatData 분석 통계 데이터 (선택사항)
   */
  async getTopPostsByCommentCount(limit: number, analyzeStatData?: AnalyzeStatDto): Promise<RepoResponseType<TopCommentPostItemType[]> | null> {
    return this.postRepository.getTopPostsByCommentCount(limit, analyzeStatData);
  }

  /**
   * @description 게시글 상태 비율 조회
   * @param analyzeStatData 분석 통계 데이터 (선택사항)
   */
  async getPostStatusRatio(analyzeStatData?: AnalyzeStatDto): Promise<RepoResponseType<PostStatusRatioItemType[]> | null> {
    return this.postRepository.getPostStatusRatio(analyzeStatData);
  }

  /**
   * @desc 새 게시글 작성
   * @param userNo 사용자 번호
   * @param createData 게시글 생성 데이터
   */
  async adminCreatePost(userNo: number, createData: CreatePostDto): Promise<RepoResponseType<SelectPostType> | null> {
    return this.postRepository.createPost(userNo, createData);
  }

  /**
   * @desc 게시글 수정
   * @param userNo 사용자 번호
   * @param updateData 게시글 수정 데이터
   */
  async adminUpdatePost(userNo: number, updateData: UpdatePostDto): Promise<RepoResponseType<SelectPostType> | null> {
    return this.postRepository.updatePost(userNo, updateData);
  }

  /**
   * @desc 다수 게시글 일괄 수정
   * @param userNo 사용자 번호
   * @param updateData 게시글 일괄 수정 데이터
   */
  async adminMultipleUpdatePost(userNo: number, updateData: UpdatePostDto): Promise<RepoResponseType<MultipleResultType> | null> {
    return this.postRepository.multipleUpdatePost(userNo, updateData);
  }

  /**
   * @desc 게시글 삭제
   * @param userNo 사용자 번호
   * @param deleteData 게시글 삭제 데이터
   */
  async adminDeletePost(userNo: number, deleteData: DeletePostDto): Promise<RepoResponseType<boolean> | null> {
    return this.postRepository.deletePost(userNo, deleteData);
  }

  /**
   * @desc 다수 게시글 일괄 삭제
   * @param userNo 사용자 번호
   * @param deleteData 게시글 일괄 삭제 데이터
   */
  async adminMultipleDeletePost(userNo: number, deleteData: DeletePostDto): Promise<RepoResponseType<MultipleResultType> | null> {
    return this.postRepository.multipleDeletePost(userNo, deleteData);
  }
}
