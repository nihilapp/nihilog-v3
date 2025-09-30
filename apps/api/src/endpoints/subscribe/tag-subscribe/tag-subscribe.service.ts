import { Injectable } from '@nestjs/common';

import { ResponseDto } from '@/dto/response.dto';
import { TagSubscribeRepository } from '@/endpoints/repositories/tag-subscribe.repository';
import { createError, createResponse } from '@/utils';

@Injectable()
export class TagSubscribeService {
  constructor(private readonly tagSubscribeRepository: TagSubscribeRepository) {}

  /**
   * @description 사용자가 구독한 태그 목록 조회
   * @param userNo 사용자 번호
   */
  async getTagSubscribeList(userNo: number): Promise<ResponseDto<any[]>> {
    try {
      // TODO: 구현 필요 - 사용자 구독 태그 목록 조회 로직
      const result = await this.tagSubscribeRepository.getTagSubscribeListByUserNo(userNo);

      return createResponse('SUCCESS', 'TAG_SUBSCRIBE_LIST_SUCCESS', result);
    }
    catch (error) {
      return createError('INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_LIST_ERROR');
    }
  }

  /**
   * @description 특정 태그 구독 상태 조회
   * @param userNo 사용자 번호
   * @param tagNo 태그 번호
   */
  async getTagSubscribeByTagNo(userNo: number, tagNo: number): Promise<ResponseDto<any>> {
    try {
      // TODO: 구현 필요 - 특정 태그 구독 상태 조회 로직
      const result = await this.tagSubscribeRepository.getTagSubscribeByTagNo(userNo, tagNo);

      return createResponse('SUCCESS', 'TAG_SUBSCRIBE_GET_SUCCESS', result);
    }
    catch (error) {
      return createError('INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_GET_ERROR');
    }
  }

  /**
   * @description 특정 태그 구독 설정
   * @param userNo 사용자 번호
   * @param tagNo 태그 번호
   */
  async createTagSubscribe(userNo: number, tagNo: number): Promise<ResponseDto<any>> {
    try {
      // TODO: 구현 필요 - 태그 구독 설정 로직
      const result = await this.tagSubscribeRepository.createTagSubscribe(userNo, tagNo);

      if (!result) {
        return createError('CONFLICT', 'TAG_SUBSCRIBE_ALREADY_EXISTS');
      }

      return createResponse('SUCCESS', 'TAG_SUBSCRIBE_CREATE_SUCCESS', result);
    }
    catch (error) {
      return createError('INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_CREATE_ERROR');
    }
  }

  /**
   * @description 다수 태그 구독 설정
   * @param userNo 사용자 번호
   * @param createData 다수 태그 구독 생성 데이터
   */
  async multipleCreateTagSubscribe(userNo: number, createData: any): Promise<ResponseDto<any[]>> {
    try {
      // TODO: 구현 필요 - 다수 태그 구독 설정 로직
      const result = await this.tagSubscribeRepository.multipleCreateTagSubscribe(userNo, createData);

      if (!result) {
        return createError('CONFLICT', 'TAG_SUBSCRIBE_MULTIPLE_CREATE_FAILED');
      }

      return createResponse('SUCCESS', 'TAG_SUBSCRIBE_MULTIPLE_CREATE_SUCCESS', result);
    }
    catch (error) {
      return createError('INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_MULTIPLE_CREATE_ERROR');
    }
  }

  /**
   * @description 다수 태그 구독 설정 변경
   * @param userNo 사용자 번호
   * @param updateData 다수 태그 구독 변경 데이터
   */
  async multipleUpdateTagSubscribe(userNo: number, updateData: any): Promise<ResponseDto<any[]>> {
    try {
      // TODO: 구현 필요 - 다수 태그 구독 설정 변경 로직
      const result = await this.tagSubscribeRepository.multipleUpdateTagSubscribe(userNo, updateData);

      if (!result) {
        return createError('NOT_FOUND', 'TAG_SUBSCRIBE_NOT_FOUND');
      }

      return createResponse('SUCCESS', 'TAG_SUBSCRIBE_MULTIPLE_UPDATE_SUCCESS', result);
    }
    catch (error) {
      return createError('INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_MULTIPLE_UPDATE_ERROR');
    }
  }

  /**
   * @description 특정 태그 구독 해제
   * @param userNo 사용자 번호
   * @param tagNo 태그 번호
   */
  async deleteTagSubscribe(userNo: number, tagNo: number): Promise<ResponseDto<any>> {
    try {
      // TODO: 구현 필요 - 태그 구독 해제 로직
      const result = await this.tagSubscribeRepository.deleteTagSubscribe(userNo, tagNo);

      if (!result) {
        return createError('NOT_FOUND', 'TAG_SUBSCRIBE_NOT_FOUND');
      }

      return createResponse('SUCCESS', 'TAG_SUBSCRIBE_DELETE_SUCCESS', result);
    }
    catch (error) {
      return createError('INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_DELETE_ERROR');
    }
  }

  /**
   * @description 다수 태그 구독 해제
   * @param userNo 사용자 번호
   * @param deleteData 다수 태그 구독 해제 데이터
   */
  async multipleDeleteTagSubscribe(userNo: number, deleteData: any): Promise<ResponseDto<any>> {
    try {
      // TODO: 구현 필요 - 다수 태그 구독 해제 로직
      const result = await this.tagSubscribeRepository.multipleDeleteTagSubscribe(userNo, deleteData);

      if (!result) {
        return createError('NOT_FOUND', 'TAG_SUBSCRIBE_NOT_FOUND');
      }

      return createResponse('SUCCESS', 'TAG_SUBSCRIBE_MULTIPLE_DELETE_SUCCESS', result);
    }
    catch (error) {
      return createError('INTERNAL_SERVER_ERROR', 'TAG_SUBSCRIBE_MULTIPLE_DELETE_ERROR');
    }
  }
}
