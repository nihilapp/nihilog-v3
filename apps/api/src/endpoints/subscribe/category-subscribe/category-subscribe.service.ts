import { Injectable } from '@nestjs/common';

import type { CreateCategorySubscribeDto, DeleteCategorySubscribeDto, SearchCategorySubscribeDto, UpdateCategorySubscribeDto } from '@/dto';
import { ResponseDto } from '@/dto/response.dto';
import type { SelectCtgrySbcrMpngListItemType } from '@/endpoints/prisma/types/category-subscribe.types';
import type { ListType, MultipleResultType } from '@/endpoints/prisma/types/common.types';
import type { CategorySubscribeRepository } from '@/endpoints/repositories/category-subscribe.repository';
import { createError, createResponse } from '@/utils';
import type { CtgrySbcrMpng } from '~prisma/client';

@Injectable()
export class CategorySubscribeService {
  constructor(private readonly categorySubscribeRepository: CategorySubscribeRepository) {}

  /**
   * @description 사용자가 구독한 카테고리 목록 조회
   * @param searchData 검색 데이터
   */
  async getCategorySubscribeList(searchData: SearchCategorySubscribeDto): Promise<ListType<SelectCtgrySbcrMpngListItemType>> {
    const categorySubscribeList = await this.categorySubscribeRepository.getCategorySubscribeList(searchData);

    return categorySubscribeList;
  }

  /**
   * @description 특정 사용자 구독 상태 조회
   * @param userNo 사용자 번호
   * @param searchData 검색 데이터
   */
  async getCategorySubscribeByUserNo(userNo: number, searchData: SearchCategorySubscribeDto): Promise<ListType<SelectCtgrySbcrMpngListItemType>> {
    const categorySubscribeList = await this.categorySubscribeRepository.getCategorySubscribeByUserNo(userNo, searchData);

    return categorySubscribeList;
  }

  /**
   * @description 특정 카테고리 구독 상태 조회
   * @param ctgryNo 카테고리 번호
   * @param searchData 검색 데이터
   */
  async getCategorySubscribeByCtgryNo(ctgryNo: number, searchData: SearchCategorySubscribeDto): Promise<ListType<SelectCtgrySbcrMpngListItemType>> {
    const categorySubscribeList = await this.categorySubscribeRepository.getCategorySubscribeByCtgryNo(ctgryNo, searchData);

    return categorySubscribeList;
  }

  /**
   * @description 카테고리 구독 생성
   * @param userNo 사용자 번호
   * @param createData 카테고리 구독 생성 데이터
   */
  async createCategorySubscribe(userNo: number, createData: CreateCategorySubscribeDto): Promise<ResponseDto<CtgrySbcrMpng>> {
    const createSubscribe = await this.categorySubscribeRepository.createCategorySubscribe(userNo, createData);

    if (!createSubscribe) {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'CATEGORY_SUBSCRIBE_CREATE_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'CATEGORY_SUBSCRIBE_CREATE_SUCCESS',
      createSubscribe
    );
  }

  /**
   * @description 카테고리 구독 목록 생성
   * @param userNo 사용자 번호
   * @param createData 카테고리 구독 생성 데이터
   */
  async multipleCreateCategorySubscribe(userNo: number, createData: CreateCategorySubscribeDto): Promise<ResponseDto<MultipleResultType>> {
    const createSubscribe = await this.categorySubscribeRepository.multipleCreateCategorySubscribe(userNo, createData);

    if (!createSubscribe) {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'CATEGORY_SUBSCRIBE_CREATE_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'CATEGORY_SUBSCRIBE_CREATE_SUCCESS',
      createSubscribe
    );
  }

  /**
   * @description 카테고리 구독 목록 수정
   * @param userNo 사용자 번호
   * @param updateData 카테고리 구독 수정 데이터
   */
  async multipleUpdateCategorySubscribe(userNo: number, updateData: UpdateCategorySubscribeDto): Promise<ResponseDto<MultipleResultType>> {
    const updateSubscribe = await this.categorySubscribeRepository.multipleUpdateCategorySubscribe(userNo, updateData);

    if (!updateSubscribe) {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'CATEGORY_SUBSCRIBE_UPDATE_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'CATEGORY_SUBSCRIBE_UPDATE_SUCCESS',
      updateSubscribe
    );
  }

  /**
   * @description 카테고리 구독 삭제
   * @param userNo 사용자 번호
   * @param ctgrySbcrNo 카테고리 구독 번호
   */
  async deleteCategorySubscribe(userNo: number, ctgrySbcrNo: number): Promise<ResponseDto<boolean>> {
    const deleteSubscribe = await this.categorySubscribeRepository.deleteCategorySubscribe(userNo, ctgrySbcrNo);

    if (!deleteSubscribe) {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'CATEGORY_SUBSCRIBE_DELETE_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'CATEGORY_SUBSCRIBE_DELETE_SUCCESS',
      deleteSubscribe
    );
  }

  /**
   * @description 카테고리 구독 목록 삭제
   * @param userNo 사용자 번호
   * @param deleteData 삭제할 카테고리 구독 데이터
   */
  async multipleDeleteCategorySubscribe(userNo: number, deleteData: DeleteCategorySubscribeDto): Promise<ResponseDto<MultipleResultType>> {
    const deleteSubscribe = await this.categorySubscribeRepository.multipleDeleteCategorySubscribe(userNo, deleteData);

    if (!deleteSubscribe) {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'CATEGORY_SUBSCRIBE_DELETE_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'CATEGORY_SUBSCRIBE_DELETE_SUCCESS',
      deleteSubscribe
    );
  }
}
