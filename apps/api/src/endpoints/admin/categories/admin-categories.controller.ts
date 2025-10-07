import {
  Controller,
  Body,
  Param
} from '@nestjs/common';

import { Endpoint } from '@/decorators/endpoint.decorator';
import { ResponseDto } from '@/dto';
import { CreateCategoryDto, DeleteCategoryDto, SearchCategoryDto, UpdateCategoryDto } from '@/dto/category.dto';
import type { AdminCategoriesService } from '@/endpoints/admin/categories/admin-categories.service';
import type { SelectCategoryListItemType, SelectCategoryType } from '@/endpoints/prisma/types/category.types';
import type { ListType, MultipleResultType } from '@/endpoints/prisma/types/common.types';
import { createError, createResponse } from '@/utils';

@Controller('admin/categories')
export class AdminCategoriesController {
  constructor(private readonly adminCategoriesService: AdminCategoriesService) { }

  /**
   * @description 카테고리 목록 조회
   * @param searchData 검색 데이터
   */
  @Endpoint({
    endpoint: '',
    method: 'POST',
  })
  async adminGetCategoryList(@Body() searchData: SearchCategoryDto): Promise<ResponseDto<ListType<SelectCategoryListItemType>>> {
    const result = await this.adminCategoriesService.adminGetCategoryList(searchData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_CATEGORY_SEARCH_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_CATEGORY_SEARCH_SUCCESS', result.data);
  }

  /**
   * @description 카테고리 번호로 카테고리 조회
   * @param ctgryNo 카테고리 번호
   */
  @Endpoint({
    endpoint: '/:ctgryNo',
    method: 'GET',
  })
  async adminGetCategoryByCtgryNo(@Param('ctgryNo') ctgryNo: number): Promise<ResponseDto<SelectCategoryType>> {
    const result = await this.adminCategoriesService.adminGetCategoryByCtgryNo(ctgryNo);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_CATEGORY_GET_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_CATEGORY_GET_SUCCESS', result.data);
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
        result?.error?.message || 'ADMIN_CATEGORY_GET_BY_NAME_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_CATEGORY_GET_BY_NAME_SUCCESS', result.data);
  }

  /**
   * @description 카테고리 생성
   * @param createData 카테고리 생성 데이터
   */
  @Endpoint({
    endpoint: '',
    method: 'POST',
  })
  async adminCreateCategory(@Body() createData: CreateCategoryDto): Promise<ResponseDto<SelectCategoryType>> {
    const result = await this.adminCategoriesService.adminCreateCategory(createData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_CATEGORY_CREATE_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_CATEGORY_CREATE_SUCCESS', result.data);
  }

  /**
   * @description 다수 카테고리 생성
   * @param createData 카테고리 생성 데이터
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'POST',
  })
  async adminMultipleCreateCategory(@Body() createData: CreateCategoryDto[]): Promise<ResponseDto<MultipleResultType>> {
    const result = await this.adminCategoriesService.adminMultipleCreateCategory(createData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_CATEGORY_MULTIPLE_CREATE_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_CATEGORY_MULTIPLE_CREATE_SUCCESS', result.data);
  }

  /**
   * @description 카테고리 수정
   * @param ctgryNo 카테고리 번호
   * @param updateData 카테고리 수정 데이터
   */
  @Endpoint({
    endpoint: '/:ctgryNo',
    method: 'PATCH',
  })
  async adminUpdateCategory(@Param('ctgryNo') ctgryNo: number, @Body() updateData: UpdateCategoryDto): Promise<ResponseDto<SelectCategoryType>> {
    const result = await this.adminCategoriesService.adminUpdateCategory(ctgryNo, updateData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_CATEGORY_UPDATE_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_CATEGORY_UPDATE_SUCCESS', result.data);
  }

  /**
   * @description 다수 카테고리 수정
   * @param updateData 카테고리 수정 데이터
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'PATCH',
  })
  async adminMultipleUpdateCategory(@Body() updateData: UpdateCategoryDto & { ctgryNoList: number[] }): Promise<ResponseDto<MultipleResultType>> {
    const result = await this.adminCategoriesService.adminMultipleUpdateCategory(updateData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_CATEGORY_MULTIPLE_UPDATE_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_CATEGORY_MULTIPLE_UPDATE_SUCCESS', result.data);
  }

  /**
   * @description 카테고리 삭제
   * @param ctgryNo 카테고리 번호
   */
  @Endpoint({
    endpoint: '/:ctgryNo',
    method: 'DELETE',
  })
  async adminDeleteCategory(@Param('ctgryNo') ctgryNo: number): Promise<ResponseDto<boolean>> {
    const result = await this.adminCategoriesService.adminDeleteCategory(ctgryNo);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_CATEGORY_DELETE_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_CATEGORY_DELETE_SUCCESS', result.data);
  }

  /**
   * @description 다수 카테고리 삭제
   * @param deleteData 카테고리 삭제 데이터
   */
  @Endpoint({
    endpoint: '/multiple',
    method: 'DELETE',
  })
  async adminMultipleDeleteCategory(@Body() deleteData: DeleteCategoryDto): Promise<ResponseDto<MultipleResultType>> {
    const result = await this.adminCategoriesService.adminMultipleDeleteCategory(deleteData);

    if (!result?.success) {
      return createError(
        result?.error?.code || 'INTERNAL_SERVER_ERROR',
        result?.error?.message || 'ADMIN_CATEGORY_MULTIPLE_DELETE_ERROR'
      );
    }

    return createResponse('SUCCESS', 'ADMIN_CATEGORY_MULTIPLE_DELETE_SUCCESS', result.data);
  }
}
