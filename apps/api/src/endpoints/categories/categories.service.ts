import { Injectable } from '@nestjs/common';
import { searchCategorySchema } from '@nihilog/schemas';
import type { SelectCategoryListItemType, SelectCategoryType } from '@nihilog/schemas';
import type { ListType, RepoResponseType } from '@nihilog/schemas';

import { MESSAGE } from '@nihilog/code';
import type { SearchCategoryDto } from '@/dto/category.dto';
import { CategoryRepository } from '@/endpoints/repositories/category.repository';
import { prismaResponse } from '@/utils/prismaResponse';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) { }

  /**
   * @description 카테고리 목록 조회
   * @param searchData 검색 데이터
   */
  async getCategoryList(searchData: SearchCategoryDto): Promise<RepoResponseType<ListType<SelectCategoryListItemType>> | null> {
    const safeData = searchCategorySchema.safeParse(searchData);

    if (!safeData.success) {
      return prismaResponse(
        false,
        null,
        'BAD_REQUEST',
        MESSAGE.COMMON.INVALID_REQUEST
      );
    }

    return this.categoryRepository.getCategoryList(safeData.data);
  }

  /**
   * @description 카테고리 번호로 카테고리 조회
   * @param ctgryNo 카테고리 번호
   */
  async getCategoryByCtgryNo(ctgryNo: number): Promise<RepoResponseType<SelectCategoryType> | null> {
    const result = await this.categoryRepository.getCategoryByCtgryNo(ctgryNo);

    if (!result?.success) {
      return prismaResponse(
        false,
        null,
        result?.error?.code || 'NOT_FOUND',
        MESSAGE.CATEGORY.USER.NOT_FOUND
      );
    }

    return result;
  }

  /**
   * @description 카테고리명으로 카테고리 조회
   * @param ctgryNm 카테고리명
   */
  async getCategoryByCtgryNm(ctgryNm: string): Promise<RepoResponseType<SelectCategoryType> | null> {
    const result = await this.categoryRepository.getCategoryByCtgryNm(ctgryNm);

    if (!result?.success) {
      return prismaResponse(
        false,
        null,
        result?.error?.code || 'NOT_FOUND',
        MESSAGE.CATEGORY.USER.NAME_NOT_FOUND
      );
    }

    return result;
  }
}
