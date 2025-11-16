import { Body, Controller, Param, ParseIntPipe, Query, Req, UseGuards } from '@nestjs/common';

import { MESSAGE } from '@nihilog/code';
import { Endpoint } from '@/decorators/endpoint.decorator';
import type { AuthRequest, CreateTagDto, ResponseDto, UpdateTagDto } from '@/dto';
import type { AnalyzeStatDto } from '@/dto/common.dto';
import type { CreatePstTagMpngDto, DeletePstTagMpngDto, DeleteTagDto, SearchPstTagMpngDto } from '@/dto/tag.dto';
import { AdminTagsService } from '@/endpoints/admin/tags/admin-tags.service';
import { AdminAuthGuard } from '@/endpoints/auth/admin-auth.guard';
import type { ListType, MultipleResultType } from '@nihilog/schemas';
import type {
  SelectPstTagMpngListItemType,
  SelectPstTagMpngType,
  SelectTagInfoType,
  AnalyzeTagStatItemType,
  TopUsedTagItemType,
  TagUsageTrendItemType,
  UnusedTagItemType,
  TopTagsBySubscriberItemType,
  TagSubscriberGrowthRateItemType,
  TagWithoutSubscribersItemType,
  TagUsageEfficiencyItemType,
  TagAverageUsageFrequencyItemType,
  TagLifecycleItemType,
  TagStatusDistributionItemType,
  TagCreatorStatItemType,
  TagCleanupRecommendationItemType
} from '@nihilog/schemas';
import { createError, createResponse } from '@/utils';

@Controller('admin/tags')
@UseGuards(AdminAuthGuard)
export class AdminTagsController {
  constructor(private readonly adminTagsService: AdminTagsService) { }

  // ========================================================
  // 태그 통계 관련 엔드포인트
  // ========================================================

