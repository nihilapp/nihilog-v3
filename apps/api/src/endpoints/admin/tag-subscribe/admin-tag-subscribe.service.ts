import { Injectable } from '@nestjs/common';
import type { TagSbcrMpng } from '@prisma/client';

import type {
  CreateTagSubscribeDto,
  DeleteTagSubscribeDto,
  SearchTagSubscribeDto,
  UpdateTagSubscribeDto
} from '@/dto/tag-subscribe.dto';
import type { ListType, MultipleResultType, RepoResponseType } from '@/endpoints/prisma/types/common.types';
import type { SelectTagSbcrMpngListItemType } from '@/endpoints/prisma/types/tag-subscribe.types';
import { TagSubscribeRepository } from '@/endpoints/repositories/tag-subscribe.repository';

@Injectable()
export class AdminTagSubscribeService {
  constructor(private readonly tagSubscribeRepository: TagSubscribeRepository) {}

  /**
   * @description 태그 구독 전체 목록 조회
   * @param searchData 검색 데이터
   */
  async adminGetTagSubscribeList(searchData: SearchTagSubscribeDto): Promise<RepoResponseType<ListType<SelectTagSbcrMpngListItemType>> | null> {
    return this.tagSubscribeRepository.getTagSubscribeList(searchData);
  }

  /**
   * @description 태그별 구독자 조회
   * @param tagNo 태그 번호
   * @param searchData 검색 데이터
   */
  async adminGetTagSubscribeByTagNo(
    tagNo: number,
    searchData: SearchTagSubscribeDto
  ): Promise<RepoResponseType<ListType<SelectTagSbcrMpngListItemType>> | null> {
    return this.tagSubscribeRepository.getTagSubscribeByTagNo(tagNo, searchData);
  }

  /**
   * @description 태그 구독 생성
   * @param userNo 사용자 번호
   * @param createData 태그 구독 생성 데이터
   */
  async adminCreateTagSubscribe(
    userNo: number,
    createData: CreateTagSubscribeDto
  ): Promise<RepoResponseType<TagSbcrMpng> | null> {
    return this.tagSubscribeRepository.createTagSubscribe(userNo, createData);
  }

  /**
   * @description 다수 태그 구독 생성
   * @param userNo 사용자 번호
   * @param createData 다수 태그 구독 생성 데이터
   */
  async adminMultipleCreateTagSubscribe(
    userNo: number,
    createData: CreateTagSubscribeDto
  ): Promise<RepoResponseType<MultipleResultType> | null> {
    return this.tagSubscribeRepository.multipleCreateTagSubscribe(userNo, createData);
  }

  /**
   * @description 태그 구독 수정
   * @param userNo 사용자 번호
   * @param updateData 태그 구독 수정 데이터
   */
  async adminUpdateTagSubscribe(
    userNo: number,
    updateData: UpdateTagSubscribeDto
  ): Promise<RepoResponseType<TagSbcrMpng> | null> {
    const subscribe = await this.tagSubscribeRepository.getTagSubscribeByTagSbcrNo(updateData.tagSbcrNo);

    if (!subscribe?.success) {
      return subscribe;
    }

    return this.tagSubscribeRepository.updateTagSubscribe(userNo, updateData);
  }

  /**
   * @description 다수 태그 구독 수정
   * @param userNo 사용자 번호
   * @param updateData 다수 태그 구독 수정 데이터
   */
  async adminMultipleUpdateTagSubscribe(
    userNo: number,
    updateData: UpdateTagSubscribeDto
  ): Promise<RepoResponseType<MultipleResultType> | null> {
    return this.tagSubscribeRepository.multipleUpdateTagSubscribe(userNo, updateData);
  }

  /**
   * @description 태그 구독 삭제
   * @param userNo 사용자 번호
   * @param updateData 태그 구독 삭제 데이터
   */
  async adminDeleteTagSubscribe(
    userNo: number,
    updateData: UpdateTagSubscribeDto
  ): Promise<RepoResponseType<boolean> | null> {
    return this.tagSubscribeRepository.deleteTagSubscribe(userNo, updateData.tagSbcrNo);
  }

  /**
   * @description 다수 태그 구독 삭제
   * @param userNo 사용자 번호
   * @param deleteData 다수 태그 구독 삭제 데이터
   */
  async adminMultipleDeleteTagSubscribe(
    userNo: number,
    deleteData: DeleteTagSubscribeDto
  ): Promise<RepoResponseType<MultipleResultType> | null> {
    return this.tagSubscribeRepository.multipleDeleteTagSubscribe(userNo, deleteData);
  }
}
