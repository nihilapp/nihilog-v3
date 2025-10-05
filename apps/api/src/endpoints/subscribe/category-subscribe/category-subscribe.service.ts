import { Injectable } from '@nestjs/common';

import type { CreateCategorySubscribeDto, DeleteCategorySubscribeDto, SearchCategorySubscribeDto, UpdateCategorySubscribeDto } from '@/dto';
import type { SelectCtgrySbcrMpngListItemType, SelectCtgrySbcrMpngType } from '@/endpoints/prisma/types/category-subscribe.types';
import type { ListType, MultipleResultType, RepoResponseType } from '@/endpoints/prisma/types/common.types';
import type { CategorySubscribeRepository } from '@/endpoints/repositories/category-subscribe.repository';

@Injectable()
export class CategorySubscribeService {
  constructor(private readonly categorySubscribeRepository: CategorySubscribeRepository) {}

  /**
   * @description 사용자가 구독한 카테고리 목록 조회
   * @param searchData 검색 데이터
   */
  async getCategorySubscribeList(searchData: SearchCategorySubscribeDto): Promise<RepoResponseType<ListType<SelectCtgrySbcrMpngListItemType>> | null> {
    return this.categorySubscribeRepository.getCategorySubscribeList(searchData);
  }

  /**
   * @description 특정 사용자 구독 상태 조회
   * @param userNo 사용자 번호
   * @param searchData 검색 데이터
   */
  async getCategorySubscribeByUserNo(userNo: number, searchData: SearchCategorySubscribeDto): Promise<RepoResponseType<ListType<SelectCtgrySbcrMpngListItemType>> | null> {
    return this.categorySubscribeRepository.getCategorySubscribeByUserNo(userNo, searchData);
  }

  /**
   * @description 특정 카테고리 구독 상태 조회
   * @param ctgryNo 카테고리 번호
   * @param searchData 검색 데이터
   */
  async getCategorySubscribeByCtgryNo(ctgryNo: number, searchData: SearchCategorySubscribeDto): Promise<RepoResponseType<ListType<SelectCtgrySbcrMpngListItemType>> | null> {
    return this.categorySubscribeRepository.getCategorySubscribeByCtgryNo(ctgryNo, searchData);
  }

  /**
   * @description 카테고리 구독 생성
   * @param userNo 사용자 번호
   * @param createData 카테고리 구독 생성 데이터
   */
  async createCategorySubscribe(userNo: number, createData: CreateCategorySubscribeDto): Promise<RepoResponseType<SelectCtgrySbcrMpngType> | null> {
    return this.categorySubscribeRepository.createCategorySubscribe(userNo, createData);
  }

  /**
   * @description 카테고리 구독 목록 생성
   * @param userNo 사용자 번호
   * @param createData 카테고리 구독 생성 데이터
   */
  async multipleCreateCategorySubscribe(userNo: number, createData: CreateCategorySubscribeDto): Promise<RepoResponseType<MultipleResultType> | null> {
    return this.categorySubscribeRepository.multipleCreateCategorySubscribe(userNo, createData);
  }

  /**
   * @description 카테고리 구독 목록 수정
   * @param userNo 사용자 번호
   * @param updateData 카테고리 구독 수정 데이터
   */
  async multipleUpdateCategorySubscribe(userNo: number, updateData: UpdateCategorySubscribeDto): Promise<RepoResponseType<MultipleResultType> | null> {
    return this.categorySubscribeRepository.multipleUpdateCategorySubscribe(userNo, updateData);
  }

  /**
   * @description 카테고리 구독 삭제
   * @param userNo 사용자 번호
   * @param ctgrySbcrNo 카테고리 구독 번호
   */
  async deleteCategorySubscribe(userNo: number, ctgrySbcrNo: number): Promise<RepoResponseType<boolean> | null> {
    return this.categorySubscribeRepository.deleteCategorySubscribe(userNo, ctgrySbcrNo);
  }

  /**
   * @description 카테고리 구독 목록 삭제
   * @param userNo 사용자 번호
   * @param deleteData 삭제할 카테고리 구독 데이터
   */
  async multipleDeleteCategorySubscribe(userNo: number, deleteData: DeleteCategorySubscribeDto): Promise<RepoResponseType<MultipleResultType> | null> {
    return this.categorySubscribeRepository.multipleDeleteCategorySubscribe(userNo, deleteData);
  }
}
