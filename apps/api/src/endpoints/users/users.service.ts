import { Injectable } from '@nestjs/common';

import type { ResponseDto } from '@/dto';
import type { UserSubscriptionDto, UpdateSubscriptionDto } from '@/dto/subscription.dto';
import { UpdateUserDto } from '@/dto/user.dto';
import type { JwtPayload } from '@/endpoints/auth/jwt.strategy';
import { createError, createResponse } from '@/utils';
import type { UserRepository } from '@repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  async getProfile(user: JwtPayload) {
    const findUser = await this.userRepository.getUserByNo(user.userNo);

    if (!findUser) {
      return createError('NOT_FOUND', 'USER_NOT_FOUND');
    }

    return createResponse(
      'SUCCESS',
      'PROFILE_GET_SUCCESS',
      findUser
    );
  }

  async getSubscription(user: JwtPayload): Promise<ResponseDto<UserSubscriptionDto>> {
    const findUser = await this.userRepository.getUserByNo(user.userNo);

    // 사용자가 존재하지 않으면 에러
    if (!findUser) {
      return createError('NOT_FOUND', 'USER_NOT_FOUND');
    }

    // TODO: 구독 정보 조회 로직 구현 예정
    return createResponse(
      'SUCCESS',
      'SUBSCRIPTION_FETCH_SUCCESS',
      null as any // 임시로 null 반환
    );
  }

  async updateProfile(user: JwtPayload, updateData: UpdateUserDto) {
    const findUser = await this.userRepository.getUserByNo(user.userNo);

    if (!findUser) {
      return createError('NOT_FOUND', 'USER_NOT_FOUND');
    }

    const updatedUser = await this.userRepository.updateUser(user.userNo, updateData);

    if (!updatedUser) {
      return createError('INTERNAL_SERVER_ERROR', 'USER_UPDATE_ERROR');
    }

    return createResponse(
      'SUCCESS',
      'USER_UPDATE_SUCCESS',
      updatedUser
    );
  }

  async updateSubscription(user: JwtPayload, updateData: UpdateSubscriptionDto): Promise<ResponseDto<UserSubscriptionDto>> {
    const findUser = await this.userRepository.getUserByNo(user.userNo);

    // 사용자가 존재하지 않으면 에러
    if (!findUser) {
      return createError('NOT_FOUND', 'USER_NOT_FOUND');
    }

    // TODO: 구독 정보 수정 로직 구현 예정
    return createResponse(
      'SUCCESS',
      'SUBSCRIPTION_UPDATE_SUCCESS',
      null as any // 임시로 null 반환
    );
  }

  async deleteProfile(user: JwtPayload) {
    const findUser = await this.userRepository.getUserByNo(user.userNo);

    if (!findUser) {
      return createError('NOT_FOUND', 'USER_NOT_FOUND');
    }

    const deletedUser = await this.userRepository.deleteUser(user.userNo);

    if (!deletedUser) {
      return createError('INTERNAL_SERVER_ERROR', 'USER_DELETE_ERROR');
    }

    return createResponse(
      'SUCCESS',
      'USER_DELETE_SUCCESS',
      null
    );
  }
}
