import { Injectable } from '@nestjs/common';

import type { SearchPostDto } from '@/dto';
import { PostRepository } from '@/endpoints/repositories/post.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostRepository) {}

  /**
   * @description 게시글 목록 조회
   * @param searchData 검색 조건
   */
  async getPostList(searchData: SearchPostDto) {
    return this.postRepository.getPostList(searchData);
  }

  /**
   * @description 게시글 상세 조회
   * @param pstNo 게시글 번호
   */
  async getPostByPstNo(pstNo: number) {
    return this.postRepository.getPostByPstNo(pstNo);
  }

  /**
   * @description 게시글 상세 조회
   * @param pstCd 게시글 슬러그
   */
  async getPostByPstCd(pstCd: string) {
    return this.postRepository.getPostByPstCd(pstCd);
  }

  /**
   * @description 태그 번호로 게시글 목록 조회
   * @param tagNo 태그 번호
   * @param searchData 검색 조건
   */
  async getPostListByTagNo(tagNo: number, searchData: SearchPostDto) {
    return this.postRepository.getPostListByTagNo(tagNo, searchData);
  }

  /**
   * @description 카테고리 번호로 게시글 목록 조회
   * @param ctgryNo 카테고리 번호
   * @param searchData 검색 조건
   */
  async getPostListByCtgryNo(ctgryNo: number, searchData: SearchPostDto) {
    return this.postRepository.getPostListByCtgryNo(ctgryNo, searchData);
  }

  /**
   * @description 날짜로 게시글 목록 조회
   * @param date 날짜(yyyyMM)
   * @param searchData 검색 조건
   */
  async getPostListFromArchive(date: string, searchData: SearchPostDto) {
    return this.postRepository.getPostListFromArchive(date, searchData);
  }

  /**
   * @description 고급 검색을 통한 게시글 목록 조회
   * @param searchData 고급 검색 조건
   */
  async getAdvancedPostList(searchData: SearchPostDto) {
    return this.postRepository.getAdvancedPostList(searchData);
  }
}
