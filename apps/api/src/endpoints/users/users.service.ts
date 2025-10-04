import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import type { CreateUserDto, ResponseDto } from '@/dto';
import type { UpdateSubscribeDto } from '@/dto/subscribe.dto';
import { UpdateUserDto } from '@/dto/user.dto';
import type { JwtPayload } from '@/endpoints/auth/jwt.strategy';
import type { SelectUserSbcrInfoType } from '@/endpoints/prisma/types/subscribe.types';
import type { SelectUserInfoType } from '@/endpoints/prisma/types/user.types';
import { SubscribeRepository } from '@/endpoints/repositories/subscribe.repository';
import { UserRepository } from '@/endpoints/repositories/user.repository';
import { createError, createResponse } from '@/utils';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly subscribeRepository: SubscribeRepository
  ) { }

  /**
   * @description 현재 로그인한 사용자의 프로필 정보를 조회합니다.
   * @param user 현재 로그인한 사용자의 정보
   */
  async getUserProfile(user: JwtPayload): Promise<ResponseDto<SelectUserInfoType>> {
    try {
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
    catch {
      return createError('INTERNAL_SERVER_ERROR', 'PROFILE_GET_ERROR');
    }
  }

  /**
   * @description 현재 로그인한 사용자의 구독 정보를 조회합니다.
   * @param user 현재 로그인한 사용자의 정보
   */
  async getUserSubscribeByUserNo(user: JwtPayload): Promise<ResponseDto<SelectUserSbcrInfoType>> {
    try {
      const subscribe = await this.subscribeRepository.getUserSubscribeByUserNo(user.userNo);

      if (!subscribe) {
        return createError('NOT_FOUND', 'SUBSCRIBE_NOT_FOUND');
      }

      return createResponse(
        'SUCCESS',
        'SUBSCRIBE_FETCH_SUCCESS',
        subscribe
      );
    }
    catch {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'SUBSCRIBE_FETCH_ERROR'
      );
    }
  }

  /**
   * @description 사용자 계정 생성
   * @param createUserDto 사용자 계정 생성 정보
   */
  async createUser(createUserDto: CreateUserDto): Promise<ResponseDto<SelectUserInfoType>> {
    try {
      const findUser = await this.userRepository.getUserByEmail(createUserDto.emlAddr);

      if (findUser) {
        return createError('CONFLICT', 'CONFLICT_EMAIL');
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const newUser = await this.userRepository.createUser(null, createUserDto, hashedPassword);

      if (!newUser) {
        return createError('INTERNAL_SERVER_ERROR', 'USER_CREATE_ERROR');
      }

      return createResponse('CREATED', 'USER_CREATE_SUCCESS', newUser);
    }
    catch {
      return createError('INTERNAL_SERVER_ERROR', 'USER_CREATE_ERROR');
    }
  }

  /**
   * @description 현재 로그인한 사용자의 프로필 정보를 수정합니다.
   * @param user 현재 로그인한 사용자의 정보
   * @param updateData 수정할 프로필 정보
   */
  async updateUserProfile(user: JwtPayload, updateData: UpdateUserDto): Promise<ResponseDto<SelectUserInfoType>> {
    try {
      const findUser = await this.userRepository.getUserByNo(user.userNo);

      if (!findUser) {
        return createError('NOT_FOUND', 'USER_NOT_FOUND');
      }

      // 사용자명 변경 시 중복 확인
      if (updateData.userNm) {
        const existingUser = await this.userRepository.getUserByName(updateData.userNm);

        if (existingUser && existingUser.userNo !== user.userNo) {
          return createError('CONFLICT', 'USER_NAME_EXISTS');
        }
      }

      const updatedUser = await this.userRepository.updateUser(user.userNo, user.userNo, updateData);

      if (!updatedUser) {
        return createError('INTERNAL_SERVER_ERROR', 'USER_UPDATE_ERROR');
      }

      return createResponse('SUCCESS', 'USER_UPDATE_SUCCESS', updatedUser);
    }
    catch {
      return createError('INTERNAL_SERVER_ERROR', 'USER_UPDATE_ERROR');
    }
  }

  /**
   * @description 사용자 구독 설정 수정
   * @param user 사용자 정보
   * @param updateData 구독 설정 수정 데이터
   */
  async updateUserSubscribe(
    user: JwtPayload,
    updateData: UpdateSubscribeDto
  ): Promise<ResponseDto<SelectUserSbcrInfoType>> {
    try {
      const findUser = await this.userRepository.getUserByNo(user.userNo);

      // 사용자가 존재하지 않으면 에러
      if (!findUser) {
        return createError('NOT_FOUND', 'USER_NOT_FOUND');
      }

      const updatedSubscribe = await this.subscribeRepository
        .updateUserSubscribe(user.userNo, updateData);

      if (!updatedSubscribe) {
        return createError('INTERNAL_SERVER_ERROR', 'SUBSCRIBE_UPDATE_ERROR');
      }

      return createResponse('SUCCESS', 'SUBSCRIBE_UPDATE_SUCCESS', updatedSubscribe);
    }
    catch {
      return createError('INTERNAL_SERVER_ERROR', 'SUBSCRIBE_UPDATE_ERROR');
    }
  }

  /**
   * @description 현재 로그인한 사용자의 프로필 정보를 삭제합니다.
   * @param user 현재 로그인한 사용자의 정보
   */
  async deleteUserProfile(user: JwtPayload): Promise<ResponseDto<null>> {
    try {
      const findUser = await this.userRepository.getUserByNo(user.userNo);

      if (!findUser) {
        return createError('NOT_FOUND', 'USER_NOT_FOUND');
      }

      const deletedUser = await this.userRepository.deleteUser(user.userNo, user.userNo);

      if (!deletedUser) {
        return createError('INTERNAL_SERVER_ERROR', 'USER_DELETE_ERROR');
      }

      return createResponse(
        'SUCCESS',
        'USER_DELETE_SUCCESS',
        null
      );
    }
    catch {
      return createError('INTERNAL_SERVER_ERROR', 'USER_DELETE_ERROR');
    }
  }
}
