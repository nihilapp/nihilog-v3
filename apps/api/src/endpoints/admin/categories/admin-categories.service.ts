import { Injectable } from '@nestjs/common';

import type { CreateCategoryDto, DeleteCategoryDto, SearchCategoryDto, UpdateCategoryDto } from '@/dto/category.dto';
import type { SelectCategoryListItemType, SelectCategoryType } from '@/endpoints/prisma/types/category.types';
import type { ListType, MultipleResultType, RepoResponseType } from '@/endpoints/prisma/types/common.types';
import { CategoryRepository } from '@/endpoints/repositories/category.repository';

@Injectable()
export class AdminCategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) { }

  /**
   * @description 카테고리 목록 조회
   * @param searchData 검색 데이터
   */
  async adminGetCategoryList(searchData: SearchCategoryDto): Promise<RepoResponseType<ListType<SelectCategoryListItemType>> | null> {
    return this.categoryRepository.getCategoryList(searchData);
  }

  /**
   * @description 카테고리 번호로 카테고리 조회
   * @param ctgryNo 카테고리 번호
   */
  async adminGetCategoryByCtgryNo(ctgryNo: number): Promise<RepoResponseType<SelectCategoryType> | null> {
    return this.categoryRepository.getCategoryByCtgryNo(ctgryNo);
  }

  /**
   * @description 카테고리명으로 카테고리 조회
   * @param ctgryNm 카테고리명
   */
  async adminGetCategoryByCtgryNm(ctgryNm: string): Promise<RepoResponseType<SelectCategoryType> | null> {
    return this.categoryRepository.getCategoryByCtgryNm(ctgryNm);
  }

  /**
   * @description 카테고리 생성
   * @param createData 카테고리 생성 데이터
   */
  async adminCreateCategory(createData: CreateCategoryDto): Promise<RepoResponseType<SelectCategoryType> | null> {
    // TODO: 관리자 권한 확인 로직 추가
    const adminUserNo = 1; // 임시 관리자 번호
    return this.categoryRepository.createCategory(adminUserNo, createData);
  }

  /**
   * @description 다수 카테고리 생성
   * @param createData 카테고리 생성 데이터
   */
  async adminMultipleCreateCategory(createData: CreateCategoryDto[]): Promise<RepoResponseType<MultipleResultType> | null> {
    // TODO: 관리자 권한 확인 로직 추가
    const adminUserNo = 1; // 임시 관리자 번호
    return this.categoryRepository.multipleCreateCategory(adminUserNo, createData);
  }

  /**
   * @description 카테고리 수정
   * @param ctgryNo 카테고리 번호
   * @param updateData 카테고리 수정 데이터
   */
  async adminUpdateCategory(ctgryNo: number, updateData: UpdateCategoryDto): Promise<RepoResponseType<SelectCategoryType> | null> {
    // TODO: 관리자 권한 확인 로직 추가
    const adminUserNo = 1; // 임시 관리자 번호
    return this.categoryRepository.updateCategory(adminUserNo, { ...updateData, ctgryNo, });
  }

  /**
   * @description 다수 카테고리 수정
   * @param updateData 카테고리 수정 데이터
   */
  async adminMultipleUpdateCategory(updateData: UpdateCategoryDto & { ctgryNoList: number[] }): Promise<RepoResponseType<MultipleResultType> | null> {
    // TODO: 관리자 권한 확인 로직 추가
    const adminUserNo = 1; // 임시 관리자 번호
    return this.categoryRepository.multipleUpdateCategory(adminUserNo, updateData);
  }

  /**
   * @description 카테고리 삭제
   * @param ctgryNo 카테고리 번호
   */
  async adminDeleteCategory(ctgryNo: number): Promise<RepoResponseType<boolean> | null> {
    // TODO: 관리자 권한 확인 로직 추가
    const adminUserNo = 1; // 임시 관리자 번호
    return this.categoryRepository.deleteCategory(adminUserNo, { ctgryNo, });
  }

  /**
   * @description 다수 카테고리 삭제
   * @param deleteData 카테고리 삭제 데이터
   */
  async adminMultipleDeleteCategory(deleteData: DeleteCategoryDto): Promise<RepoResponseType<MultipleResultType> | null> {
    // TODO: 관리자 권한 확인 로직 추가
    const adminUserNo = 1; // 임시 관리자 번호
    return this.categoryRepository.multipleDeleteCategory(adminUserNo, deleteData);
  }
}
