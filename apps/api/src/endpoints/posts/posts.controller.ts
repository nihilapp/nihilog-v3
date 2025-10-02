import { Body, Controller, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Endpoint } from '@/decorators/endpoint.decorator';
import { type ListDto, type PostDto, type ResponseDto, SearchPostDto } from '@/dto';
import { PostsService } from '@/endpoints/posts/posts.service';
import { createError, createResponse } from '@/utils';
import { createExamplePost } from '@/utils/createExamplePost';

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
    summary: '게시글 목록 조회',
    description: '게시글 목록을 조회합니다.',
    options: {
      body: [ '검색 조건 DTO', SearchPostDto, ],
      responses: [
        [
          '게시글 목록 조회 성공',
          [ false, 'SUCCESS', 'POST_SEARCH_SUCCESS', [
            createExamplePost('list'),
          ], ],
        ],
        [
          '게시글 목록 조회 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'POST_SEARCH_ERROR', null, ],
        ],
      ],
    },
  })
  async getPostList(@Body() searchData: SearchPostDto): Promise<ResponseDto<ListDto<PostDto>>> {
    const list = await this.postsService.getPostList(searchData);

    if (!list) {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'POST_SEARCH_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'POST_SEARCH_SUCCESS',
      list
    );
  }

  /**
   * @description 게시글 상세 조회
   * @param pstNo 게시글 번호
   */
  @Endpoint({
    endpoint: '/:pstNo',
    method: 'GET',
    summary: '게시글 상세 조회',
    description: '게시글을 상세 조회합니다.',
    options: {
      params: [
        [ 'pstNo', '게시글 번호', 'number', true, ],
      ],
      responses: [
        [
          '게시글 상세 조회 성공',
          [ false, 'SUCCESS', 'POST_GET_SUCCESS', createExamplePost('detail'), ],
        ],
        [
          '게시글 상세 조회 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'POST_GET_ERROR', null, ],
        ],
      ],
    },
  })
  async getPostByPstNo(@Param('pstNo') pstNo: number): Promise<ResponseDto<PostDto>> {
    const post = await this.postsService.getPostByPstNo(pstNo);

    if (!post) {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'POST_GET_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'POST_GET_SUCCESS',
      post
    );
  }

  /**
   * @description 게시글 상세 조회
   * @param pstCd 게시글 슬러그
   */
  @Endpoint({
    endpoint: '/slug/:pstCd',
    method: 'GET',
    summary: '게시글 상세 조회 (슬러그)',
    description: '게시글 슬러그로 상세 조회합니다.',
    options: {
      params: [
        [ 'pstCd', '게시글 슬러그', 'string', true, ],
      ],
      responses: [
        [
          '게시글 상세 조회 성공',
          [ false, 'SUCCESS', 'POST_GET_SUCCESS', createExamplePost('detail'), ],
        ],
        [
          '게시글 상세 조회 실패',
          [ true, 'NOT_FOUND', 'POST_GET_ERROR', null, ],
        ],
      ],
    },
  })
  async getPostByPstCd(@Param('pstCd') pstCd: string): Promise<ResponseDto<PostDto | null>> {
    const post = await this.postsService.getPostByPstCd(pstCd);

    if (!post) {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'POST_GET_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'POST_GET_SUCCESS',
      post
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
    summary: '태그별 게시글 목록 조회',
    description: '태그별 게시글 목록을 조회합니다.',
    options: {
      params: [
        [ 'tagNo', '태그 번호', 'number', true, ],
      ],
      body: [ '검색 조건 DTO', SearchPostDto, ],
      responses: [
        [
          '태그별 게시글 목록 조회 성공',
          [ false, 'SUCCESS', 'POST_SEARCH_SUCCESS', [ createExamplePost('list'), ], ],
        ],
        [
          '태그별 게시글 목록 조회 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'POST_SEARCH_ERROR', null, ],
        ],
      ],
    },
  })
  async getPostListByTagNo(
    @Param('tagNo') tagNo: number,
    @Body() searchData: SearchPostDto
  ): Promise<ResponseDto<ListDto<PostDto>>> {
    const list = await this.postsService.getPostListByTagNo(tagNo, searchData);

    if (!list) {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'POST_SEARCH_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'POST_SEARCH_SUCCESS',
      list
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
    summary: '카테고리별 게시글 목록 조회',
    description: '카테고리별 게시글 목록을 조회합니다.',
    options: {
      params: [
        [ 'ctgryNo', '카테고리 번호', 'number', true, ],
      ],
      body: [ '검색 조건 DTO', SearchPostDto, ],
      responses: [
        [
          '카테고리별 게시글 목록 조회 성공',
          [ false, 'SUCCESS', 'POST_SEARCH_SUCCESS', [ createExamplePost('list'), ], ],
        ],
        [
          '카테고리별 게시글 목록 조회 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'POST_SEARCH_ERROR', null, ],
        ],
      ],
    },
  })
  async getPostListByCtgryNo(
    @Param('ctgryNo') ctgryNo: number,
    @Body() searchData: SearchPostDto
  ): Promise<ResponseDto<ListDto<PostDto>>> {
    const list = await this.postsService.getPostListByCtgryNo(ctgryNo, searchData);

    if (!list) {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'POST_SEARCH_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'POST_SEARCH_SUCCESS',
      list
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
    summary: '년월별 게시글 목록 조회',
    description: '년월별 게시글 목록을 조회합니다.',
    options: {
      params: [
        [ 'date', '날짜(yyyyMM)', 'string', true, ],
      ],
      body: [ '검색 조건 DTO', SearchPostDto, ],
      responses: [
        [
          '년월별 게시글 목록 조회 성공',
          [ false, 'SUCCESS', 'POST_SEARCH_SUCCESS', [ createExamplePost('list'), ], ],
        ],
        [
          '년월별 게시글 목록 조회 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'POST_SEARCH_ERROR', null, ],
        ],
      ],
    },
  })
  async getPostListFromArchive(
    @Param('date') date: string,
    @Body() searchData: SearchPostDto
  ): Promise<ResponseDto<ListDto<PostDto>>> {
    const list = await this.postsService.getPostListFromArchive(date, searchData);

    if (!list) {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'POST_SEARCH_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'POST_SEARCH_SUCCESS',
      list
    );
  }

  /**
   * @description 고급 검색을 통한 게시글 목록 조회
   * @param searchData 고급 검색 조건 DTO
   */
  @Endpoint({
    endpoint: '/advanced-search',
    method: 'POST',
    summary: '고급 검색을 통한 게시글 목록 조회',
    description: '복합 조건(태그, 카테고리, 날짜 범위, 조회수 등)을 통한 게시글 목록을 조회합니다.',
    options: {
      body: [ '고급 검색 조건 DTO', SearchPostDto, ],
      responses: [
        [
          '고급 검색 성공',
          [ false, 'SUCCESS', 'POST_SEARCH_SUCCESS', [
            createExamplePost('list'),
          ], ],
        ],
        [
          '고급 검색 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'POST_SEARCH_ERROR', null, ],
        ],
      ],
    },
  })
  async getAdvancedPostList(@Body() searchData: SearchPostDto): Promise<ResponseDto<ListDto<PostDto>>> {
    const list = await this.postsService.getAdvancedPostList(searchData);

    if (!list) {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'POST_SEARCH_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'POST_SEARCH_SUCCESS',
      list
    );
  }
}