  /**
   * @description 태그 분석 통계 (시간대별 합산) - 9개 지표 통합
   * @param req 요청 객체
   * @param analyzeStatData 분석 통계 데이터
   * @param tagNo 태그 번호 (선택적)
   */
  @Endpoint({
    endpoint: '/analyze/overview',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetAnalyzeTagData(
    @Req() req: AuthRequest,
    @Query() analyzeStatData: AnalyzeStatDto,
    @Query('tagNo') tagNo?: number
  ): Promise<ResponseDto<AnalyzeTagStatItemType[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminGetAnalyzeTagData(
      analyzeStatData,
      tagNo
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.TAG.ADMIN.ANALYZE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.TAG.ADMIN.ANALYZE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 태그별 사용 횟수 TOP N
   * @param req 요청 객체
   * @param analyzeStatData 분석 통계 데이터
   */
  @Endpoint({
    endpoint: '/analyze/top-used',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetTopUsedTagsByCount(
    @Req() req: AuthRequest,
    @Query() analyzeStatData: AnalyzeStatDto
  ): Promise<ResponseDto<TopUsedTagItemType[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminGetTopUsedTagsByCount(analyzeStatData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.TAG.ADMIN.TOP_USED_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.TAG.ADMIN.TOP_USED_SUCCESS,
      result.data
    );
  }

  /**
   * @description 태그별 사용 추이
   * @param req 요청 객체
   * @param analyzeStatData 분석 통계 데이터
   */
  @Endpoint({
    endpoint: '/analyze/usage-trend',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetTagUsageTrend(
    @Req() req: AuthRequest,
    @Query() analyzeStatData: AnalyzeStatDto
  ): Promise<ResponseDto<TagUsageTrendItemType[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminGetTagUsageTrend(analyzeStatData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.TAG.ADMIN.USAGE_TREND_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.TAG.ADMIN.USAGE_TREND_SUCCESS,
      result.data
    );
  }

  /**
   * @description 미사용 태그 목록
   * @param req 요청 객체
   */
  @Endpoint({
    endpoint: '/analyze/unused',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetUnusedTagsList(@Req() req: AuthRequest): Promise<ResponseDto<UnusedTagItemType[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminGetUnusedTagsList();

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.TAG.ADMIN.UNUSED_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.TAG.ADMIN.UNUSED_SUCCESS,
      result.data
    );
  }

  /**
   * @description 태그별 구독자 수 TOP N
   * @param req 요청 객체
   * @param limit 상위 N개
   */
  @Endpoint({
    endpoint: '/analyze/top-subscribers',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetTopTagsBySubscriberCount(
    @Req() req: AuthRequest,
    @Query('limit') limit: number
  ): Promise<ResponseDto<TopTagsBySubscriberItemType[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminGetTopTagsBySubscriberCount(limit);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.TAG.ADMIN.TOP_SUBSCRIBERS_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.TAG.ADMIN.TOP_SUBSCRIBERS_SUCCESS,
      result.data
    );
  }

  /**
   * @description 태그별 구독자 성장률
   * @param req 요청 객체
   * @param analyzeStatData 분석 통계 데이터
   */
  @Endpoint({
    endpoint: '/analyze/subscriber-growth',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetTagSubscriberGrowthRate(
    @Req() req: AuthRequest,
    @Query() analyzeStatData: AnalyzeStatDto
  ): Promise<ResponseDto<TagSubscriberGrowthRateItemType[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminGetTagSubscriberGrowthRate(analyzeStatData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.TAG.ADMIN.SUBSCRIBER_GROWTH_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.TAG.ADMIN.SUBSCRIBER_GROWTH_SUCCESS,
      result.data
    );
  }

  /**
   * @description 구독자 없는 태그 목록
   * @param req 요청 객체
   */
  @Endpoint({
    endpoint: '/analyze/no-subscribers',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetTagsWithoutSubscribers(@Req() req: AuthRequest): Promise<ResponseDto<TagWithoutSubscribersItemType[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminGetTagsWithoutSubscribers();

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.TAG.ADMIN.NO_SUBSCRIBERS_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.TAG.ADMIN.NO_SUBSCRIBERS_SUCCESS,
      result.data
    );
  }

  /**
   * @description 태그별 사용 효율성
   * @param req 요청 객체
   */
  @Endpoint({
    endpoint: '/analyze/efficiency',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetTagUsageEfficiency(@Req() req: AuthRequest): Promise<ResponseDto<TagUsageEfficiencyItemType[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminGetTagUsageEfficiency();

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.TAG.ADMIN.EFFICIENCY_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.TAG.ADMIN.EFFICIENCY_SUCCESS,
      result.data
    );
  }

  /**
   * @description 태그별 평균 사용 빈도
   * @param req 요청 객체
   * @param analyzeStatData 분석 통계 데이터
   */
  @Endpoint({
    endpoint: '/analyze/frequency',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetTagAverageUsageFrequency(
    @Req() req: AuthRequest,
    @Query() analyzeStatData: AnalyzeStatDto
  ): Promise<ResponseDto<TagAverageUsageFrequencyItemType[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminGetTagAverageUsageFrequency(analyzeStatData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.TAG.ADMIN.FREQUENCY_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.TAG.ADMIN.FREQUENCY_SUCCESS,
      result.data
    );
  }

  /**
   * @description 태그 생명주기 분석
   * @param req 요청 객체
   */
  @Endpoint({
    endpoint: '/analyze/lifecycle',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetTagLifecycleAnalysis(@Req() req: AuthRequest): Promise<ResponseDto<TagLifecycleItemType[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminGetTagLifecycleAnalysis();

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.TAG.ADMIN.LIFECYCLE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.TAG.ADMIN.LIFECYCLE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 태그 상태별 분포
   * @param req 요청 객체
   */
  @Endpoint({
    endpoint: '/analyze/status-distribution',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetTagStatusDistribution(@Req() req: AuthRequest): Promise<ResponseDto<TagStatusDistributionItemType[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminGetTagStatusDistribution();

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.TAG.ADMIN.STATUS_DISTRIBUTION_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.TAG.ADMIN.STATUS_DISTRIBUTION_SUCCESS,
      result.data
    );
  }

  /**
   * @description 태그 생성자별 통계
   * @param req 요청 객체
   */
  @Endpoint({
    endpoint: '/analyze/creator-stats',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetTagCreatorStatistics(@Req() req: AuthRequest): Promise<ResponseDto<TagCreatorStatItemType[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminGetTagCreatorStatistics();

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.TAG.ADMIN.CREATOR_STATS_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.TAG.ADMIN.CREATOR_STATS_SUCCESS,
      result.data
    );
  }

  /**
   * @description 태그 정리 필요도
   * @param req 요청 객체
   */
  @Endpoint({
    endpoint: '/analyze/cleanup',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetTagCleanupRecommendations(@Req() req: AuthRequest): Promise<ResponseDto<TagCleanupRecommendationItemType[]>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminGetTagCleanupRecommendations();

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.TAG.ADMIN.CLEANUP_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.TAG.ADMIN.CLEANUP_SUCCESS,
      result.data
    );
  }

  // ========================================================
  // 태그 관리 관련 엔드포인트
  // ========================================================

  /**
   * @description 태그 생성
   * @param userNo 사용자 번호
   * @param createData 태그 생성 데이터
   */
  @Endpoint({
    endpoint: '',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminCreateTag(
    @Req() req: AuthRequest,
    @Body() createData: CreateTagDto
  ): Promise<ResponseDto<SelectTagInfoType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminCreateTag(
      req.user.userNo,
      createData
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.TAG.ADMIN.CREATE_ERROR
      );
    }

    return createResponse(
      'CREATED',
      MESSAGE.TAG.ADMIN.CREATE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 다수 태그 생성
   * @param req 요청 객체
   * @param createData 다수 태그 생성 데이터
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminMultipleCreateTag(
    @Req() req: AuthRequest,
    @Body() createData: CreateTagDto[]
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminMultipleCreateTag(
      req.user.userNo,
      createData
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.TAG.ADMIN.MULTIPLE_CREATE_ERROR
      );
    }

    return createResponse(
      'CREATED',
      MESSAGE.TAG.ADMIN.MULTIPLE_CREATE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 태그 수정
   * @param req 요청 객체
   * @param tagNo 태그 번호
   * @param updateData 태그 수정 데이터
   */
  @Endpoint({
    endpoint: '/:tagNo',
    method: 'PATCH',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminUpdateTag(
    @Req() req: AuthRequest,
    @Param(
      'tagNo',
      ParseIntPipe
    ) tagNo: number,
    @Body() updateData: UpdateTagDto
  ): Promise<ResponseDto<SelectTagInfoType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminUpdateTag(
      req.user.userNo,
      tagNo,
      updateData
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.TAG.ADMIN.UPDATE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.TAG.ADMIN.UPDATE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 다수 태그 수정
   * @param req 요청 객체
   * @param updateData 다수 태그 수정 데이터
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'PATCH',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminMultipleUpdateTag(
    @Req() req: AuthRequest,
    @Body() updateData: UpdateTagDto
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminMultipleUpdateTag(
      req.user.userNo,
      updateData
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.TAG.ADMIN.MULTIPLE_UPDATE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.TAG.ADMIN.MULTIPLE_UPDATE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 태그 삭제
   * @param req 요청 객체
   * @param tagNo 태그 번호
   */
  @Endpoint({
    endpoint: '/:tagNo',
    method: 'DELETE',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminDeleteTag(
    @Req() req: AuthRequest,
    @Param(
      'tagNo',
      ParseIntPipe
    ) tagNo: number
  ): Promise<ResponseDto<boolean>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminDeleteTag(
      req.user.userNo,
      tagNo
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.TAG.ADMIN.DELETE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.TAG.ADMIN.DELETE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 다수 태그 삭제
   * @param req 요청 객체
   * @param deleteData 다수 태그 삭제 데이터
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'DELETE',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminMultipleDeleteTag(
    @Req() req: AuthRequest,
    @Body() deleteData: DeleteTagDto
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminMultipleDeleteTag(
      req.user.userNo,
      deleteData
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.TAG.ADMIN.MULTIPLE_DELETE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.TAG.ADMIN.MULTIPLE_DELETE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 태그 매핑 조회
   * @param req 요청 객체
   * @param searchData 검색 데이터
   */
  @Endpoint({
    endpoint: '/mapping/search',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetTagMapping(
    @Req() req: AuthRequest,
    @Query() searchData: SearchPstTagMpngDto
  ): Promise<ResponseDto<ListType<SelectPstTagMpngListItemType>>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminGetTagMapping(searchData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.TAG.ADMIN.MAPPING_SEARCH_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.TAG.ADMIN.MAPPING_SEARCH_SUCCESS,
      result.data
    );
  }

  /**
   * @description 태그 번호로 매핑 조회
   * @param req 요청 객체
   * @param tagNo 태그 번호
   * @param pstNo 포스트 번호
   */
  @Endpoint({
    endpoint: '/mapping/:pstNo/:tagNo',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetTagMappingByTagNo(
    @Req() req: AuthRequest,
    @Param(
      'pstNo',
      ParseIntPipe
    ) pstNo: number,
    @Param(
      'tagNo',
      ParseIntPipe
    ) tagNo: number
  ): Promise<ResponseDto<SelectPstTagMpngType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminGetTagMappingByTagNo(
      tagNo,
      pstNo
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.TAG.ADMIN.MAPPING_SEARCH_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.TAG.ADMIN.MAPPING_SEARCH_SUCCESS,
      result.data
    );
  }

  /**
   * @description 태그 매핑 추가
   * @param req 요청 객체
   * @param createData 태그 매핑 추가 데이터
   */
  @Endpoint({
    endpoint: '/mapping',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminAddTagMapping(
    @Req() req: AuthRequest,
    @Body() createData: CreatePstTagMpngDto
  ): Promise<ResponseDto<SelectPstTagMpngType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminAddTagMapping(
      req.user.userNo,
      createData
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.TAG.ADMIN.MAPPING_CREATE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.TAG.ADMIN.MAPPING_CREATE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 다수 태그 매핑 추가
   * @param req 요청 객체
   * @param createData 다수 태그 매핑 추가 데이터
   */
  @Endpoint({
    endpoint: '/mapping/multiple',
    method: 'POST',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminMultipleAddTagMapping(
    @Req() req: AuthRequest,
    @Body() createData: CreatePstTagMpngDto[]
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminMultipleAddTagMapping(
      req.user.userNo,
      createData
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.TAG.ADMIN.MAPPING_CREATE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.TAG.ADMIN.MAPPING_CREATE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 태그 매핑 삭제
   * @param req 요청 객체
   * @param deleteData 태그 매핑 삭제 데이터
   */
  @Endpoint({
    endpoint: '/mapping',
    method: 'DELETE',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminDeleteTagMapping(
    @Req() req: AuthRequest,
    @Body() deleteData: DeletePstTagMpngDto
  ): Promise<ResponseDto<boolean>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminDeleteTagMapping(
      req.user.userNo,
      deleteData
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.TAG.ADMIN.MAPPING_DELETE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.TAG.ADMIN.MAPPING_DELETE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 다수 태그 매핑 삭제
   * @param req 요청 객체
   * @param deleteData 다수 태그 매핑 삭제 데이터
   */
  @Endpoint({
    endpoint: '/mapping/multiple',
    method: 'DELETE',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminMultipleDeleteTagMapping(
    @Req() req: AuthRequest,
    @Body() deleteData: DeletePstTagMpngDto
  ): Promise<ResponseDto<MultipleResultType>> {
    if (req.errorResponse) {
      return req.errorResponse;
    }

    const result = await this.adminTagsService.adminMultipleDeleteTagMapping(
      req.user.userNo,
      deleteData
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.TAG.ADMIN.MAPPING_DELETE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.TAG.ADMIN.MAPPING_DELETE_SUCCESS,
      result.data
    );
  }
}
