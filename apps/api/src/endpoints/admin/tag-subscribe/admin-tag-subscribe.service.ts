import { Injectable } from '@nestjs/common';

import {
  TagSubscribeDto,
  CreateTagSubscribeDto,
  MultipleCreateTagSubscribeDto,
  MultipleDeleteTagSubscribeDto,
  MultipleUpdateTagSubscribeDto,
  SearchTagSubscribeDto,
  UpdateTagSubscribeDto
} from '@/dto/tag-subscribe.dto';
import { ResponseDto } from '@/dto/response.dto';
import { TagSubscribeRepository } from '@/endpoints/repositories/tag-subscribe.repository';
import { createError, createResponse } from '@/utils';

@Injectable()
export class AdminTagSubscribeService {
  constructor(
    private readonly tagSubscribeRepository: TagSubscribeRepository
  ) {}

  /**
   * @description 태그 구독 전체 목록 조회
   * @param searchData 검색 데이터
   */
  async adminGetTagSubscribeList(searchData: SearchTagSubscribeDto): Promise<TagSubscribeDto[]> {
    // TODO: 구현 필요
    const result = await this.tagSubscribeRepository.getTagSubscribeList(searchData);
    return result || [];
  }

  /**
   * @description 태그별 구독자 조회
   * @param tagNo 태그 번호
   * @param searchData 검색 데이터
   */
  async adminGetTagSubscribeByTagNo(tagNo: number, searchData: SearchTagSubscribeDto): Promise<TagSubscribeDto[]> {
    // TODO: 구현 필요
    const result = await this.tagSubscribeRepository.getTagSubscribeByTagNo(tagNo, searchData);
    return result || [];
  }

  /**
   * @description 태그 구독 생성
   * @param userNo 사용자 번호
   * @param createData 태그 구독 생성 데이터
   */
  async adminCreateTagSubscribe(userNo: number, createData: CreateTagSubscribeDto): Promise<ResponseDto<TagSubscribeDto>> {
    try {
      // TODO: 구현 필요
      const result = await this.tagSubscribeRepository.createTagSubscribe(userNo, createData);

      if (!result) {
        return createError('CONFLICT', 'TAG_SUBSCRIBE_CREATE_FAILED');
      }

      return createResponse('SUCCESS', 'ADMIN_TAG_SUBSCRIBE_CREATE_SUCCESS', result);
    }
    catch (error) {
      return createError('INTERNAL_SERVER_ERROR', 'ADMIN_TAG_SUBSCRIBE_CREATE_ERROR');
    }
  }

  /**
   * @description 다수 태그 구독 생성
   * @param userNo 사용자 번호
   * @param createData 다수 태그 구독 생성 데이터
   */
  async adminMultipleCreateTagSubscribe(userNo: number, createData: MultipleCreateTagSubscribeDto): Promise<ResponseDto<TagSubscribeDto[]>> {
    try {
      // TODO: 구현 필요
      const result = await this.tagSubscribeRepository.multipleCreateTagSubscribe(userNo, createData);

      if (!result) {
        return createError('CONFLICT', 'TAG_SUBSCRIBE_MULTIPLE_CREATE_FAILED');
      }

      return createResponse('SUCCESS', 'ADMIN_TAG_SUBSCRIBE_MULTIPLE_CREATE_SUCCESS', result);
    }
    catch (error) {
      return createError('INTERNAL_SERVER_ERROR', 'ADMIN_TAG_SUBSCRIBE_MULTIPLE_CREATE_ERROR');
    }
  }

  /**
   * @description 태그 구독 수정
   * @param userNo 사용자 번호
   * @param tagSbcrNo 태그 구독 번호
   * @param updateData 태그 구독 수정 데이터
   */
  async adminUpdateTagSubscribe(userNo: number, tagSbcrNo: number, updateData: UpdateTagSubscribeDto): Promise<ResponseDto<TagSubscribeDto>> {
    try {
      // TODO: 구현 필요 - 단건 수정 로직

      return createError('NOT_IMPLEMENTED', 'ADMIN_TAG_SUBSCRIBE_UPDATE_NOT_IMPLEMENTED');
    }
    catch (error) {
      return createError('INTERNAL_SERVER_ERROR', 'ADMIN_TAG_SUBSCRIBE_UPDATE_ERROR');
    }
  }

  /**
   * @description 다수 태그 구독 수정
   * @param userNo 사용자 번호
   * @param updateData 다수 태그 구독 수정 데이터
   */
  async adminMultipleUpdateTagSubscribe(userNo: number, updateData: MultipleUpdateTagSubscribeDto): Promise<ResponseDto<TagSubscribeDto[]>> {
    try {
      // TODO: 구현 필요
      const result = await this.tagSubscribeRepository.multipleUpdateTagSubscribe(userNo, updateData);

      if (!result) {
        return createError('NOT_FOUND', 'TAG_SUBSCRIBE_NOT_FOUND');
      }

      return createResponse('SUCCESS', 'ADMIN_TAG_SUBSCRIBE_MULTIPLE_UPDATE_SUCCESS', result);
    }
    catch (error) {
      return createError('INTERNAL_SERVER_ERROR', 'ADMIN_TAG_SUBSCRIBE_MULTIPLE_UPDATE_ERROR');
    }
  }

  /**
   * @description 태그 구독 삭제
   * @param userNo 사용자 번호
   * @param tagSbcrNo 태그 구독 번호
   * @param updateData 태그 구독 삭제 데이터
   */
  async adminDeleteTagSubscribe(userNo: number, tagSbcrNo: number, updateData: UpdateTagSubscribeDto): Promise<ResponseDto<null>> {
    try {
      // TODO: 구현 필요
      const result = await this.tagSubscribeRepository.deleteTagSubscribe(userNo, { ...updateData, tagSbcrNo });

      if (!result) {
        return createError('NOT_FOUND', 'TAG_SUBSCRIBE_NOT_FOUND');
      }

      return createResponse('SUCCESS', 'ADMIN_TAG_SUBSCRIBE_DELETE_SUCCESS', null);
    }
    catch (error) {
      return createError('INTERNAL_SERVER_ERROR', 'ADMIN_TAG_SUBSCRIBE_DELETE_ERROR');
    }
  }

  /**
   * @description 다수 태그 구독 삭제
   * @param userNo 사용자 번호
   * @param deleteData 다수 태그 구독 삭제 데이터
   */
  async adminMultipleDeleteTagSubscribe(userNo: number, deleteData: MultipleDeleteTagSubscribeDto): Promise<ResponseDto<null>> {
    try {
      // TODO: 구현 필요
      const result = await this.tagSubscribeRepository.multipleDeleteTagSubscribe(userNo, deleteData);

      if (!result) {
        return createError('NOT_FOUND', 'TAG_SUBSCRIBE_NOT_FOUND');
      }

      return createResponse('SUCCESS', 'ADMIN_TAG_SUBSCRIBE_MULTIPLE_DELETE_SUCCESS', null);
    }
    catch (error) {
      return createError('INTERNAL_SERVER_ERROR', 'ADMIN_TAG_SUBSCRIBE_MULTIPLE_DELETE_ERROR');
    }
  }
}