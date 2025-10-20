import {
  Controller,
  Param,
  ParseIntPipe,
  Query
} from '@nestjs/common';

import { MESSAGE } from '@/code/messages';
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
    endpoint: '/search',
    method: 'GET',
  })
  async getCategoryList(@Query() searchData: SearchCategoryDto): Promise<ResponseDto<ListType<SelectCategoryListItemType>>> {
    const result = await this.categoriesService.getCategoryList(searchData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || MESSAGE.CATEGORY.USER.SEARCH_ERROR
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.CATEGORY.USER.SEARCH_SUCCESS,
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
  async getCategoryByCtgryNo(@Param(
    'ctgryNo',
    ParseIntPipe
  ) ctgryNo: number): Promise<ResponseDto<SelectCategoryType>> {
    const result = await this.categoriesService.getCategoryByCtgryNo(ctgryNo);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'NOT_FOUND',
        result?.error?.message || MESSAGE.CATEGORY.USER.NOT_FOUND
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.CATEGORY.USER.GET_SUCCESS,
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
  async getCategoryByCtgryNm(@Param('name') name: string): Promise<ResponseDto<SelectCategoryType>> {
    const result = await this.categoriesService.getCategoryByCtgryNm(name);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'NOT_FOUND',
        result?.error?.message || MESSAGE.CATEGORY.USER.NAME_NOT_FOUND
      );
    }

    return createResponse(
      'SUCCESS',
      MESSAGE.CATEGORY.USER.GET_BY_NAME_SUCCESS,
      result.data
    );
  }
}
