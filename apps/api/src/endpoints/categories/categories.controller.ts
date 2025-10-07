import {
  Controller,
  Body,
  Param
} from '@nestjs/common';

import { Endpoint } from '@/decorators/endpoint.decorator';
import { ResponseDto } from '@/dto';
import { SearchCategoryDto } from '@/dto/category.dto';
import type { SelectCategoryListItemType, SelectCategoryType } from '@/endpoints/prisma/types/category.types';
import type { ListType } from '@/endpoints/prisma/types/common.types';
import { createError, createResponse } from '@/utils';

import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  /**
   * @description 카테고리 목록 조회
   * @param searchData 검색 데이터
   */
  @Endpoint({
    endpoint: '',
    method: 'POST',
  })
  async getCategoryList(@Body() searchData: SearchCategoryDto): Promise<ResponseDto<ListType<SelectCategoryListItemType>>> {
    const result = await this.categoriesService.getCategoryList(searchData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'CATEGORY_SEARCH_ERROR'
      );
    }

    return createResponse('SUCCESS', 'CATEGORY_SEARCH_SUCCESS', result.data);
  }

  /**
   * @description 카테고리 번호로 카테고리 조회
   * @param ctgryNo 카테고리 번호
   */
  @Endpoint({
    endpoint: '/:ctgryNo',
    method: 'GET',
  })
  async getCategoryByCtgryNo(@Param('ctgryNo') ctgryNo: number): Promise<ResponseDto<SelectCategoryType>> {
    const result = await this.categoriesService.getCategoryByCtgryNo(ctgryNo);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'NOT_FOUND',
        result?.error?.message || 'CATEGORY_NOT_FOUND'
      );
    }

    return createResponse('SUCCESS', 'CATEGORY_GET_SUCCESS', result.data);
  }

  /**
   * @description 카테고리명으로 카테고리 조회
   * @param name 카테고리명
   */
  @Endpoint({
    endpoint: '/name/:name',
    method: 'GET',
  })
  async getCategoryByCtgryNm(@Param('name') name: string): Promise<ResponseDto<SelectCategoryType>> {
    const result = await this.categoriesService.getCategoryByCtgryNm(name);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'NOT_FOUND',
        result?.error?.message || 'CATEGORY_NAME_NOT_FOUND'
      );
    }

    return createResponse('SUCCESS', 'CATEGORY_GET_BY_NAME_SUCCESS', result.data);
  }
}
