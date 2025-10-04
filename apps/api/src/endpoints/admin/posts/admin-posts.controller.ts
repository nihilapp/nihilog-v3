import { Body, Controller, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Endpoint } from '@/decorators/endpoint.decorator';
import type { ResponseDto } from '@/dto';
import { ViewStatDto } from '@/dto/post.dto';
import { AdminPostsService } from '@/endpoints/admin/posts/admin-posts.service';
import { AdminAuthGuard } from '@/endpoints/auth/admin-auth.guard';
import type { SharePlatformStatItemType, ViewStatItemType } from '@/endpoints/prisma/types/post.types';
import { createError, createResponse } from '@/utils';

@ApiTags('admin/posts')
@Controller('admin/posts')
@UseGuards(AdminAuthGuard)
export class AdminPostsController {
  constructor(private readonly postsService: AdminPostsService) {}

  /**
   * @description 관리자 - 게시글 조회수 통계 조회
   * @param pstNo 게시글 번호
   * @param viewStatData 조회수 통계 데이터
   */
  @Endpoint({
    endpoint: '/:pstNo/views',
    method: 'POST',
    summary: '[관리자] 게시글 조회수 통계 조회',
    description: '관리자가 게시글 조회수 통계를 조회합니다.',
    options: {
      params: [
        [ 'pstNo', '게시글 번호', 'number', true, ],
      ],
      body: [ '조회수 통계 데이터', ViewStatDto, ],
      responses: [
        [
          '게시글 조회수 통계 조회 성공',
          [ false, 'SUCCESS', 'POST_VIEW_STATS_SUCCESS', [
            { date: '2024-01-01', count: 100, },
          ], ],
        ],
        [
          '게시글 조회수 통계 조회 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'POST_VIEW_STATS_ERROR', null, ],
        ],
      ],
    },
  })
  async adminGetPostViewStats(
    @Param('pstNo') pstNo: number,
    @Body() viewStatData: ViewStatDto
  ): Promise<ResponseDto<ViewStatItemType[]>> {
    const stats = await this.postsService.getPostViewStats(pstNo, viewStatData);

    if (!stats) {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'POST_VIEW_STATS_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'POST_VIEW_STATS_SUCCESS',
      stats
    );
  }

  /**
   * @description 관리자 - 게시글 공유 통계 조회
   * @param pstNo 게시글 번호
   * @param viewStatData 공유 통계 데이터
   */
  @Endpoint({
    endpoint: '/:pstNo/shares',
    method: 'POST',
    summary: '[관리자] 게시글 공유 통계 조회',
    description: '관리자가 게시글 공유 통계를 조회합니다.',
    options: {
      params: [
        [ 'pstNo', '게시글 번호', 'number', true, ],
      ],
      body: [ '공유 통계 데이터', ViewStatDto, ],
      responses: [
        [
          '게시글 공유 통계 조회 성공',
          [ false, 'SUCCESS', 'POST_SHARE_STATS_SUCCESS', [
            { platform: 'facebook', count: 100, },
          ], ],
        ],
        [
          '게시글 공유 통계 조회 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'POST_SHARE_STATS_ERROR', null, ],
        ],
      ],
    },
  })
  async adminGetPostShareStatsByPlatform(
    @Param('pstNo') pstNo: number,
    @Body() viewStatData: ViewStatDto
  ): Promise<ResponseDto<SharePlatformStatItemType[]>> {
    const stats = await this.postsService.getPostShareStatsByPlatform(pstNo, viewStatData);

    if (!stats) {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'POST_SHARE_STATS_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'POST_SHARE_STATS_SUCCESS',
      stats
    );
  }

  /**
   * @description 관리자 - 전체 게시글 공유 통계 조회
   * @param viewStatData 공유 통계 데이터
   */
  @Endpoint({
    endpoint: '/shares',
    method: 'POST',
    summary: '[관리자] 전체 게시글 공유 통계 조회',
    description: '관리자가 전체 게시글 공유 통계를 조회합니다.',
    options: {
      body: [ '공유 통계 데이터', ViewStatDto, ],
      responses: [
        [
          '전체 게시글 공유 통계 조회 성공',
          [ false, 'SUCCESS', 'POST_SHARE_STATS_SUCCESS', [
            { platform: 'facebook', count: 100, },
          ], ],
        ],
        [
          '전체 게시글 공유 통계 조회 실패',
          [ true, 'INTERNAL_SERVER_ERROR', 'POST_SHARE_STATS_ERROR', null, ],
        ],
      ],
    },
  })
  async adminGetAllPostShareStatsByPlatform(@Body() viewStatData: ViewStatDto): Promise<ResponseDto<SharePlatformStatItemType[]>> {
    const stats = await this.postsService.getAllPostShareStatsByPlatform(viewStatData);

    if (!stats) {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'POST_SHARE_STATS_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'POST_SHARE_STATS_SUCCESS',
      stats
    );
  }
}
