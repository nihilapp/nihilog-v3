import {
  Controller,
  Body,
  Param,
  ParseIntPipe,
  Query,
  Req,
  UseGuards
} from '@nestjs/common';
import type {
  SelectCategoryListItemType,
  SelectCategoryType,
  AnalyzeCategoryStatItemType,
  TopPopularCategoryItemType,
  TopCategoriesBySubscriberItemType,
  AverageBookmarkPerCategoryItemType,
  AverageViewPerCategoryItemType,
  CategoryHierarchyDistributionItemType,
  CategoryHierarchyPostDistributionItemType,
  CategoryHierarchySubscriberDistributionItemType,
  CategoryStatusDistributionItemType,
  CategoryCreatorStatItemType,
  UnusedCategoryItemType,
  CategorySubscriberGrowthRateItemType,
  CategoriesWithoutSubscribersItemType
} from '@nihilog/schemas';
import type { ListType, MultipleResultType } from '@nihilog/schemas';

import { MESSAGE } from '@nihilog/code';
import { Endpoint } from '@/decorators/endpoint.decorator';
import { AuthRequest, ResponseDto } from '@/dto';
import { CreateCategoryDto, DeleteCategoryDto, SearchCategoryDto, UpdateCategoryDto } from '@/dto/category.dto';
import { AnalyzeStatDto } from '@/dto/common.dto';
import type { AdminCategoriesService } from '@/endpoints/admin/categories/admin-categories.service';
import { AdminAuthGuard } from '@/endpoints/auth/admin-auth.guard';
import { createError, createResponse } from '@/utils';

@Controller('admin/categories')
@UseGuards(AdminAuthGuard)
export class AdminCategoriesController {
  constructor(private readonly adminCategoriesService: AdminCategoriesService) { }

  // ========================================================
  // 카테고리 통계 관련 엔드포인트
  // ========================================================

