import { Injectable } from '@nestjs/common';

import { MESSAGE } from '@/code/messages';
import type { CreateCategorySubscribeDto, DeleteCategorySubscribeDto, SearchCategorySubscribeDto, UpdateCategorySubscribeDto } from '@/dto';
import { searchCategorySubscribeSchema } from '@/endpoints/prisma/schemas/category-subscribe.schema';
import type { SelectCtgrySbcrMpngListItemType, SelectCtgrySbcrMpngType } from '@/endpoints/prisma/types/category-subscribe.types';
import type { ListType, MultipleResultType, RepoResponseType } from '@/endpoints/prisma/types/common.types';
import { CategorySubscribeRepository } from '@/endpoints/repositories/category-subscribe.repository';
import { prismaResponse } from '@/utils/prismaResponse';

@Injectable()
export class CategorySubscribeService {
  constructor(private readonly categorySubscribeRepository: CategorySubscribeRepository) {}

  /**
   * @description 카테고리 구독 목록 조회 (일반/관리자 공통)
   * @param searchData 검색 데이터
   */
  async getCategorySubscribeList(searchData: SearchCategorySubscribeDto): Promise<RepoResponseType<ListType<SelectCtgrySbcrMpngListItemType>> | null> {
    const safeData = searchCategorySubscribeSchema.safeParse(searchData);

    if (!safeData.success) {
      return prismaResponse(false, null, 'BAD_REQUEST', MESSAGE.COMMON.INVALID_REQUEST);
    }

    return this.categorySubscribeRepository.getCategorySubscribeList(safeData.data);
  }

  /**
   * @description 특정 사용자 구독 상태 조회
   * @param userNo 사용자 번호
   * @param searchData 검색 데이터
   */
  async getCategorySubscribeByUserNo(userNo: number, searchData: SearchCategorySubscribeDto): Promise<RepoResponseType<ListType<SelectCtgrySbcrMpngListItemType>> | null> {
    const safeData = searchCategorySubscribeSchema.safeParse(searchData);

    if (!safeData.success) {
      return prismaResponse(false, null, 'BAD_REQUEST', MESSAGE.COMMON.INVALID_REQUEST);
    }

    return this.categorySubscribeRepository.getCategorySubscribeByUserNo(userNo, safeData.data);
  }

  /**
   * @description 특정 카테고리 구독 상태 조회 (일반/관리자 공통)
   * @param ctgryNo 카테고리 번호
   * @param searchData 검색 데이터
   */
  async getCategorySubscribeByCtgryNo(ctgryNo: number, searchData: SearchCategorySubscribeDto): Promise<RepoResponseType<ListType<SelectCtgrySbcrMpngListItemType>> | null> {
    const safeData = searchCategorySubscribeSchema.safeParse(searchData);

    if (!safeData.success) {
      return prismaResponse(false, null, 'BAD_REQUEST', MESSAGE.COMMON.INVALID_REQUEST);
    }

    return this.categorySubscribeRepository.getCategorySubscribeByCtgryNo(ctgryNo, safeData.data);
  }

  /**
   * @description 카테고리 구독 생성 (일반/관리자 공통)
   * @param userNo 사용자 번호
   * @param createData 카테고리 구독 생성 데이터
   */
  async createCategorySubscribe(userNo: number, createData: CreateCategorySubscribeDto): Promise<RepoResponseType<SelectCtgrySbcrMpngType> | null> {
    // 카테고리 구독 중복 체크
    const existingSubscribe = await this.categorySubscribeRepository.getCategorySubscribeBySbcrNoAndCtgryNo(createData.sbcrNo, createData.ctgryNo);

    if (existingSubscribe.data) {
      return prismaResponse(false, null, 'CONFLICT', MESSAGE.SUBSCRIBE.CATEGORY.ALREADY_EXISTS);
    }

    return this.categorySubscribeRepository.createCategorySubscribe(userNo, createData);
  }

