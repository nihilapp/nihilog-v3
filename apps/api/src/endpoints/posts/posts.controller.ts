import { Body, Controller, Ip, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Endpoint } from '@/decorators/endpoint.decorator';
import { type AuthRequest, CreatePostBookmarkDto, DeletePostBookmarkDto, type ResponseDto, SearchPostDto } from '@/dto';
import { CreatePostShareLogDto } from '@/dto/post-sharelog.dto';
import { SearchPostBookmarkDto } from '@/dto/post.dto';
import { PostsService } from '@/endpoints/posts/posts.service';
import type { ListType } from '@/endpoints/prisma/types/common.types';
import type { SelectPostBookmarkListItemType, SelectPostBookmarkType, SelectPostListItemType, SelectPostType, SelectPostShareLogType, SelectPostViewLogType } from '@/endpoints/prisma/types/post.types';
import { createError, createResponse } from '@/utils';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  /**
   * @description 게시글 목록 조회
   * @param searchData 검색 조건 DTO
   */
  @Endpoint({
    endpoint: '/search',
    method: 'POST',
  })
  async getPostList(@Body() searchData: SearchPostDto): Promise<ResponseDto<ListType<SelectPostListItemType>>> {
    const result = await this.postsService.getPostList(searchData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'POST_SEARCH_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'POST_SEARCH_SUCCESS',
      result.data
    );
  }

  /**
   * @description 게시글 상세 조회
   * @param pstNo 게시글 번호
   */
  @Endpoint({
    endpoint: '/:pstNo',
    method: 'GET',
  })
  async getPostByPstNo(@Param('pstNo') pstNo: number): Promise<ResponseDto<SelectPostType>> {
    const result = await this.postsService.getPostByPstNo(pstNo);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'POST_GET_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'POST_GET_SUCCESS',
      result.data
    );
  }

  /**
   * @description 게시글 상세 조회
   * @param pstCd 게시글 슬러그
   */
  @Endpoint({
    endpoint: '/slug/:pstCd',
    method: 'GET',
  })
  async getPostByPstCd(@Param('pstCd') pstCd: string): Promise<ResponseDto<SelectPostType>> {
    const result = await this.postsService.getPostByPstCd(pstCd);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'POST_GET_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'POST_GET_SUCCESS',
      result.data
    );
  }

  /**
   * @description 태그별 게시글 목록 조회
   * @param tagNo 태그 번호
   * @param searchData 검색 조건
   */
  @Endpoint({
    endpoint: '/tag/:tagNo',
    method: 'POST',
  })
  async getPostListByTagNo(
    @Param('tagNo') tagNo: number,
    @Body() searchData: SearchPostDto
  ): Promise<ResponseDto<ListType<SelectPostListItemType>>> {
    const result = await this.postsService.getPostListByTagNo(tagNo, searchData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'POST_SEARCH_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'POST_SEARCH_SUCCESS',
      result.data
    );
  }

  /**
   * @description 카테고리별 게시글 목록 조회
   * @param ctgryNo 카테고리 번호
   * @param searchData 검색 조건
   */
  @Endpoint({
    endpoint: '/category/:ctgryNo',
    method: 'POST',
  })
  async getPostListByCtgryNo(
    @Param('ctgryNo') ctgryNo: number,
    @Body() searchData: SearchPostDto
  ): Promise<ResponseDto<ListType<SelectPostListItemType>>> {
    const result = await this.postsService.getPostListByCtgryNo(ctgryNo, searchData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'POST_SEARCH_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'POST_SEARCH_SUCCESS',
      result.data
    );
  }

  /**
   * @description 년월별 게시글 목록 조회
   * @param date 날짜(yyyyMM)
   * @param searchData 검색 조건
   */
  @Endpoint({
    endpoint: '/archive/:date',
    method: 'POST',
  })
  async getPostListFromArchive(
    @Param('date') date: string,
    @Body() searchData: SearchPostDto
  ): Promise<ResponseDto<ListType<SelectPostListItemType>>> {
    const result = await this.postsService.getPostListFromArchive(date, searchData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'POST_SEARCH_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'POST_SEARCH_SUCCESS',
      result.data
    );
  }

  /**
   * @description 고급 검색을 통한 게시글 목록 조회
   * @param searchData 고급 검색 조건 DTO
   */
  @Endpoint({
    endpoint: '/advanced-search',
    method: 'POST',
  })
  async getAdvancedPostList(@Body() searchData: SearchPostDto): Promise<ResponseDto<ListType<SelectPostListItemType>>> {
    const result = await this.postsService.getAdvancedPostList(searchData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'POST_SEARCH_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'POST_SEARCH_SUCCESS',
      result.data
    );
  }

  /**
   * @description 게시글 조회 로그 기록
   * @param pstNo 게시글 번호
   * @param ip 사용자 IP
   */
  @Endpoint({
    endpoint: '/:pstNo/view',
    method: 'POST',
  })
  async createPostViewLog(
    @Param('pstNo') pstNo: number,
    @Ip() ip: string
  ): Promise<ResponseDto<SelectPostViewLogType>> {
    const result = await this.postsService.createPostViewLog(pstNo, ip);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'POST_VIEW_LOG_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'POST_VIEW_LOG_SUCCESS',
      result.data
    );
  }

  /**
   * @description 게시글 공유 로그 기록
   * @param createData 공유 로그 생성 데이터
   */
  @Endpoint({
    endpoint: '/:pstNo/share',
    method: 'POST',
  })
  async createPostShareLog(@Body() createData: CreatePostShareLogDto): Promise<ResponseDto<SelectPostShareLogType>> {
    const result = await this.postsService.createPostShareLog(createData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'POST_SHARE_LOG_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'POST_SHARE_LOG_SUCCESS',
      result.data
    );
  }

  /**
   * @description 게시글 북마크 생성
   * @param pstNo 게시글 번호
   * @param createData 북마크 생성 데이터
   */
  @Endpoint({
    endpoint: '/:pstNo/bookmark',
    method: 'POST',
  })
  async createPostBookmark(
    @Param('pstNo') pstNo: number,
    @Body() createData: CreatePostBookmarkDto
  ): Promise<ResponseDto<SelectPostBookmarkType>> {
    const result = await this.postsService.createPostBookmark(createData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'POST_BOOKMARK_CREATE_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'POST_BOOKMARK_CREATE_SUCCESS',
      result.data
    );
  }

  /**
   * @description 게시글 북마크 삭제
   * @param pstNo 게시글 번호
   * @param deleteData 북마크 삭제 데이터
   */
  @Endpoint({
    endpoint: '/:pstNo/bookmark',
    method: 'DELETE',
  })
  async deletePostBookmark(
    @Param('pstNo') pstNo: number,
    @Body() deleteData: DeletePostBookmarkDto
  ): Promise<ResponseDto<boolean>> {
    const result = await this.postsService.deletePostBookmark(deleteData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'POST_BOOKMARK_DELETE_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'POST_BOOKMARK_DELETE_SUCCESS',
      result.data
    );
  }

  /**
   * @description 북마크한 게시글 목록 조회
   * @param userNo 사용자 번호
   * @param searchData 검색 데이터
   */
  @Endpoint({
    endpoint: '/bookmarked',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
    },
  })
  async getBookmarkedPostListByUserNo(
    @Req() req: AuthRequest,
    @Body() searchData: SearchPostBookmarkDto
  ): Promise<ResponseDto<ListType<SelectPostBookmarkListItemType>>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.postsService
      .getBookmarkedPostListByUserNo(req.user.userNo, searchData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'POST_BOOKMARK_SEARCH_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'POST_BOOKMARK_SEARCH_SUCCESS',
      result.data
    );
  }
}
