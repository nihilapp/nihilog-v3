import { Injectable } from '@nestjs/common';

import {
  CategorySubscribeDto,
  CreateCategorySubscribeDto,
  MultipleCreateCategorySubscribeDto,
  MultipleDeleteCategorySubscribeDto,
  MultipleUpdateCategorySubscribeDto,
  SearchCategorySubscribeDto,
  UpdateCategorySubscribeDto
} from '@/dto/category-subscribe.dto';
import { ResponseDto, type ListDto } from '@/dto/response.dto';
import { CategorySubscribeRepository } from '@/endpoints/repositories/category-subscribe.repository';
import { createError, createResponse } from '@/utils';

@Injectable()
export class AdminCategorySubscribeService {
  constructor(private readonly categorySubscribeRepository: CategorySubscribeRepository) {}

  /**
   * @description 카테고리 구독 전체 목록 조회
   * @param searchData 검색 데이터
   */
  async adminGetCategorySubscribeList(searchData: SearchCategorySubscribeDto): Promise<ListDto<CategorySubscribeDto>> {
    const result = await this.categorySubscribeRepository
      .getCategorySubscribeList(searchData);

    return result;
  }

  /**
   * @description 카테고리별 구독자 조회
   * @param ctgryNo 카테고리 번호
   * @param searchData 검색 데이터
   */
  async adminGetCategorySubscribeByCtgryNo(
    ctgryNo: number,
    searchData: SearchCategorySubscribeDto
  ): Promise<ListDto<CategorySubscribeDto>> {
    const result = await this.categorySubscribeRepository
      .getCategorySubscribeByCtgryNo(ctgryNo, searchData);

    return result;
  }

  /**
   * @description 카테고리 구독 생성
   * @param userNo 사용자 번호
   * @param createData 카테고리 구독 생성 데이터
   */
  async adminCreateCategorySubscribe(
    userNo: number,
    createData: CreateCategorySubscribeDto
  ): Promise<ResponseDto<CategorySubscribeDto>> {
    try {
      const result = await this.categorySubscribeRepository
        .createCategorySubscribe(userNo, createData);

      return createResponse(
        'SUCCESS',
        'ADMIN_CATEGORY_SUBSCRIBE_CREATE_SUCCESS',
        result
      );
    }
    catch {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'ADMIN_CATEGORY_SUBSCRIBE_CREATE_ERROR'
      );
    }
  }

  /**
   * @description 다수 카테고리 구독 생성
   * @param userNo 사용자 번호
   * @param createData 다수 카테고리 구독 생성 데이터
   */
  async adminMultipleCreateCategorySubscribe(
    userNo: number,
    createData: MultipleCreateCategorySubscribeDto
  ): Promise<ResponseDto<CategorySubscribeDto[]>> {
    try {
      const result = await this.categorySubscribeRepository.multipleCreateCategorySubscribe(userNo, createData);

      return createResponse(
        'SUCCESS',
        'ADMIN_CATEGORY_SUBSCRIBE_MULTIPLE_CREATE_SUCCESS',
        result
      );
    }
    catch {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'ADMIN_CATEGORY_SUBSCRIBE_MULTIPLE_CREATE_ERROR'
      );
    }
  }

  /**
   * @description 카테고리 구독 수정
   * @param userNo 사용자 번호
   * @param ctgrySbcrNo 카테고리 구독 번호
   * @param updateData 카테고리 구독 수정 데이터
   */
  async adminUpdateCategorySubscribe(
    userNo: number,
    updateData: UpdateCategorySubscribeDto
  ): Promise<ResponseDto<CategorySubscribeDto>> {
    try {
      const subscribe = await this.categorySubscribeRepository.getCategorySubscribeByCtgrySbcrNo(updateData.ctgrySbcrNo);

      if (!subscribe) {
        return createError(
          'NOT_FOUND',
          'CATEGORY_SUBSCRIBE_NOT_FOUND'
        );
      }

      const updateSubscribe = await this.categorySubscribeRepository
        .updateCategorySubscribe(userNo, updateData);

      return createResponse(
        'SUCCESS',
        'ADMIN_CATEGORY_SUBSCRIBE_UPDATE_SUCCESS',
        updateSubscribe
      );
    }
    catch {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'ADMIN_CATEGORY_SUBSCRIBE_UPDATE_ERROR'
      );
    }
  }

  /**
   * @description 다수 카테고리 구독 수정
   * @param userNo 사용자 번호
   * @param updateData 다수 카테고리 구독 수정 데이터
   */
  async adminMultipleUpdateCategorySubscribe(
    userNo: number,
    updateData: MultipleUpdateCategorySubscribeDto
  ): Promise<ResponseDto<CategorySubscribeDto[]>> {
    try {
      const existingItems = await this.categorySubscribeRepository.getCategorySubscribeList({
        ctgrySbcrNoList: updateData.ctgrySbcrNoList,
        delYn: 'N',
      });

      if (!existingItems || existingItems.list.length === 0) {
        return createError(
          'NOT_FOUND',
          'CATEGORY_SUBSCRIBE_NOT_FOUND'
        );
      }

      const result = await this.categorySubscribeRepository.multipleUpdateCategorySubscribe(userNo, updateData);

      if (!result || result.length === 0) {
        return createError(
          'NOT_FOUND',
          'CATEGORY_SUBSCRIBE_NOT_FOUND'
        );
      }

      return createResponse(
        'SUCCESS',
        'ADMIN_CATEGORY_SUBSCRIBE_MULTIPLE_UPDATE_SUCCESS',
        result
      );
    }
    catch {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'ADMIN_CATEGORY_SUBSCRIBE_MULTIPLE_UPDATE_ERROR'
      );
    }
  }

  /**
   * @description 카테고리 구독 삭제
   * @param userNo 사용자 번호
   * @param updateData 카테고리 구독 삭제 데이터
   */
  async adminDeleteCategorySubscribe(
    userNo: number,
    updateData: UpdateCategorySubscribeDto
  ): Promise<ResponseDto<null>> {
    try {
      const result = await this.categorySubscribeRepository.deleteCategorySubscribe(userNo, updateData);

      if (!result) {
        return createError(
          'NOT_FOUND',
          'CATEGORY_SUBSCRIBE_NOT_FOUND'
        );
      }

      return createResponse(
        'SUCCESS',
        'ADMIN_CATEGORY_SUBSCRIBE_DELETE_SUCCESS',
        null
      );
    }
    catch {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'ADMIN_CATEGORY_SUBSCRIBE_DELETE_ERROR'
      );
    }
  }

  /**
   * @description 다수 카테고리 구독 삭제
   * @param userNo 사용자 번호
   * @param deleteData 다수 카테고리 구독 삭제 데이터
   */
  async adminMultipleDeleteCategorySubscribe(
    userNo: number,
    deleteData: MultipleDeleteCategorySubscribeDto
  ): Promise<ResponseDto<null>> {
    try {
      const result = await this.categorySubscribeRepository
        .multipleDeleteCategorySubscribe(userNo, deleteData);

      if (!result) {
        return createError(
          'NOT_FOUND',
          'CATEGORY_SUBSCRIBE_NOT_FOUND'
        );
      }

      return createResponse(
        'SUCCESS',
        'ADMIN_CATEGORY_SUBSCRIBE_MULTIPLE_DELETE_SUCCESS',
        null
      );
    }
    catch {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'ADMIN_CATEGORY_SUBSCRIBE_MULTIPLE_DELETE_ERROR'
      );
    }
  }
}
