import { Injectable } from '@nestjs/common';

import type { CreateTagSubscribeDto, DeleteTagSubscribeDto, SearchTagSubscribeDto, TagSubscribeDto, UpdateTagSubscribeDto } from '@/dto';
import { ResponseDto } from '@/dto/response.dto';
import type { ListType, MultipleResultType } from '@/endpoints/prisma/schemas/response.schema';
import type { SelectTagSbcrMpngListItemType } from '@/endpoints/prisma/types/tag-subscribe.types';
import type { TagSubscribeRepository } from '@/endpoints/repositories/tag-subscribe.repository';
import { createError, createResponse } from '@/utils';
import type { TagSbcrMpng } from '~prisma/client';

@Injectable()
export class TagSubscribeService {
  constructor(private readonly tagSubscribeRepository: TagSubscribeRepository) {}

  /**
   * @description 사용자가 구독한 태그 목록 조회
   * @param searchData 검색 데이터
   */
  async getTagSubscribeList(searchData: SearchTagSubscribeDto & Partial<TagSubscribeDto>): Promise<ListType<SelectTagSbcrMpngListItemType>> {
    const tagSubscribeList = await this.tagSubscribeRepository.getTagSubscribeList(searchData);

    return tagSubscribeList;
  }

  /**
   * @description 특정 사용자 구독 상태 조회
   * @param userNo 사용자 번호
   * @param searchData 검색 데이터
   */
  async getTagSubscribeByUserNo(userNo: number, searchData: SearchTagSubscribeDto & Partial<TagSubscribeDto>): Promise<ListType<SelectTagSbcrMpngListItemType>> {
    const tagSubscribeList = await this.tagSubscribeRepository.getTagSubscribeByUserNo(userNo, searchData);

    return tagSubscribeList;
  }

  /**
   * @description 특정 태그 구독 상태 조회
   * @param tagNo 태그 번호
   * @param searchData 검색 데이터
   */
  async getTagSubscribeByTagNo(tagNo: number, searchData: SearchTagSubscribeDto): Promise<ListType<SelectTagSbcrMpngListItemType>> {
    const tagSubscribeList = await this.tagSubscribeRepository.getTagSubscribeByTagNo(tagNo, searchData);

    return tagSubscribeList;
  }

  /**
   * @description 태그 구독 생성
   * @param userNo 사용자 번호
   * @param createData 태그 구독 생성 데이터
   */
  async createTagSubscribe(userNo: number, createData: CreateTagSubscribeDto): Promise<ResponseDto<TagSbcrMpng>> {
    const createSubscribe = await this.tagSubscribeRepository.createTagSubscribe(userNo, createData);

    if (!createSubscribe) {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'TAG_SUBSCRIBE_CREATE_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'TAG_SUBSCRIBE_CREATE_SUCCESS',
      createSubscribe
    );
  }

  /**
   * @description 태그 구독 목록 생성
   * @param userNo 사용자 번호
   * @param createData 태그 구독 생성 데이터
   */
  async multipleCreateTagSubscribe(userNo: number, createData: CreateTagSubscribeDto): Promise<ResponseDto<TagSbcrMpng[]>> {
    const createSubscribe = await this.tagSubscribeRepository.multipleCreateTagSubscribe(userNo, createData);

    if (!createSubscribe) {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'TAG_SUBSCRIBE_CREATE_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'TAG_SUBSCRIBE_CREATE_SUCCESS',
      createSubscribe
    );
  }

  /**
   * @description 태그 구독 목록 수정
   * @param userNo 사용자 번호
   * @param updateData 태그 구독 수정 데이터
   */
  async multipleUpdateTagSubscribe(userNo: number, updateData: UpdateTagSubscribeDto): Promise<ResponseDto<MultipleResultType>> {
    const updateSubscribe = await this.tagSubscribeRepository.multipleUpdateTagSubscribe(userNo, updateData);

    if (!updateSubscribe) {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'TAG_SUBSCRIBE_UPDATE_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'TAG_SUBSCRIBE_UPDATE_SUCCESS',
      updateSubscribe
    );
  }

  /**
   * @description 태그 구독 삭제
   * @param userNo 사용자 번호
   * @param tagSbcrNo 태그 구독 번호
   */
  async deleteTagSubscribe(userNo: number, tagSbcrNo: number): Promise<ResponseDto<boolean>> {
    const deleteSubscribe = await this.tagSubscribeRepository.deleteTagSubscribeByTagSbcrNo(userNo, tagSbcrNo);

    if (!deleteSubscribe) {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'TAG_SUBSCRIBE_DELETE_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'TAG_SUBSCRIBE_DELETE_SUCCESS',
      deleteSubscribe
    );
  }

  /**
   * @description 태그 구독 목록 삭제
   * @param userNo 사용자 번호
   * @param deleteData 다수 태그 구독 삭제 데이터
   */
  async multipleDeleteTagSubscribe(userNo: number, deleteData: DeleteTagSubscribeDto): Promise<ResponseDto<MultipleResultType>> {
    const deleteSubscribe = await this.tagSubscribeRepository.multipleDeleteTagSubscribe(userNo, deleteData);

    if (!deleteSubscribe) {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'TAG_SUBSCRIBE_DELETE_ERROR'
      );
    }

    return createResponse(
      'SUCCESS',
      'TAG_SUBSCRIBE_DELETE_SUCCESS',
      deleteSubscribe
    );
  }
}
