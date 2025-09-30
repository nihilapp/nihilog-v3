import { Injectable } from '@nestjs/common';

import type { TagSubscribeDto, CreateTagSubscribeDto, ListDto, MultipleCreateTagSubscribeDto, MultipleDeleteTagSubscribeDto, MultipleUpdateTagSubscribeDto, MutationResponseDto, SearchTagSubscribeDto } from '@/dto';
import { ResponseDto } from '@/dto/response.dto';
import type { TagSubscribeRepository } from '@/endpoints/repositories/tag-subscribe.repository';
import { createError, createResponse } from '@/utils';

@Injectable()
export class TagSubscribeService {
  constructor(private readonly tagSubscribeRepository: TagSubscribeRepository) {}

  /**
   * @description 사용자가 구독한 태그 목록 조회
   * @param searchData 검색 데이터
   */
  async getTagSubscribeList(searchData: SearchTagSubscribeDto & Partial<TagSubscribeDto>): Promise<ListDto<TagSubscribeDto>> {
    const tagSubscribeList = await this.tagSubscribeRepository.getTagSubscribeList(searchData);

    return tagSubscribeList;
  }

  /**
   * @description 특정 사용자 구독 상태 조회
   * @param userNo 사용자 번호
   * @param searchData 검색 데이터
   */
  async getTagSubscribeByUserNo(userNo: number, searchData: SearchTagSubscribeDto & Partial<TagSubscribeDto>): Promise<ListDto<TagSubscribeDto>> {
    const tagSubscribeList = await this.tagSubscribeRepository.getTagSubscribeByUserNo(userNo, searchData);

    return tagSubscribeList;
  }

  /**
   * @description 특정 태그 구독 상태 조회
   * @param tagNo 태그 번호
   * @param searchData 검색 데이터
   */
  async getTagSubscribeByTagNo(tagNo: number, searchData: SearchTagSubscribeDto): Promise<ListDto<TagSubscribeDto>> {
    const tagSubscribeList = await this.tagSubscribeRepository.getTagSubscribeByTagNo(tagNo, searchData);

    return tagSubscribeList;
  }

  /**
   * @description 태그 구독 생성
   * @param userNo 사용자 번호
   * @param createData 태그 구독 생성 데이터
   */
  async createTagSubscribe(userNo: number, createData: CreateTagSubscribeDto): Promise<ResponseDto<TagSubscribeDto>> {
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
  async multipleCreateTagSubscribe(userNo: number, createData: MultipleCreateTagSubscribeDto): Promise<ResponseDto<TagSubscribeDto[]>> {
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
  async multipleUpdateTagSubscribe(userNo: number, updateData: MultipleUpdateTagSubscribeDto): Promise<ResponseDto<TagSubscribeDto[]>> {
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
  async deleteTagSubscribe(userNo: number, tagSbcrNo: number): Promise<ResponseDto<MutationResponseDto>> {
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
  async multipleDeleteTagSubscribe(userNo: number, deleteData: MultipleDeleteTagSubscribeDto): Promise<ResponseDto<MutationResponseDto>> {
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
