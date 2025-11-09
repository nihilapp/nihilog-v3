import { Injectable } from '@nestjs/common';

import { MESSAGE } from '@/code/messages';
import { AnalyzeStatDto } from '@/dto/common.dto';
import { type CreatePostDto, type DeletePostDto, type UpdatePostDto } from '@/dto/post.dto';
import type { MultipleResultType, RepoResponseType } from '@nihilog/schemas';
import type { AnalyzePostItemType, SelectPostType, SharePlatformStatItemType, AverageViewStatItemType, AverageBookmarkStatItemType, TopPopularPostItemType, TopCommentPostItemType, PostStatusRatioItemType } from '@nihilog/schemas';
import { CategoryRepository } from '@/endpoints/repositories/category.repository';
import { PostRepository } from '@/endpoints/repositories/post.repository';
import { prismaResponse } from '@/utils/prismaResponse';

@Injectable()
export class AdminPostsService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly categoryRepository: CategoryRepository
  ) {}

  /**
   * @description 포스트 분석 데이터 조회
   * @param analyzeStatData 분석 통계 데이터
   * @param pstNo 포스트 번호 (선택사항 - 없으면 전체 포스트)
   */
  async getAnalyzePostData(
    analyzeStatData: AnalyzeStatDto,
    pstNo?: number
  ): Promise<RepoResponseType<AnalyzePostItemType[]> | null> {
    return this.postRepository.getAnalyzePostData(
      analyzeStatData,
      pstNo
    );
  }

  /**
   * @description 플랫폼별 공유 통계 조회
   * @param analyzeStatData 분석 통계 데이터
   * @param pstNo 포스트 번호 (선택사항 - 없으면 전체 포스트)
   */
  async getPostShareStatsByPlatform(
    analyzeStatData: AnalyzeStatDto,
    pstNo?: number
  ): Promise<RepoResponseType<SharePlatformStatItemType[]> | null> {
    return this.postRepository.getPostShareStatsByPlatform(
      analyzeStatData,
      pstNo
    );
  }

  /**
   * @description 포스트별 평균 조회수 조회 (시간대별)
   * @param analyzeStatData 분석 통계 데이터
   */
  async getAverageForPostView(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<AverageViewStatItemType[]> | null> {
    return this.postRepository.getAverageForPostView(analyzeStatData);
  }

  /**
   * @description 포스트당 평균 북마크 수 조회 (시간대별)
   * @param analyzeStatData 분석 통계 데이터
   */
  async getAverageBookmarkCountPerPost(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<AverageBookmarkStatItemType[]> | null> {
    return this.postRepository.getAverageBookmarkCountPerPost(analyzeStatData);
  }

  /**
   * @description 인기 포스트 TOP N (조회수 기준)
   * @param analyzeStatData 분석 통계 데이터
   */
  async getTopPopularPostsByViewCount(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<TopPopularPostItemType[]> | null> {
    return this.postRepository.getTopPopularPostsByViewCount(
      analyzeStatData.limit || 10,
      analyzeStatData
    );
  }

  /**
   * @description 댓글 많은 포스트 TOP N
   * @param analyzeStatData 분석 통계 데이터
   */
  async getTopPostsByCommentCount(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<TopCommentPostItemType[]> | null> {
    return this.postRepository.getTopPostsByCommentCount(
      analyzeStatData.limit || 10,
      analyzeStatData
    );
  }

  /**
   * @description 포스트 상태 비율 조회
   * @param analyzeStatData 분석 통계 데이터 (선택사항)
   */
  async getPostStatusRatio(analyzeStatData?: AnalyzeStatDto): Promise<RepoResponseType<PostStatusRatioItemType[]> | null> {
    return this.postRepository.getPostStatusRatio(analyzeStatData);
  }

  /**
   * @desc 새 포스트 작성
   * @param userNo 사용자 번호
   * @param createData 포스트 생성 데이터
   */
  async adminCreatePost(userNo: number, createData: CreatePostDto): Promise<RepoResponseType<SelectPostType> | null> {
    // 슬러그 중복 확인
    if (createData.pstCd) {
      const existingPostBySlug = await this.postRepository.getPostByPstCd(createData.pstCd);
      if (existingPostBySlug?.success && existingPostBySlug.data) {
        return prismaResponse(
          false,
          null,
          'CONFLICT',
          MESSAGE.POST.ADMIN.SLUG_DUPLICATE
        );
      }
    }

    // 카테고리 유효성 확인
    if (createData.ctgryNo) {
      const category = await this.categoryRepository.getCategoryByCtgryNo(createData.ctgryNo);
      if (!category?.success || !category.data) {
        return prismaResponse(
          false,
          null,
          'NOT_FOUND',
          MESSAGE.POST.ADMIN.INVALID_CATEGORY
        );
      }
    }

    return this.postRepository.createPost(
      userNo,
      createData
    );
  }

  /**
   * @desc 포스트 수정
   * @param userNo 사용자 번호
   * @param pstNo 포스트 번호
   * @param updateData 포스트 수정 데이터
   */
  async adminUpdatePost(userNo: number, pstNo: number, updateData: UpdatePostDto): Promise<RepoResponseType<SelectPostType> | null> {
    // 포스트 존재 확인
    const existingPost = await this.postRepository.getPostByPstNo(pstNo);
    if (!existingPost?.success || !existingPost.data) {
      return prismaResponse(
        false,
        null,
        'NOT_FOUND',
        MESSAGE.POST.ADMIN.NOT_FOUND
      );
    }

    // 슬러그 중복 확인 (자신 제외)
    if (updateData.pstCd && updateData.pstCd !== existingPost.data.pstCd) {
      const postWithSameSlug = await this.postRepository.getPostByPstCd(updateData.pstCd);
      if (postWithSameSlug?.success && postWithSameSlug.data) {
        return prismaResponse(
          false,
          null,
          'CONFLICT',
          MESSAGE.POST.ADMIN.SLUG_DUPLICATE
        );
      }
    }

    // 카테고리 유효성 확인
    if (updateData.ctgryNo !== undefined && updateData.ctgryNo !== null) {
      const category = await this.categoryRepository.getCategoryByCtgryNo(updateData.ctgryNo);
      if (!category?.success || !category.data) {
        return prismaResponse(
          false,
          null,
          'NOT_FOUND',
          MESSAGE.POST.ADMIN.INVALID_CATEGORY
        );
      }
    }

    return this.postRepository.updatePost(
      userNo,
      pstNo,
      updateData
    );
  }

  /**
   * @desc 다수 포스트 일괄 수정
   * @param userNo 사용자 번호
   * @param updateData 포스트 일괄 수정 데이터
   */
  async adminMultipleUpdatePost(userNo: number, updateData: UpdatePostDto): Promise<RepoResponseType<MultipleResultType> | null> {
    return this.postRepository.multipleUpdatePost(
      userNo,
      updateData
    );
  }

  /**
   * @desc 포스트 삭제
   * @param userNo 사용자 번호
   * @param pstNo 포스트 번호
   */
  async adminDeletePost(userNo: number, pstNo: number): Promise<RepoResponseType<boolean> | null> {
    // 포스트 존재 확인
    const existingPost = await this.postRepository.getPostByPstNo(pstNo);
    if (!existingPost?.success || !existingPost.data) {
      return prismaResponse(
        false,
        null,
        'NOT_FOUND',
        MESSAGE.POST.ADMIN.NOT_FOUND
      );
    }

    return this.postRepository.deletePost(
      userNo,
      pstNo
    );
  }

  /**
   * @desc 다수 포스트 일괄 삭제
   * @param userNo 사용자 번호
   * @param deleteData 포스트 일괄 삭제 데이터
   */
  async adminMultipleDeletePost(userNo: number, deleteData: DeletePostDto): Promise<RepoResponseType<MultipleResultType> | null> {
    return this.postRepository.multipleDeletePost(
      userNo,
      deleteData
    );
  }
}
