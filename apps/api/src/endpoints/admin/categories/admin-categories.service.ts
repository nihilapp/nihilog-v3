import { Injectable } from '@nestjs/common';
import { MESSAGE } from '@nihilog/code';
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
import type { ListType, MultipleResultType, RepoResponseType } from '@nihilog/schemas';

import type { CreateCategoryDto, DeleteCategoryDto, SearchCategoryDto, UpdateCategoryDto } from '@/dto/category.dto';
import type { AnalyzeStatDto } from '@/dto/common.dto';
import { CategoryRepository } from '@/endpoints/repositories/category.repository';
import { prismaResponse } from '@/utils/prismaResponse';

@Injectable()
export class AdminCategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) { }

  // ========================================================
  // 카테고리 통계 관련 메서드
  // ========================================================

  /**
   * @description 카테고리 분석 통계 (시간대별 합산)
   * @param analyzeStatData 분석 통계 데이터
   * @param ctgryNo 카테고리 번호 (선택적)
   */
  async adminGetAnalyzeCategoryData(analyzeStatData: AnalyzeStatDto, ctgryNo?: number): Promise<RepoResponseType<AnalyzeCategoryStatItemType[]> | null> {
    return this.categoryRepository.getAnalyzeCategoryData(
      analyzeStatData,
      ctgryNo
    );
  }

  /**
   * @description 카테고리별 인기 지수 TOP N
   * @param analyzeStatData 분석 통계 데이터
   */
  async adminGetTopPopularCategoriesByIndex(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<TopPopularCategoryItemType[]> | null> {
    return this.categoryRepository.getTopPopularCategoriesByIndex(
      analyzeStatData.limit || 10,
      analyzeStatData
    );
  }

  /**
   * @description 구독자 많은 카테고리 TOP N
   * @param limit 상위 N개
   */
  async adminGetTopCategoriesBySubscriberCount(limit: number): Promise<RepoResponseType<TopCategoriesBySubscriberItemType[]> | null> {
    return this.categoryRepository.getTopCategoriesBySubscriberCount(limit);
  }

  /**
   * @description 평균 북마크 수 / 카테고리
   * @param analyzeStatData 분석 통계 데이터
   */
  async adminGetAverageBookmarkCountPerCategory(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<AverageBookmarkPerCategoryItemType[]> | null> {
    return this.categoryRepository.getAverageBookmarkCountPerCategory(analyzeStatData);
  }

  /**
   * @description 카테고리별 평균 조회수
   * @param analyzeStatData 분석 통계 데이터
   */
  async adminGetAverageViewCountPerCategory(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<AverageViewPerCategoryItemType[]> | null> {
    return this.categoryRepository.getAverageViewCountPerCategory(analyzeStatData);
  }

  /**
   * @description 계층별 카테고리 분포
   */
  async adminGetCategoryHierarchyDistribution(): Promise<RepoResponseType<CategoryHierarchyDistributionItemType[]> | null> {
    return this.categoryRepository.getCategoryHierarchyDistribution();
  }

  /**
   * @description 계층별 포스트 분포
   */
  async adminGetCategoryHierarchyPostDistribution(): Promise<RepoResponseType<CategoryHierarchyPostDistributionItemType[]> | null> {
    return this.categoryRepository.getCategoryHierarchyPostDistribution();
  }

  /**
   * @description 계층별 구독자 분포
   */
  async adminGetCategoryHierarchySubscriberDistribution(): Promise<RepoResponseType<CategoryHierarchySubscriberDistributionItemType[]> | null> {
    return this.categoryRepository.getCategoryHierarchySubscriberDistribution();
  }

  /**
   * @description 카테고리 상태별 분포
   */
  async adminGetCategoryStatusDistribution(): Promise<RepoResponseType<CategoryStatusDistributionItemType[]> | null> {
    return this.categoryRepository.getCategoryStatusDistribution();
  }

  /**
   * @description 카테고리 생성자별 통계
   */
  async adminGetCategoryCreatorStatistics(): Promise<RepoResponseType<CategoryCreatorStatItemType[]> | null> {
    return this.categoryRepository.getCategoryCreatorStatistics();
  }

  /**
   * @description 미사용 카테고리 목록
   */
  async adminGetUnusedCategoriesList(): Promise<RepoResponseType<UnusedCategoryItemType[]> | null> {
    return this.categoryRepository.getUnusedCategoriesList();
  }

  /**
   * @description 카테고리별 구독자 성장률 (시계열)
   * @param analyzeStatData 분석 통계 데이터
   */
  async adminGetCategorySubscriberGrowthRate(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<CategorySubscriberGrowthRateItemType[]> | null> {
    return this.categoryRepository.getCategorySubscriberGrowthRate(analyzeStatData);
  }

  /**
   * @description 구독자 없는 카테고리 목록
   */
  async adminGetCategoriesWithoutSubscribers(): Promise<RepoResponseType<CategoriesWithoutSubscribersItemType[]> | null> {
    return this.categoryRepository.getCategoriesWithoutSubscribers();
  }

  // ========================================================
  // 카테고리 CRUD 메서드
  // ========================================================

  /**
   * @description 카테고리 목록 조회
   * @param searchData 검색 데이터
   */
  async adminGetCategoryList(searchData: SearchCategoryDto): Promise<RepoResponseType<ListType<SelectCategoryListItemType>> | null> {
    return this.categoryRepository.getCategoryList(searchData);
  }

  /**
   * @description 카테고리 번호로 카테고리 조회
   * @param ctgryNo 카테고리 번호
   */
  async adminGetCategoryByCtgryNo(ctgryNo: number): Promise<RepoResponseType<SelectCategoryType> | null> {
    return this.categoryRepository.getCategoryByCtgryNo(ctgryNo);
  }

  /**
   * @description 카테고리명으로 카테고리 조회
   * @param ctgryNm 카테고리명
   */
  async adminGetCategoryByCtgryNm(ctgryNm: string): Promise<RepoResponseType<SelectCategoryType> | null> {
    return this.categoryRepository.getCategoryByCtgryNm(ctgryNm);
  }

  /**
   * @description 카테고리 생성
   * @param userNo 사용자 번호
   * @param createData 카테고리 생성 데이터
   */
  async adminCreateCategory(userNo: number, createData: CreateCategoryDto): Promise<RepoResponseType<SelectCategoryType> | null> {
    // 카테고리명 중복 확인
    if (createData.ctgryNm) {
      const existingCategory = await this.categoryRepository.getCategoryByCtgryNm(createData.ctgryNm);

      if (existingCategory?.success && existingCategory.data) {
        return prismaResponse(
          false,
          null,
          'CONFLICT',
          MESSAGE.CATEGORY.ADMIN.NAME_IN_USE
        );
      }
    }

    // 상위 카테고리 존재 확인 및 레벨 제한 검증
    if (createData.upCtgryNo) {
      const parentCategory = await this.categoryRepository.getCategoryByCtgryNo(createData.upCtgryNo);

      if (!parentCategory?.success || !parentCategory.data) {
        return prismaResponse(
          false,
          null,
          'NOT_FOUND',
          MESSAGE.CATEGORY.ADMIN.PARENT_NOT_FOUND
        );
      }

      // 상위 카테고리의 레벨이 3이면 자식 카테고리를 생성할 수 없음
      if (parentCategory.data.ctgryLvl >= 3) {
        return prismaResponse(
          false,
          null,
          'BAD_REQUEST',
          MESSAGE.CATEGORY.ADMIN.LEVEL_EXCEEDED
        );
      }
    }

    return this.categoryRepository.createCategory(
      userNo,
      createData
    );
  }

  /**
   * @description 다수 카테고리 생성
   * @param userNo 사용자 번호
   * @param createData 카테고리 생성 데이터
   */
  async adminMultipleCreateCategory(userNo: number, createData: CreateCategoryDto[]): Promise<RepoResponseType<MultipleResultType> | null> {
    return this.categoryRepository.multipleCreateCategory(
      userNo,
      createData
    );
  }

  /**
   * @description 카테고리 수정
   * @param userNo 사용자 번호
   * @param ctgryNo 카테고리 번호
   * @param updateData 카테고리 수정 데이터
   */
  async adminUpdateCategory(userNo: number, ctgryNo: number, updateData: UpdateCategoryDto): Promise<RepoResponseType<SelectCategoryType> | null> {
    // 카테고리 존재 확인
    const existingCategory = await this.categoryRepository.getCategoryByCtgryNo(ctgryNo);

    if (!existingCategory?.success || !existingCategory.data) {
      return prismaResponse(
        false,
        null,
        'NOT_FOUND',
        MESSAGE.CATEGORY.ADMIN.NOT_FOUND
      );
    }

    // 카테고리명 중복 확인 (자신 제외)
    if (updateData.ctgryNm && updateData.ctgryNm !== existingCategory.data.ctgryNm) {
      const categoryWithSameName = await this.categoryRepository.getCategoryByCtgryNm(updateData.ctgryNm);

      if (categoryWithSameName?.success && categoryWithSameName.data) {
        return prismaResponse(
          false,
          null,
          'CONFLICT',
          MESSAGE.CATEGORY.ADMIN.NAME_IN_USE
        );
      }
    }

    // 상위 카테고리 존재 확인 및 레벨 제한 검증
    if (updateData.upCtgryNo) {
      const parentCategory = await this.categoryRepository.getCategoryByCtgryNo(updateData.upCtgryNo);

      if (!parentCategory?.success || !parentCategory.data) {
        return prismaResponse(
          false,
          null,
          'NOT_FOUND',
          MESSAGE.CATEGORY.ADMIN.PARENT_NOT_FOUND
        );
      }

      // 자기 자신을 상위 카테고리로 설정하는 것을 방지
      if (updateData.upCtgryNo === ctgryNo) {
        return prismaResponse(
          false,
          null,
          'BAD_REQUEST',
          MESSAGE.CATEGORY.ADMIN.PARENT_NOT_FOUND
        );
      }

      // 상위 카테고리의 레벨이 3이면 자식 카테고리를 생성할 수 없음
      if (parentCategory.data.ctgryLvl >= 3) {
        return prismaResponse(
          false,
          null,
          'BAD_REQUEST',
          MESSAGE.CATEGORY.ADMIN.LEVEL_EXCEEDED
        );
      }
    }

    return this.categoryRepository.updateCategory(
      userNo,
      {
        ...updateData,
        ctgryNo,
      }
    );
  }

  /**
   * @description 다수 카테고리 수정
   * @param userNo 사용자 번호
   * @param updateData 카테고리 수정 데이터
   */
  async adminMultipleUpdateCategory(userNo: number, updateData: UpdateCategoryDto & { ctgryNoList: number[] }): Promise<RepoResponseType<MultipleResultType> | null> {
    return this.categoryRepository.multipleUpdateCategory(
      userNo,
      updateData
    );
  }

  /**
   * @description 카테고리 삭제
   * @param userNo 사용자 번호
   * @param ctgryNo 카테고리 번호
   */
  async adminDeleteCategory(userNo: number, ctgryNo: number): Promise<RepoResponseType<boolean> | null> {
    // 카테고리 존재 확인
    const existingCategory = await this.categoryRepository.getCategoryByCtgryNo(ctgryNo);

    if (!existingCategory?.success || !existingCategory.data) {
      return prismaResponse(
        false,
        null,
        'NOT_FOUND',
        MESSAGE.CATEGORY.ADMIN.NOT_FOUND
      );
    }

    return this.categoryRepository.deleteCategory(
      userNo,
      { ctgryNo, }
    );
  }

  /**
   * @description 다수 카테고리 삭제
   * @param userNo 사용자 번호
   * @param deleteData 카테고리 삭제 데이터
   */
  async adminMultipleDeleteCategory(userNo: number, deleteData: DeleteCategoryDto): Promise<RepoResponseType<MultipleResultType> | null> {
    return this.categoryRepository.multipleDeleteCategory(
      userNo,
      deleteData
    );
  }
}