  /**
   * @description 카테고리 분석 통계
   * @param analyzeStatData 분석 통계 데이터
   * @param ctgryNo 카테고리 번호 (선택적, 쿼리 스트링)
   */
  @Endpoint({
    endpoint: '/analyze/overview',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetAnalyzeCategoryData(
    @Query() analyzeStatData: AnalyzeStatDto,
    @Query('ctgryNo') ctgryNo?: number
  ): Promise<ResponseDto<AnalyzeCategoryStatItemType[]>> {
    const result = await this.adminCategoriesService.adminGetAnalyzeCategoryData(
      analyzeStatData,
      ctgryNo
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.CATEGORY.ADMIN.ANALYZE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.CATEGORY.ADMIN.ANALYZE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 카테고리별 인기 지수 TOP N
   * @param analyzeStatData 분석 통계 데이터
   */
  @Endpoint({
    endpoint: '/analyze/popular-index',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetTopPopularCategoriesByIndex(@Query() analyzeStatData: AnalyzeStatDto): Promise<ResponseDto<TopPopularCategoryItemType[]>> {
    const result = await this.adminCategoriesService.adminGetTopPopularCategoriesByIndex(analyzeStatData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.CATEGORY.ADMIN.STATISTICS_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.CATEGORY.ADMIN.STATISTICS_SUCCESS,
      result.data
    );
  }

  /**
   * @description 구독자 많은 카테고리 TOP N
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
  async adminGetTopCategoriesBySubscriberCount(@Query('limit') limit: number): Promise<ResponseDto<TopCategoriesBySubscriberItemType[]>> {
    const result = await this.adminCategoriesService.adminGetTopCategoriesBySubscriberCount(limit || 10);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.CATEGORY.ADMIN.STATISTICS_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.CATEGORY.ADMIN.STATISTICS_SUCCESS,
      result.data
    );
  }

  /**
   * @description 평균 북마크 수 / 카테고리
   * @param analyzeStatData 분석 통계 데이터
   */
  @Endpoint({
    endpoint: '/analyze/average-bookmarks',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetAverageBookmarkCountPerCategory(@Query() analyzeStatData: AnalyzeStatDto): Promise<ResponseDto<AverageBookmarkPerCategoryItemType[]>> {
    const result = await this.adminCategoriesService.adminGetAverageBookmarkCountPerCategory(analyzeStatData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.CATEGORY.ADMIN.STATISTICS_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.CATEGORY.ADMIN.STATISTICS_SUCCESS,
      result.data
    );
  }

  /**
   * @description 카테고리별 평균 조회수
   * @param analyzeStatData 분석 통계 데이터
   */
  @Endpoint({
    endpoint: '/analyze/average-views',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetAverageViewCountPerCategory(@Query() analyzeStatData: AnalyzeStatDto): Promise<ResponseDto<AverageViewPerCategoryItemType[]>> {
    const result = await this.adminCategoriesService.adminGetAverageViewCountPerCategory(analyzeStatData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.CATEGORY.ADMIN.STATISTICS_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.CATEGORY.ADMIN.STATISTICS_SUCCESS,
      result.data
    );
  }

  /**
   * @description 계층별 카테고리 분포
   */
  @Endpoint({
    endpoint: '/analyze/hierarchy-distribution',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetCategoryHierarchyDistribution(): Promise<ResponseDto<CategoryHierarchyDistributionItemType[]>> {
    const result = await this.adminCategoriesService.adminGetCategoryHierarchyDistribution();

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.CATEGORY.ADMIN.STATISTICS_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.CATEGORY.ADMIN.STATISTICS_SUCCESS,
      result.data
    );
  }

  /**
   * @description 계층별 포스트 분포
   */
  @Endpoint({
    endpoint: '/analyze/hierarchy-posts',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetCategoryHierarchyPostDistribution(): Promise<ResponseDto<CategoryHierarchyPostDistributionItemType[]>> {
    const result = await this.adminCategoriesService.adminGetCategoryHierarchyPostDistribution();

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.CATEGORY.ADMIN.STATISTICS_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.CATEGORY.ADMIN.STATISTICS_SUCCESS,
      result.data
    );
  }

  /**
   * @description 계층별 구독자 분포
   */
  @Endpoint({
    endpoint: '/analyze/hierarchy-subscribers',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetCategoryHierarchySubscriberDistribution(): Promise<ResponseDto<CategoryHierarchySubscriberDistributionItemType[]>> {
    const result = await this.adminCategoriesService.adminGetCategoryHierarchySubscriberDistribution();

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.CATEGORY.ADMIN.STATISTICS_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.CATEGORY.ADMIN.STATISTICS_SUCCESS,
      result.data
    );
  }

  /**
   * @description 카테고리 상태별 분포
   */
  @Endpoint({
    endpoint: '/analyze/status-distribution',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetCategoryStatusDistribution(): Promise<ResponseDto<CategoryStatusDistributionItemType[]>> {
    const result = await this.adminCategoriesService.adminGetCategoryStatusDistribution();

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.CATEGORY.ADMIN.STATISTICS_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.CATEGORY.ADMIN.STATISTICS_SUCCESS,
      result.data
    );
  }

  /**
   * @description 카테고리 생성자별 통계
   */
  @Endpoint({
    endpoint: '/analyze/creator-stats',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetCategoryCreatorStatistics(): Promise<ResponseDto<CategoryCreatorStatItemType[]>> {
    const result = await this.adminCategoriesService.adminGetCategoryCreatorStatistics();

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.CATEGORY.ADMIN.STATISTICS_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.CATEGORY.ADMIN.STATISTICS_SUCCESS,
      result.data
    );
  }

  /**
   * @description 미사용 카테고리 목록
   */
  @Endpoint({
    endpoint: '/analyze/unused',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetUnusedCategoriesList(): Promise<ResponseDto<UnusedCategoryItemType[]>> {
    const result = await this.adminCategoriesService.adminGetUnusedCategoriesList();

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.CATEGORY.ADMIN.STATISTICS_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.CATEGORY.ADMIN.STATISTICS_SUCCESS,
      result.data
    );
  }

  /**
   * @description 카테고리별 구독자 성장률 (시계열)
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
  async adminGetCategorySubscriberGrowthRate(@Query() analyzeStatData: AnalyzeStatDto): Promise<ResponseDto<CategorySubscriberGrowthRateItemType[]>> {
    const result = await this.adminCategoriesService.adminGetCategorySubscriberGrowthRate(analyzeStatData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.CATEGORY.ADMIN.STATISTICS_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.CATEGORY.ADMIN.STATISTICS_SUCCESS,
      result.data
    );
  }

  /**
   * @description 구독자 없는 카테고리 목록
   */
  @Endpoint({
    endpoint: '/analyze/no-subscribers',
    method: 'GET',
    options: {
      authGuard: 'JWT-auth',
      roles: [ 'ADMIN', ],
    },
  })
  async adminGetCategoriesWithoutSubscribers(): Promise<ResponseDto<CategoriesWithoutSubscribersItemType[]>> {
    const result = await this.adminCategoriesService.adminGetCategoriesWithoutSubscribers();

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.CATEGORY.ADMIN.STATISTICS_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.CATEGORY.ADMIN.STATISTICS_SUCCESS,
      result.data
    );
  }

  // ========================================================
  // 카테고리 CRUD 엔드포인트
  // ========================================================

  /**
   * @description 카테고리 목록 조회
   * @param searchData 검색 데이터
   */
  @Endpoint({
    endpoint: '',
    method: 'GET',
  })
  async adminGetCategoryList(@Query() searchData: SearchCategoryDto): Promise<ResponseDto<ListType<SelectCategoryListItemType>>> {
    const result = await this.adminCategoriesService.adminGetCategoryList(searchData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.CATEGORY.ADMIN.SEARCH_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.CATEGORY.ADMIN.SEARCH_SUCCESS,
      result.data
    );
  }

  /**
   * @description 카테고리 번호로 카테고리 조회
   * @param ctgryNo 카테고리 번호
   */
  @Endpoint({
    endpoint: '/:ctgryNo',
    method: 'GET',
  })
  async adminGetCategoryByCtgryNo(@Param(
    'ctgryNo',
    ParseIntPipe
  ) ctgryNo: number): Promise<ResponseDto<SelectCategoryType>> {
    const result = await this.adminCategoriesService.adminGetCategoryByCtgryNo(ctgryNo);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.CATEGORY.ADMIN.GET_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.CATEGORY.ADMIN.GET_SUCCESS,
      result.data
    );
  }

  /**
   * @description 카테고리명으로 카테고리 조회
   * @param name 카테고리명
   */
  @Endpoint({
    endpoint: '/name/:name',
    method: 'GET',
  })
  async adminGetCategoryByCtgryNm(@Param('name') name: string): Promise<ResponseDto<SelectCategoryType>> {
    const result = await this.adminCategoriesService.adminGetCategoryByCtgryNm(name);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.CATEGORY.ADMIN.GET_BY_NAME_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.CATEGORY.ADMIN.GET_BY_NAME_SUCCESS,
      result.data
    );
  }

  /**
   * @description 카테고리 생성
   * @param req 요청 객체
   * @param createData 카테고리 생성 데이터
   */
  @Endpoint({
    endpoint: '',
    method: 'POST',
  })
  async adminCreateCategory(
    @Req() req: AuthRequest,
    @Body() createData: CreateCategoryDto
  ): Promise<ResponseDto<SelectCategoryType>> {
    const result = await this.adminCategoriesService.adminCreateCategory(
      req.user.userNo,
      createData
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.CATEGORY.ADMIN.CREATE_ERROR
      );
    }

    return createResponse(
      'CREATED',
      MESSAGE.CATEGORY.ADMIN.CREATE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 다수 카테고리 생성
   * @param req 요청 객체
   * @param createData 카테고리 생성 데이터
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'POST',
  })
  async adminMultipleCreateCategory(
    @Req() req: AuthRequest,
    @Body() createData: CreateCategoryDto[]
  ): Promise<ResponseDto<MultipleResultType>> {
    const result = await this.adminCategoriesService.adminMultipleCreateCategory(
      req.user.userNo,
      createData
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.CATEGORY.ADMIN.MULTIPLE_CREATE_ERROR
      );
    }

    return createResponse(
      'CREATED',
      MESSAGE.CATEGORY.ADMIN.MULTIPLE_CREATE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 카테고리 수정
   * @param req 요청 객체
   * @param ctgryNo 카테고리 번호
   * @param updateData 카테고리 수정 데이터
   */
  @Endpoint({
    endpoint: '/:ctgryNo',
    method: 'PATCH',
  })
  async adminUpdateCategory(
    @Req() req: AuthRequest,
    @Param(
      'ctgryNo',
      ParseIntPipe
    ) ctgryNo: number,
    @Body() updateData: UpdateCategoryDto
  ): Promise<ResponseDto<SelectCategoryType>> {
    const result = await this.adminCategoriesService.adminUpdateCategory(
      req.user.userNo,
      ctgryNo,
      updateData
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.CATEGORY.ADMIN.UPDATE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.CATEGORY.ADMIN.UPDATE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 다수 카테고리 수정
   * @param req 요청 객체
   * @param updateData 카테고리 수정 데이터
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'PATCH',
  })
  async adminMultipleUpdateCategory(
    @Req() req: AuthRequest,
    @Body() updateData: UpdateCategoryDto & { ctgryNoList: number[] }
  ): Promise<ResponseDto<MultipleResultType>> {
    const result = await this.adminCategoriesService.adminMultipleUpdateCategory(
      req.user.userNo,
      updateData
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.CATEGORY.ADMIN.MULTIPLE_UPDATE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.CATEGORY.ADMIN.MULTIPLE_UPDATE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 카테고리 삭제
   * @param req 요청 객체
   * @param ctgryNo 카테고리 번호
   */
  @Endpoint({
    endpoint: '/:ctgryNo',
    method: 'DELETE',
  })
  async adminDeleteCategory(
    @Req() req: AuthRequest,
    @Param(
      'ctgryNo',
      ParseIntPipe
    ) ctgryNo: number
  ): Promise<ResponseDto<boolean>> {
    const result = await this.adminCategoriesService.adminDeleteCategory(
      req.user.userNo,
      ctgryNo
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.CATEGORY.ADMIN.DELETE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.CATEGORY.ADMIN.DELETE_SUCCESS,
      result.data
    );
  }

  /**
   * @description 다수 카테고리 삭제
   * @param req 요청 객체
   * @param deleteData 카테고리 삭제 데이터
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'DELETE',
  })
  async adminMultipleDeleteCategory(
    @Req() req: AuthRequest,
    @Body() deleteData: DeleteCategoryDto
  ): Promise<ResponseDto<MultipleResultType>> {
    const result = await this.adminCategoriesService.adminMultipleDeleteCategory(
      req.user.userNo,
      deleteData
    );

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.CATEGORY.ADMIN.MULTIPLE_DELETE_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.CATEGORY.ADMIN.MULTIPLE_DELETE_SUCCESS,
      result.data
    );
  }
}
