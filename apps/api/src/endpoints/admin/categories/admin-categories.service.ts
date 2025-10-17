import { Injectable } from '@nestjs/common';

import type { CreateCategoryDto, DeleteCategoryDto, SearchCategoryDto, UpdateCategoryDto } from '@/dto/category.dto';
import type { AnalyzeStatDto } from '@/dto/common.dto';
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
} from '@/endpoints/prisma/types/category.types';
import type { ListType, MultipleResultType, RepoResponseType } from '@/endpoints/prisma/types/common.types';
import { CategoryRepository } from '@/endpoints/repositories/category.repository';

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
    return this.categoryRepository.getAnalyzeCategoryData(analyzeStatData, ctgryNo);
  }

  /**
   * @description 카테고리별 인기 지수 TOP N
   * @param analyzeStatData 분석 통계 데이터
   */
  async adminGetTopPopularCategoriesByIndex(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<TopPopularCategoryItemType[]> | null> {
    return this.categoryRepository.getTopPopularCategoriesByIndex(analyzeStatData.limit || 10, analyzeStatData);
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
   * @param createData 카테고리 생성 데이터
   */
  async adminCreateCategory(createData: CreateCategoryDto): Promise<RepoResponseType<SelectCategoryType> | null> {
    // TODO: 관리자 권한 확인 로직 추가
    const adminUserNo = 1; // 임시 관리자 번호
    return this.categoryRepository.createCategory(adminUserNo, createData);
  }

  /**
   * @description 다수 카테고리 생성
   * @param createData 카테고리 생성 데이터
   */
  async adminMultipleCreateCategory(createData: CreateCategoryDto[]): Promise<RepoResponseType<MultipleResultType> | null> {
    // TODO: 관리자 권한 확인 로직 추가
    const adminUserNo = 1; // 임시 관리자 번호
    return this.categoryRepository.multipleCreateCategory(adminUserNo, createData);
  }

  /**
   * @description 카테고리 수정
   * @param ctgryNo 카테고리 번호
   * @param updateData 카테고리 수정 데이터
   */
  async adminUpdateCategory(ctgryNo: number, updateData: UpdateCategoryDto): Promise<RepoResponseType<SelectCategoryType> | null> {
    // TODO: 관리자 권한 확인 로직 추가
    const adminUserNo = 1; // 임시 관리자 번호
    return this.categoryRepository.updateCategory(adminUserNo, { ...updateData, ctgryNo, });
  }

  /**
   * @description 다수 카테고리 수정
   * @param updateData 카테고리 수정 데이터
   */
  async adminMultipleUpdateCategory(updateData: UpdateCategoryDto & { ctgryNoList: number[] }): Promise<RepoResponseType<MultipleResultType> | null> {
    // TODO: 관리자 권한 확인 로직 추가
    const adminUserNo = 1; // 임시 관리자 번호
    return this.categoryRepository.multipleUpdateCategory(adminUserNo, updateData);
  }

  /**
   * @description 카테고리 삭제
   * @param ctgryNo 카테고리 번호
   */
  async adminDeleteCategory(ctgryNo: number): Promise<RepoResponseType<boolean> | null> {
    // TODO: 관리자 권한 확인 로직 추가
    const adminUserNo = 1; // 임시 관리자 번호
    return this.categoryRepository.deleteCategory(adminUserNo, { ctgryNo, });
  }

  /**
   * @description 다수 카테고리 삭제
   * @param deleteData 카테고리 삭제 데이터
   */
  async adminMultipleDeleteCategory(deleteData: DeleteCategoryDto): Promise<RepoResponseType<MultipleResultType> | null> {
    // TODO: 관리자 권한 확인 로직 추가
    const adminUserNo = 1; // 임시 관리자 번호
    return this.categoryRepository.multipleDeleteCategory(adminUserNo, deleteData);
  }
}
