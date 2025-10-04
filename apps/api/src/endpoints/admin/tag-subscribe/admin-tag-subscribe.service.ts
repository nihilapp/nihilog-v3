import { Injectable } from '@nestjs/common';
import type { TagSbcrMpng } from '@prisma/client';

import type {
  CreateTagSubscribeDto,
  DeleteTagSubscribeDto,
  SearchTagSubscribeDto,
  TagSubscribeDto,
  UpdateTagSubscribeDto
} from '@/dto/tag-subscribe.dto';
import type { ListType, MultipleResultType } from '@/endpoints/prisma/types/common.types';
import type { SelectTagSbcrMpngListItemType } from '@/endpoints/prisma/types/tag-subscribe.types';
import { TagSubscribeRepository } from '@/endpoints/repositories/tag-subscribe.repository';

@Injectable()
export class AdminTagSubscribeService {
  constructor(private readonly tagSubscribeRepository: TagSubscribeRepository) {}

  /**
   * @description 태그 구독 전체 목록 조회
   * @param searchData 검색 데이터
   */
  async adminGetTagSubscribeList(searchData: SearchTagSubscribeDto & Partial<TagSubscribeDto>): Promise<ListType<SelectTagSbcrMpngListItemType>> {
    const result = await this.tagSubscribeRepository
      .getTagSubscribeList(searchData);

    return result;
  }

  /**
   * @description 태그별 구독자 조회
   * @param tagNo 태그 번호
   * @param searchData 검색 데이터
   */
  async adminGetTagSubscribeByTagNo(
    tagNo: number,
    searchData: SearchTagSubscribeDto & Partial<TagSubscribeDto>
  ): Promise<ListType<SelectTagSbcrMpngListItemType>> {
    const result = await this.tagSubscribeRepository
      .getTagSubscribeByTagNo(tagNo, searchData);

    return result;
  }

  /**
   * @description 태그 구독 생성
   * @param userNo 사용자 번호
   * @param createData 태그 구독 생성 데이터
   */
  async adminCreateTagSubscribe(
    userNo: number,
    createData: CreateTagSubscribeDto
  ): Promise<TagSbcrMpng | null> {
    try {
      return this.tagSubscribeRepository.createTagSubscribe(userNo, createData);
    }
    catch {
      return null;
    }
  }

  /**
   * @description 다수 태그 구독 생성
   * @param userNo 사용자 번호
   * @param createData 다수 태그 구독 생성 데이터
   */
  async adminMultipleCreateTagSubscribe(
    userNo: number,
    createData: CreateTagSubscribeDto
  ): Promise<MultipleResultType | null> {
    try {
      return this.tagSubscribeRepository.multipleCreateTagSubscribe(userNo, createData);
    }
    catch {
      return null;
    }
  }

  /**
   * @description 태그 구독 수정
   * @param userNo 사용자 번호
   * @param updateData 태그 구독 수정 데이터
   */
  async adminUpdateTagSubscribe(
    userNo: number,
    updateData: UpdateTagSubscribeDto
  ): Promise<TagSbcrMpng | null> {
    try {
      const subscribe = await this.tagSubscribeRepository.getTagSubscribeByTagSbcrNo(updateData.tagSbcrNo);

      if (!subscribe) {
        return null;
      }

      return this.tagSubscribeRepository.updateTagSubscribe(userNo, updateData);
    }
    catch {
      return null;
    }
  }

  /**
   * @description 다수 태그 구독 수정
   * @param userNo 사용자 번호
   * @param updateData 다수 태그 구독 수정 데이터
   */
  async adminMultipleUpdateTagSubscribe(
    userNo: number,
    updateData: UpdateTagSubscribeDto
  ): Promise<MultipleResultType | null> {
    try {
      return this.tagSubscribeRepository.multipleUpdateTagSubscribe(userNo, updateData);
    }
    catch {
      return null;
    }
  }

  /**
   * @description 태그 구독 삭제
   * @param userNo 사용자 번호
   * @param updateData 태그 구독 삭제 데이터
   */
  async adminDeleteTagSubscribe(
    userNo: number,
    updateData: UpdateTagSubscribeDto
  ): Promise<boolean> {
    try {
      return this.tagSubscribeRepository.deleteTagSubscribe(userNo, updateData.tagSbcrNo);
    }
    catch {
      return false;
    }
  }

  /**
   * @description 다수 태그 구독 삭제
   * @param userNo 사용자 번호
   * @param deleteData 다수 태그 구독 삭제 데이터
   */
  async adminMultipleDeleteTagSubscribe(
    userNo: number,
    deleteData: DeleteTagSubscribeDto
  ): Promise<MultipleResultType | null> {
    try {
      return this.tagSubscribeRepository.multipleDeleteTagSubscribe(userNo, deleteData);
    }
    catch {
      return null;
    }
  }
}
