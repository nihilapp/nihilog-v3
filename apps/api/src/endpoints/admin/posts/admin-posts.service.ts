import { Injectable } from '@nestjs/common';

import { ViewStatDto } from '@/dto/post.dto';
import type { RepoResponseType } from '@/endpoints/prisma/types/common.types';
import type { SharePlatformStatItemType, ViewStatItemType } from '@/endpoints/prisma/types/post.types';
import { PostRepository } from '@/endpoints/repositories/post.repository';

@Injectable()
export class AdminPostsService {
  constructor(private readonly postRepository: PostRepository) {}

  /**
   * @description 게시글 조회수 통계 조회
   * @param pstNo 게시글 번호
   * @param viewStatData 조회수 통계 데이터
   */
  async getPostViewStats(
    pstNo: number,
    viewStatData: ViewStatDto
  ): Promise<RepoResponseType<ViewStatItemType[]> | null> {
    return this.postRepository.getPostViewStats(pstNo, viewStatData);
  }

  /**
   * @description 게시글 공유 통계 조회
   * @param pstNo 게시글 번호
   * @param viewStatData 공유 통계 데이터
   */
  async getPostShareStatsByPlatform(pstNo: number, viewStatData: ViewStatDto): Promise<RepoResponseType<SharePlatformStatItemType[]> | null> {
    return this.postRepository.getPostShareStatsByPlatform(pstNo, viewStatData);
  }

  /**
   * @description 전체 게시글 공유 통계 조회
   * @param viewStatData 공유 통계 데이터
   */
  async getAllPostShareStatsByPlatform(viewStatData: ViewStatDto): Promise<RepoResponseType<SharePlatformStatItemType[]> | null> {
    return this.postRepository.getAllPostShareStatsByPlatform(viewStatData);
  }
}
