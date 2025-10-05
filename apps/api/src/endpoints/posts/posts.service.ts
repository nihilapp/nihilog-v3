import { Injectable } from '@nestjs/common';

import type { SearchPostDto } from '@/dto';
import type { CreatePostShareLogDto } from '@/dto/post-sharelog.dto';
import type { CreatePostBookmarkDto, DeletePostBookmarkDto, SearchPostBookmarkDto } from '@/dto/post.dto';
import type { ListType, RepoResponseType } from '@/endpoints/prisma/types/common.types';
import type {
  SelectPostBookmarkListItemType,
  SelectPostBookmarkType,
  SelectPostInfoListItemType,
  SelectPostInfoType,
  SelectPostShareLogType,
  SelectPostViewLogType
} from '@/endpoints/prisma/types/post.types';
import { PostRepository } from '@/endpoints/repositories/post.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostRepository) {}

  /**
   * @description 게시글 목록 조회
   * @param searchData 검색 조건
   */
  async getPostList(searchData: SearchPostDto): Promise<RepoResponseType<ListType<SelectPostInfoListItemType>> | null> {
    return this.postRepository.getPostList(searchData);
  }

  /**
   * @description 게시글 상세 조회
   * @param pstNo 게시글 번호
   */
  async getPostByPstNo(pstNo: number): Promise<RepoResponseType<SelectPostInfoType> | null> {
    return this.postRepository.getPostByPstNo(pstNo);
  }

  /**
   * @description 게시글 상세 조회
   * @param pstCd 게시글 슬러그
   */
  async getPostByPstCd(pstCd: string): Promise<RepoResponseType<SelectPostInfoType> | null> {
    return this.postRepository.getPostByPstCd(pstCd);
  }

  /**
   * @description 태그 번호로 게시글 목록 조회
   * @param tagNo 태그 번호
   * @param searchData 검색 조건
   */
  async getPostListByTagNo(tagNo: number, searchData: SearchPostDto): Promise<RepoResponseType<ListType<SelectPostInfoListItemType>> | null> {
    return this.postRepository.getPostListByTagNo(tagNo, searchData);
  }

  /**
   * @description 카테고리 번호로 게시글 목록 조회
   * @param ctgryNo 카테고리 번호
   * @param searchData 검색 조건
   */
  async getPostListByCtgryNo(ctgryNo: number, searchData: SearchPostDto): Promise<RepoResponseType<ListType<SelectPostInfoListItemType>> | null> {
    return this.postRepository.getPostListByCtgryNo(ctgryNo, searchData);
  }

  /**
   * @description 날짜로 게시글 목록 조회
   * @param date 날짜(yyyyMM)
   * @param searchData 검색 조건
   */
  async getPostListFromArchive(date: string, searchData: SearchPostDto): Promise<RepoResponseType<ListType<SelectPostInfoListItemType>> | null> {
    return this.postRepository.getPostListFromArchive(date, searchData);
  }

  /**
   * @description 고급 검색을 통한 게시글 목록 조회
   * @param searchData 고급 검색 조건
   */
  async getAdvancedPostList(searchData: SearchPostDto): Promise<RepoResponseType<ListType<SelectPostInfoListItemType>> | null> {
    return this.postRepository.getAdvancedPostList(searchData);
  }

  /**
   * @description 게시글 조회 로그 기록
   * @param pstNo 게시글 번호
   * @param ip 사용자 IP
   */
  async createPostViewLog(pstNo: number, ip: string): Promise<RepoResponseType<SelectPostViewLogType> | null> {
    return this.postRepository.createPostViewLog(pstNo, ip);
  }

  /**
   * @description 게시글 공유 로그 기록
   * @param createData 공유 로그 생성 데이터
   */
  async createPostShareLog(createData: CreatePostShareLogDto): Promise<RepoResponseType<SelectPostShareLogType> | null> {
    return this.postRepository.createPostShareLog(createData);
  }

  /**
   * @description 게시글 북마크 생성
   * @param createData 북마크 생성 데이터
   */
  async createPostBookmark(createData: CreatePostBookmarkDto): Promise<RepoResponseType<SelectPostBookmarkType> | null> {
    return this.postRepository.createPostBookmark(createData);
  }

  /**
   * @description 게시글 북마크 삭제
   * @param deleteData 북마크 삭제 데이터
   */
  async deletePostBookmark(deleteData: DeletePostBookmarkDto): Promise<RepoResponseType<boolean> | null> {
    return this.postRepository.deletePostBookmark(deleteData);
  }

  /**
   * @description 북마크한 게시글 목록 조회
   * @param userNo 사용자 번호
   * @param searchData 검색 데이터
   */
  async getBookmarkedPostListByUserNo(
    userNo: number,
    searchData: SearchPostBookmarkDto
  ): Promise<RepoResponseType<ListType<SelectPostBookmarkListItemType>> | null> {
    return this.postRepository.getBookmarkedPostListByUserNo(userNo, searchData);
  }
}