  /**
   * @description 카테고리 구독 목록 생성 (일반/관리자 공통)
   * @param userNo 사용자 번호
   * @param createData 카테고리 구독 생성 데이터
   */
  async multipleCreateCategorySubscribe(userNo: number, createData: CreateCategorySubscribeDto): Promise<RepoResponseType<MultipleResultType> | null> {
    // 각 카테고리별로 중복 체크
    for (const ctgryNo of createData.ctgryNoList) {
      const existingSubscribe = await this.categorySubscribeRepository.getCategorySubscribeBySbcrNoAndCtgryNo(createData.sbcrNo, ctgryNo);

      if (existingSubscribe.data) {
        return prismaResponse(false, null, 'CONFLICT', MESSAGE.SUBSCRIBE.CATEGORY.ALREADY_EXISTS);
      }
    }

    return this.categorySubscribeRepository.multipleCreateCategorySubscribe(userNo, createData);
  }

  /**
   * @description 카테고리 구독 수정 (일반/관리자 공통)
   * @param userNo 사용자 번호
   * @param updateData 카테고리 구독 수정 데이터
   */
  async updateCategorySubscribe(userNo: number, updateData: UpdateCategorySubscribeDto): Promise<RepoResponseType<SelectCtgrySbcrMpngType> | null> {
    // 구독 정보 존재 확인
    const subscribe = await this.categorySubscribeRepository.getCategorySubscribeByCtgrySbcrNo(updateData.ctgrySbcrNo);

    if (!subscribe.data) {
      return prismaResponse(false, null, 'NOT_FOUND', MESSAGE.SUBSCRIBE.CATEGORY.NOT_FOUND);
    }

    return this.categorySubscribeRepository.updateCategorySubscribe(userNo, updateData);
  }

  /**
   * @description 카테고리 구독 목록 수정 (일반/관리자 공통)
   * @param userNo 사용자 번호
   * @param updateData 카테고리 구독 수정 데이터
   */
  async multipleUpdateCategorySubscribe(userNo: number, updateData: UpdateCategorySubscribeDto): Promise<RepoResponseType<MultipleResultType> | null> {
    return this.categorySubscribeRepository.multipleUpdateCategorySubscribe(userNo, updateData);
  }

  /**
   * @description 카테고리 구독 삭제 (일반/관리자 공통)
   * @param userNo 사용자 번호
   * @param ctgrySbcrNo 카테고리 구독 번호
   */
  async deleteCategorySubscribe(userNo: number, ctgrySbcrNo: number): Promise<RepoResponseType<boolean> | null> {
    // 구독 정보 존재 확인
    const subscribe = await this.categorySubscribeRepository.getCategorySubscribeByCtgrySbcrNo(ctgrySbcrNo);

    if (!subscribe.data) {
      return prismaResponse(false, null, 'NOT_FOUND', MESSAGE.SUBSCRIBE.CATEGORY.NOT_FOUND);
    }

    return this.categorySubscribeRepository.deleteCategorySubscribe(userNo, ctgrySbcrNo);
  }

  /**
   * @description 카테고리 구독 목록 삭제 (일반/관리자 공통)
   * @param userNo 사용자 번호
   * @param deleteData 삭제할 카테고리 구독 데이터
   */
  async multipleDeleteCategorySubscribe(userNo: number, deleteData: DeleteCategorySubscribeDto): Promise<RepoResponseType<MultipleResultType> | null> {
    // 각 구독 정보 존재 확인
    for (const ctgrySbcrNo of deleteData.ctgrySbcrNoList) {
      const subscribe = await this.categorySubscribeRepository.getCategorySubscribeByCtgrySbcrNo(ctgrySbcrNo);

      if (!subscribe.data) {
        return prismaResponse(false, null, 'NOT_FOUND', MESSAGE.SUBSCRIBE.CATEGORY.NOT_FOUND);
      }
    }

    return this.categorySubscribeRepository.multipleDeleteCategorySubscribe(userNo, deleteData);
  }
}
