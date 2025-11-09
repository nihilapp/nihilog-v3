import { Injectable } from '@nestjs/common';

import { MESSAGE } from '@/code/messages';
import type { SearchPostDto } from '@/dto';
import type { CreatePostBookmarkDto, CreatePostShareLogDto, CreatePostViewLogDto, DeletePostBookmarkDto, SearchPostBookmarkDto } from '@/dto/post.dto';
import type { ListType, RepoResponseType } from '@nihilog/schemas';
import type {
  SelectPostBookmarkListItemType,
  SelectPostBookmarkType,
  SelectPostListItemType,
  SelectPostType,
  SelectPostShareLogType,
  SelectPostViewLogType
} from '@nihilog/schemas';
import { PostRepository } from '@/endpoints/repositories/post.repository';
import { prismaResponse } from '@/utils/prismaResponse';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostRepository) {}

  /**
   * @description 포스트 목록 조회
   * @param searchData 검색 조건
   */
  async getPostList(searchData: SearchPostDto): Promise<RepoResponseType<ListType<SelectPostListItemType>> | null> {
    return this.postRepository.getPostList(searchData);
  }

  /**
   * @description 포스트 상세 조회
   * @param pstNo 포스트 번호
   */
  async getPostByPstNo(pstNo: number): Promise<RepoResponseType<SelectPostType> | null> {
    const result = await this.postRepository.getPostByPstNo(pstNo);

    if (!result?.success) {
      return prismaResponse(
        false,
        null,
        result?.error?.code || 'NOT_FOUND',
        MESSAGE.POST.USER.NOT_FOUND
      );
    }

    return result;
  }

  /**
   * @description 포스트 상세 조회
   * @param pstCd 포스트 슬러그
   */
  async getPostByPstCd(pstCd: string): Promise<RepoResponseType<SelectPostType> | null> {
    const result = await this.postRepository.getPostByPstCd(pstCd);

    if (!result?.success) {
      return prismaResponse(
        false,
        null,
        result?.error?.code || 'NOT_FOUND',
        MESSAGE.POST.USER.INVALID_SLUG
      );
    }

    return result;
  }

  /**
   * @description 태그 번호로 포스트 목록 조회
   * @param tagNo 태그 번호
   * @param searchData 검색 조건
   */
  async getPostListByTagNo(tagNo: number, searchData: SearchPostDto): Promise<RepoResponseType<ListType<SelectPostListItemType>> | null> {
    return this.postRepository.getPostListByTagNo(
      tagNo,
      searchData
    );
  }

  /**
   * @description 카테고리 번호로 포스트 목록 조회
   * @param ctgryNo 카테고리 번호
   * @param searchData 검색 조건
   */
  async getPostListByCtgryNo(ctgryNo: number, searchData: SearchPostDto): Promise<RepoResponseType<ListType<SelectPostListItemType>> | null> {
    return this.postRepository.getPostListByCtgryNo(
      ctgryNo,
      searchData
    );
  }

  /**
   * @description 날짜로 포스트 목록 조회
   * @param date 날짜(yyyyMM)
   * @param searchData 검색 조건
   */
  async getPostListFromArchive(date: string, searchData: SearchPostDto): Promise<RepoResponseType<ListType<SelectPostListItemType>> | null> {
    return this.postRepository.getPostListFromArchive(
      date,
      searchData
    );
  }

  /**
   * @description 포스트 조회 로그 기록
   * @param createData 조회 로그 생성 데이터
   */
  async createPostViewLog(createData: CreatePostViewLogDto): Promise<RepoResponseType<SelectPostViewLogType> | null> {
    return this.postRepository.createPostViewLog(
      createData.pstNo,
      createData.ip
    );
  }

  /**
   * @description 포스트 공유 로그 기록
   * @param createData 공유 로그 생성 데이터
   */
  async createPostShareLog(createData: CreatePostShareLogDto): Promise<RepoResponseType<SelectPostShareLogType> | null> {
    return this.postRepository.createPostShareLog(createData);
  }

  /**
   * @description 포스트 북마크 생성
   * @param createData 북마크 생성 데이터
   */
  async createPostBookmark(createData: CreatePostBookmarkDto): Promise<RepoResponseType<SelectPostBookmarkType> | null> {
    return this.postRepository.createPostBookmark(createData);
  }

  /**
   * @description 포스트 북마크 삭제
   * @param deleteData 북마크 삭제 데이터
   */
  async deletePostBookmark(deleteData: DeletePostBookmarkDto): Promise<RepoResponseType<boolean> | null> {
    return this.postRepository.deletePostBookmark(deleteData);
  }

  /**
   * @description 북마크한 포스트 목록 조회
   * @param userNo 사용자 번호
   * @param searchData 검색 데이터
   */
  async getBookmarkedPostListByUserNo(
    userNo: number,
    searchData: SearchPostBookmarkDto
  ): Promise<RepoResponseType<ListType<SelectPostBookmarkListItemType>> | null> {
    return this.postRepository.getBookmarkedPostListByUserNo(
      userNo,
      searchData
    );
  }
}
