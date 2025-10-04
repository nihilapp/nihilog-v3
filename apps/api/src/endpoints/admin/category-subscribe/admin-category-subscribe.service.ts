import { Injectable } from '@nestjs/common';
import type { CtgrySbcrMpng } from '@prisma/client';

import type {
  CreateCategorySubscribeDto,
  DeleteCategorySubscribeDto,
  SearchCategorySubscribeDto,
  UpdateCategorySubscribeDto
} from '@/dto/category-subscribe.dto';
import type { SelectCtgrySbcrMpngListItemType } from '@/endpoints/prisma/types/category-subscribe.types';
import type { ListType, MultipleResultType } from '@/endpoints/prisma/types/common.types';
import { CategorySubscribeRepository } from '@/endpoints/repositories/category-subscribe.repository';

@Injectable()
export class AdminCategorySubscribeService {
  constructor(private readonly categorySubscribeRepository: CategorySubscribeRepository) {}

  /**
   * @description 카테고리 구독 전체 목록 조회
   * @param searchData 검색 데이터
   */
  async adminGetCategorySubscribeList(searchData: SearchCategorySubscribeDto): Promise<ListType<SelectCtgrySbcrMpngListItemType>> {
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
  ): Promise<ListType<SelectCtgrySbcrMpngListItemType>> {
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
  ): Promise<CtgrySbcrMpng | null> {
    try {
      return this.categorySubscribeRepository.createCategorySubscribe(userNo, createData);
    }
    catch {
      return null;
    }
  }

  /**
   * @description 다수 카테고리 구독 생성
   * @param userNo 사용자 번호
   * @param createData 다수 카테고리 구독 생성 데이터
   */
  async adminMultipleCreateCategorySubscribe(
    userNo: number,
    createData: CreateCategorySubscribeDto
  ): Promise<MultipleResultType | null> {
    try {
      return this.categorySubscribeRepository.multipleCreateCategorySubscribe(userNo, createData);
    }
    catch {
      return null;
    }
  }

  /**
   * @description 카테고리 구독 수정
   * @param userNo 사용자 번호
   * @param updateData 카테고리 구독 수정 데이터
   */
  async adminUpdateCategorySubscribe(
    userNo: number,
    updateData: UpdateCategorySubscribeDto
  ): Promise<CtgrySbcrMpng | null> {
    try {
      const subscribe = await this.categorySubscribeRepository.getCategorySubscribeByCtgrySbcrNo(updateData.ctgrySbcrNo);

      if (!subscribe) {
        return null;
      }

      return this.categorySubscribeRepository.updateCategorySubscribe(userNo, updateData);
    }
    catch {
      return null;
    }
  }

  /**
   * @description 다수 카테고리 구독 수정
   * @param userNo 사용자 번호
   * @param updateData 다수 카테고리 구독 수정 데이터
   */
  async adminMultipleUpdateCategorySubscribe(
    userNo: number,
    updateData: UpdateCategorySubscribeDto
  ): Promise<MultipleResultType | null> {
    try {
      return this.categorySubscribeRepository.multipleUpdateCategorySubscribe(userNo, updateData);
    }
    catch {
      return null;
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
  ): Promise<boolean> {
    try {
      return this.categorySubscribeRepository.deleteCategorySubscribe(userNo, updateData.ctgrySbcrNo);
    }
    catch {
      return false;
    }
  }

  /**
   * @description 다수 카테고리 구독 삭제
   * @param userNo 사용자 번호
   * @param deleteData 다수 카테고리 구독 삭제 데이터
   */
  async adminMultipleDeleteCategorySubscribe(
    userNo: number,
    deleteData: DeleteCategorySubscribeDto
  ): Promise<MultipleResultType | null> {
    try {
      return this.categorySubscribeRepository.multipleDeleteCategorySubscribe(userNo, deleteData);
    }
    catch {
      return null;
    }
  }
}
