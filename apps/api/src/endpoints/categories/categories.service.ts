import { Injectable } from '@nestjs/common';

import type { SearchCategoryDto } from '@/dto/category.dto';
import type { SelectCategoryListItemType, SelectCategoryType } from '@/endpoints/prisma/types/category.types';
import type { ListType, RepoResponseType } from '@/endpoints/prisma/types/common.types';
import { CategoryRepository } from '@/endpoints/repositories/category.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) { }

  /**
   * @description 카테고리 목록 조회
   * @param searchData 검색 데이터
   */
  async getCategoryList(searchData: SearchCategoryDto): Promise<RepoResponseType<ListType<SelectCategoryListItemType>> | null> {
    return this.categoryRepository.getCategoryList(searchData);
  }

  /**
   * @description 카테고리 번호로 카테고리 조회
   * @param ctgryNo 카테고리 번호
   */
  async getCategoryByCtgryNo(ctgryNo: number): Promise<RepoResponseType<SelectCategoryType> | null> {
    return this.categoryRepository.getCategoryByCtgryNo(ctgryNo);
  }

  /**
   * @description 카테고리명으로 카테고리 조회
   * @param ctgryNm 카테고리명
   */
  async getCategoryByCtgryNm(ctgryNm: string): Promise<RepoResponseType<SelectCategoryType> | null> {
    return this.categoryRepository.getCategoryByCtgryNm(ctgryNm);
  }
}
