import { Body, Controller, Param, ParseIntPipe, Query, Req } from '@nestjs/common';

import { MESSAGE } from '@nihilog/code';
import { Endpoint } from '@/decorators/endpoint.decorator';
import { type AuthRequest, CreatePostBookmarkDto, DeletePostBookmarkDto, type ResponseDto, SearchPostDto } from '@/dto';
import { CreatePostShareLogDto, CreatePostViewLogDto, SearchPostBookmarkDto } from '@/dto/post.dto';
import { PostsService } from '@/endpoints/posts/posts.service';
import type { ListType } from '@nihilog/schemas';
import type { SelectPostBookmarkListItemType, SelectPostBookmarkType, SelectPostListItemType, SelectPostType, SelectPostShareLogType, SelectPostViewLogType } from '@nihilog/schemas';
import { createError, createResponse } from '@/utils';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  /**
   * @description 포스트 목록 조회
   * @param searchData 검색 조건 DTO
   */
  @Endpoint({
    endpoint: '',
    method: 'GET',
  })
  async getPostList(@Query() searchData: SearchPostDto): Promise<ResponseDto<ListType<SelectPostListItemType>>> {
    const result = await this.postsService.getPostList(searchData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.POST.USER.SEARCH_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.POST.USER.SEARCH_SUCCESS,
      result.data
    );
  }

  /**
   * @description 포스트 상세 조회
   * @param pstNo 포스트 번호
   */
  @Endpoint({
    endpoint: '/:pstNo',
    method: 'GET',
  })
  async getPostByPstNo(@Param(
    'pstNo',
    ParseIntPipe
  ) pstNo: number): Promise<ResponseDto<SelectPostType>> {
    const result = await this.postsService.getPostByPstNo(pstNo);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.POST.USER.GET_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.POST.USER.GET_SUCCESS,
      result.data
    );
  }

  /**
   * @description 포스트 상세 조회
   * @param pstCd 포스트 슬러그
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
        result?.error?.message || MESSAGE.POST.USER.GET_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.POST.USER.GET_SUCCESS,
      result.data
    );
  }

  /**
   * @description 태그별 포스트 목록 조회
   * @param tagNo 태그 번호
   * @param searchData 검색 조건
   */
  @Endpoint({
    endpoint: '/tags/:tagNo',
    method: 'GET',
  })
  async getPostListByTagNo(
    @Param(
      'tagNo',
      ParseIntPipe
    ) tagNo: number,
    @Query() searchData: SearchPostDto
  ): Promise<ResponseDto<ListType<SelectPostListItemType>>> {
    const result = await this.postsService.getPostListByTagNo(
      tagNo,
      searchData
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.POST.USER.SEARCH_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.POST.USER.SEARCH_SUCCESS,
      result.data
    );
  }

  /**
   * @description 카테고리별 포스트 목록 조회
   * @param ctgryNo 카테고리 번호
   * @param searchData 검색 조건
   */
  @Endpoint({
    endpoint: '/categories/:ctgryNo',
    method: 'GET',
  })
  async getPostListByCtgryNo(
    @Param(
      'ctgryNo',
      ParseIntPipe
    ) ctgryNo: number,
    @Query() searchData: SearchPostDto
  ): Promise<ResponseDto<ListType<SelectPostListItemType>>> {
    const result = await this.postsService.getPostListByCtgryNo(
      ctgryNo,
      searchData
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.POST.USER.SEARCH_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.POST.USER.SEARCH_SUCCESS,
      result.data
    );
  }

  /**
   * @description 년월별 포스트 목록 조회
   * @param date 날짜(yyyyMM)
   * @param searchData 검색 조건
   */
  @Endpoint({
    endpoint: '/archive/:date',
    method: 'GET',
  })
  async getPostListFromArchive(
    @Param('date') date: string,
    @Query() searchData: SearchPostDto
  ): Promise<ResponseDto<ListType<SelectPostListItemType>>> {
    const result = await this.postsService.getPostListFromArchive(
      date,
      searchData
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.POST.USER.SEARCH_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.POST.USER.SEARCH_SUCCESS,
      result.data
    );
  }

  /**
   * @description 포스트 조회 로그 기록
   * @param createData 조회 로그 생성 데이터
   */
  @Endpoint({
    endpoint: '/view-logs',
    method: 'POST',
  })
  async createPostViewLog(@Body() createData: CreatePostViewLogDto): Promise<ResponseDto<SelectPostViewLogType>> {
    const result = await this.postsService.createPostViewLog(createData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.POST.USER.VIEW_LOG_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.POST.USER.VIEW_LOG_SUCCESS,
      result.data
    );
  }

  /**
   * @description 포스트 공유 로그 기록
   * @param createData 공유 로그 생성 데이터
   */
  @Endpoint({
    endpoint: '/share-logs',
    method: 'POST',
  })
  async createPostShareLog(@Body() createData: CreatePostShareLogDto): Promise<ResponseDto<SelectPostShareLogType>> {
    const result = await this.postsService.createPostShareLog(createData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.POST.USER.SHARE_LOG_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.POST.USER.SHARE_LOG_SUCCESS,
      result.data
    );
  }

  /**
   * @description 포스트 북마크 생성
   * @param createData 북마크 생성 데이터
   */
  @Endpoint({
    endpoint: '/bookmarks',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
    },
  })
  async createPostBookmark(@Body() createData: CreatePostBookmarkDto): Promise<ResponseDto<SelectPostBookmarkType>> {
    const result = await this.postsService.createPostBookmark(createData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.POST.BOOKMARK.CREATE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.POST.BOOKMARK.CREATE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 포스트 북마크 삭제
   * @param deleteData 북마크 삭제 데이터
   */
  @Endpoint({
    endpoint: '/bookmarks',
    method: 'DELETE',
    options: {
      authGuard: 'JWT-auth',
    },
  })
  async deletePostBookmark(@Body() deleteData: DeletePostBookmarkDto): Promise<ResponseDto<boolean>> {
    const result = await this.postsService.deletePostBookmark(deleteData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.POST.BOOKMARK.DELETE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.POST.BOOKMARK.DELETE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 북마크한 포스트 목록 조회
   * @param userNo 사용자 번호
   * @param searchData 검색 데이터
   */
  @Endpoint({
    endpoint: '/bookmarks',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
    },
  })
  async getBookmarkedPostListByUserNo(
    @Req() req: AuthRequest,
    @Query() searchData: SearchPostBookmarkDto
  ): Promise<ResponseDto<ListType<SelectPostBookmarkListItemType>>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.postsService
      .getBookmarkedPostListByUserNo(
        req.user.userNo,
        searchData
      );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.POST.BOOKMARK.SEARCH_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.POST.BOOKMARK.SEARCH_SUCCESS,
      result.data
    );
  }
}
