import { Injectable } from '@nestjs/common';

import type { CreateTagSubscribeDto, DeleteTagSubscribeDto, SearchTagSubscribeDto, UpdateTagSubscribeDto } from '@/dto';
import type { ListType, MultipleResultType, RepoResponseType } from '@/endpoints/prisma/types/common.types';
import type { SelectTagSbcrMpngListItemType, SelectTagSbcrMpngType } from '@/endpoints/prisma/types/tag-subscribe.types';
import { TagSubscribeRepository } from '@/endpoints/repositories/tag-subscribe.repository';

@Injectable()
export class TagSubscribeService {
  constructor(private readonly tagSubscribeRepository: TagSubscribeRepository) {}

  /**
   * @description 사용자가 구독한 태그 목록 조회
   * @param searchData 검색 데이터
   */
  async getTagSubscribeList(searchData: SearchTagSubscribeDto): Promise<RepoResponseType<ListType<SelectTagSbcrMpngListItemType>> | null> {
    return this.tagSubscribeRepository.getTagSubscribeList(searchData);
  }

  /**
   * @description 특정 사용자 구독 상태 조회
   * @param userNo 사용자 번호
   * @param searchData 검색 데이터
   */
  async getTagSubscribeByUserNo(userNo: number, searchData: SearchTagSubscribeDto): Promise<RepoResponseType<ListType<SelectTagSbcrMpngListItemType>> | null> {
    return this.tagSubscribeRepository.getTagSubscribeByUserNo(userNo, searchData);
  }

  /**
   * @description 특정 태그 구독 상태 조회
   * @param tagNo 태그 번호
   * @param searchData 검색 데이터
   */
  async getTagSubscribeByTagNo(tagNo: number, searchData: SearchTagSubscribeDto): Promise<RepoResponseType<ListType<SelectTagSbcrMpngListItemType>> | null> {
    return this.tagSubscribeRepository.getTagSubscribeByTagNo(tagNo, searchData);
  }

  /**
   * @description 태그 구독 생성
   * @param userNo 사용자 번호
   * @param createData 태그 구독 생성 데이터
   */
  async createTagSubscribe(userNo: number, createData: CreateTagSubscribeDto): Promise<RepoResponseType<SelectTagSbcrMpngType> | null> {
    return this.tagSubscribeRepository.createTagSubscribe(userNo, createData);
  }

  /**
   * @description 태그 구독 목록 생성
   * @param userNo 사용자 번호
   * @param createData 태그 구독 생성 데이터
   */
  async multipleCreateTagSubscribe(userNo: number, createData: CreateTagSubscribeDto): Promise<RepoResponseType<MultipleResultType> | null> {
    return this.tagSubscribeRepository.multipleCreateTagSubscribe(userNo, createData);
  }

  /**
   * @description 태그 구독 목록 수정
   * @param userNo 사용자 번호
   * @param updateData 태그 구독 수정 데이터
   */
  async multipleUpdateTagSubscribe(userNo: number, updateData: UpdateTagSubscribeDto): Promise<RepoResponseType<MultipleResultType> | null> {
    return this.tagSubscribeRepository.multipleUpdateTagSubscribe(userNo, updateData);
  }

  /**
   * @description 태그 구독 삭제
   * @param userNo 사용자 번호
   * @param tagSbcrNo 태그 구독 번호
   */
  async deleteTagSubscribe(userNo: number, tagSbcrNo: number): Promise<RepoResponseType<boolean> | null> {
    return this.tagSubscribeRepository.deleteTagSubscribe(userNo, tagSbcrNo);
  }

  /**
   * @description 태그 구독 목록 삭제
   * @param userNo 사용자 번호
   * @param deleteData 다수 태그 구독 삭제 데이터
   */
  async multipleDeleteTagSubscribe(userNo: number, deleteData: DeleteTagSubscribeDto): Promise<RepoResponseType<MultipleResultType> | null> {
    return this.tagSubscribeRepository.multipleDeleteTagSubscribe(userNo, deleteData);
  }
}
