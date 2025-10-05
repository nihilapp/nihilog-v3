import { Injectable } from '@nestjs/common';

import { ViewStatDto, type CreatePostDto, type DeletePostDto, type UpdatePostDto } from '@/dto/post.dto';
import type { MultipleResultType, RepoResponseType } from '@/endpoints/prisma/types/common.types';
import type { SelectPostInfoType, SharePlatformStatItemType, ViewStatItemType } from '@/endpoints/prisma/types/post.types';
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

  /**
   * @desc 새 게시글 작성
   * @param userNo 사용자 번호
   * @param createData 게시글 생성 데이터
   */
  async adminCreatePost(userNo: number, createData: CreatePostDto): Promise<RepoResponseType<SelectPostInfoType> | null> {
    return this.postRepository.createPost(userNo, createData);
  }

  /**
   * @desc 게시글 수정
   * @param userNo 사용자 번호
   * @param updateData 게시글 수정 데이터
   */
  async adminUpdatePost(userNo: number, updateData: UpdatePostDto): Promise<RepoResponseType<SelectPostInfoType> | null> {
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
