import { Injectable } from '@nestjs/common';

import { ResponseDto } from '@/dto/response.dto';
import {
  CreateSubscribeDto,
  UpdateSubscribeDto,
  UserSubscribeDto
} from '@/dto/subscribe.dto';
import type { SubscribeRepository } from '@/endpoints/repositories/subscribe.repository';
import { createError, createResponse } from '@/utils';

@Injectable()
export class AdminSubscribeService {
  constructor(private readonly subscribeRepository: SubscribeRepository) {}

  /**
   * @description 전체 사용자 구독 설정 목록 조회
   */
  async adminGetUserSubscribeList(): Promise<UserSubscribeDto[]> {
    const subscribeList = await this.subscribeRepository.getSubscribeList();

    return subscribeList;
  }

  /**
   * @description 관리자가 특정 사용자 구독 설정 생성
   * @param adminNo 관리자 번호
   * @param createData 구독 설정 생성 정보
   */
  async adminCreateUserSubscribe(
    adminNo: number,
    createData: CreateSubscribeDto
  ): Promise<ResponseDto<UserSubscribeDto>> {
    const newSubscribe = await this.subscribeRepository.createUserSubscribe(adminNo, createData);

    if (!newSubscribe) {
      return createError('BAD_REQUEST', 'ADMIN_SUBSCRIBE_CREATE_ERROR');
    }

    return createResponse('SUCCESS', 'ADMIN_SUBSCRIBE_CREATE_SUCCESS', newSubscribe);
  }

  /**
   * @description 다수 사용자 구독 설정 일괄 변경
   * @param adminNo 관리자 번호
   * @param updateData 구독 설정 일괄 수정 데이터
   */
  async adminMultipleUpdateUserSubscribe(adminNo: number, updateData: UpdateSubscribeDto): Promise<ResponseDto<UserSubscribeDto>> {
    const updatedSubscribes = await this.subscribeRepository.multipleUpdateUserSubscribe(adminNo, updateData);

    if (!updatedSubscribes) {
      return createError('BAD_REQUEST', 'ADMIN_SUBSCRIBE_MULTIPLE_UPDATE_ERROR');
    }

    return createResponse('SUCCESS', 'ADMIN_SUBSCRIBE_MULTIPLE_UPDATE_SUCCESS', updatedSubscribes);
  }

  /**
   * @description 특정 사용자 구독 설정 삭제
   * @param adminNo 관리자 번호
   * @param userNo 사용자 번호
   */
  async adminDeleteUserSubscribe(adminNo: number, userNo: number): Promise<ResponseDto<null>> {
    const deletedSubscribe = await this.subscribeRepository.deleteUserSubscribe(adminNo, userNo);

    if (!deletedSubscribe) {
      return createError('BAD_REQUEST', 'ADMIN_SUBSCRIBE_DELETE_ERROR');
    }

    return createResponse('SUCCESS', 'ADMIN_SUBSCRIBE_DELETE_SUCCESS', null);
  }

  /**
   * @description 다수 사용자 구독 설정 일괄 삭제
   * @param adminNo 관리자 번호
   * @param deleteData 사용자 번호 목록
   */
  async adminMultipleDeleteUserSubscribe(adminNo: number, deleteData: { userNoList: number[] }): Promise<ResponseDto<null>> {
    const deletedSubscribes = await this.subscribeRepository.multipleDeleteUserSubscribe(adminNo, deleteData.userNoList);

    if (!deletedSubscribes) {
      return createError('BAD_REQUEST', 'ADMIN_SUBSCRIBE_MULTIPLE_DELETE_ERROR');
    }

    return createResponse('SUCCESS', 'ADMIN_SUBSCRIBE_MULTIPLE_DELETE_SUCCESS', null);
  }
}
