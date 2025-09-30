import { Injectable } from '@nestjs/common';

import type { CategorySubscribeDto, CreateCategorySubscribeDto, ListDto, MultipleCreateCategorySubscribeDto, MultipleDeleteCategorySubscribeDto, MultipleUpdateCategorySubscribeDto, MutationResponseDto, SearchCategorySubscribeDto } from '@/dto';
import { ResponseDto } from '@/dto/response.dto';
import type { CategorySubscribeRepository } from '@/endpoints/repositories/category-subscribe.repository';
import { createError, createResponse } from '@/utils';

@Injectable()
export class CategorySubscribeService {
  constructor(private readonly categorySubscribeRepository: CategorySubscribeRepository) {}

  /**
   * @description 사용자가 구독한 카테고리 목록 조회
   */
  async getCategorySubscribeList(searchData: SearchCategorySubscribeDto): Promise<ListDto<CategorySubscribeDto>> {
    const categorySubscribeList = await this.categorySubscribeRepository.getCategorySubscribeList(searchData);

    return categorySubscribeList;
  }

  /**
   * @description 특정 사용자 구독 상태 조회
   * @param userNo 사용자 번호
   * @param searchData 검색 데이터
   */
  async getCategorySubscribeByUserNo(userNo: number, searchData: SearchCategorySubscribeDto): Promise<ListDto<CategorySubscribeDto>> {
    const categorySubscribeList = await this.categorySubscribeRepository.getCategorySubscribeByUserNo(userNo, searchData);

    return categorySubscribeList;
  }

  /**
   * @description 특정 카테고리 구독 상태 조회
   * @param ctgryNo 카테고리 번호
   * @param searchData 검색 데이터
   */
  async getCategorySubscribeByCtgryNo(ctgryNo: number, searchData: SearchCategorySubscribeDto): Promise<ListDto<CategorySubscribeDto>> {
    const categorySubscribeList = await this.categorySubscribeRepository.getCategorySubscribeByCtgryNo(ctgryNo, searchData);

    return categorySubscribeList;
  }

  /**
   * @description 카테고리 구독 생성
   * @param userNo 사용자 번호
   * @param createData 카테고리 구독 생성 데이터
   */
  async createCategorySubscribe(userNo: number, createData: CreateCategorySubscribeDto): Promise<ResponseDto<CategorySubscribeDto>> {
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

  // TODO: 여기서부터 시작

  /**
   * @description 카테고리 구독 목록 생성
   * @param userNo 사용자 번호
   * @param createData 카테고리 구독 생성 데이터
   */
  async multipleCreateCategorySubscribe(userNo: number, createData: MultipleCreateCategorySubscribeDto): Promise<ResponseDto<CategorySubscribeDto[]>> {
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
  async multipleUpdateCategorySubscribe(userNo: number, updateData: MultipleUpdateCategorySubscribeDto): Promise<ResponseDto<CategorySubscribeDto[]>> {
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
  async deleteCategorySubscribe(userNo: number, ctgrySbcrNo: number): Promise<ResponseDto<MutationResponseDto>> {
    const deleteSubscribe = await this.categorySubscribeRepository.deleteCategorySubscribeByCtgrySbcrNo(userNo, ctgrySbcrNo);

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
   * @param ctgryNoList 카테고리 번호 목록
   */
  async multipleDeleteCategorySubscribe(userNo: number, deleteData: MultipleDeleteCategorySubscribeDto): Promise<ResponseDto<MutationResponseDto>> {
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
