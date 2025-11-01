import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { MESSAGE } from '@/code/messages';
import type { CreateUserDto } from '@/dto';
import type { UpdateSubscribeDto } from '@/dto/subscribe.dto';
import { UpdateUserDto } from '@/dto/user.dto';
import type { JwtPayload } from '@/endpoints/auth/jwt.strategy';
import type { RepoResponseType } from '@/endpoints/prisma/types/common.types';
import type { SelectUserSbcrInfoType } from '@/endpoints/prisma/types/subscribe.types';
import type { SelectUserInfoType } from '@/endpoints/prisma/types/user.types';
import { SubscribeRepository } from '@/endpoints/repositories/subscribe.repository';
import { UserRepository } from '@/endpoints/repositories/user.repository';
import { prismaResponse } from '@/utils/prismaResponse';

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
  async getUserProfile(user: JwtPayload): Promise<RepoResponseType<SelectUserInfoType> | null> {
    return this.userRepository.getUserByNo(user.userNo);
  }

  /**
   * @description 현재 로그인한 사용자의 구독 정보를 조회합니다.
   * @param user 현재 로그인한 사용자의 정보
   */
  async getUserSubscribeByUserNo(user: JwtPayload): Promise<RepoResponseType<SelectUserSbcrInfoType> | null> {
    return this.subscribeRepository.getUserSubscribeByUserNo(user.userNo);
  }

  /**
   * @description 사용자 계정 생성
   * @param createUserDto 사용자 계정 생성 정보
   */
  async createUser(createUserDto: CreateUserDto): Promise<RepoResponseType<SelectUserInfoType> | null> {
    // 필수값 체크
    if (!createUserDto.emlAddr || !createUserDto.userNm || !createUserDto.password) {
      return prismaResponse(
        false,
        null,
        'BAD_REQUEST',
        MESSAGE.USER.USER.INVALID_PARAMETER
      );
    }

    const findUser = await this.userRepository.getUserByEmail(createUserDto.emlAddr);

    if (findUser?.success && findUser.data) {
      return prismaResponse(
        false,
        null,
        'CONFLICT',
        MESSAGE.USER.USER.EMAIL_EXISTS
      );
    }

    // 이름 중복 확인
    const findUserByName = await this.userRepository.getUserByName(createUserDto.userNm);

    if (findUserByName?.success && findUserByName.data) {
      return prismaResponse(
        false,
        null,
        'CONFLICT',
        MESSAGE.USER.USER.USERNAME_EXISTS
      );
    }

    try {
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        10
      );

      return this.userRepository.createUser(
        null,
        createUserDto,
        hashedPassword
      );
    }
    catch {
      return prismaResponse(
        false,
        null,
        'INTERNAL_SERVER_ERROR',
        MESSAGE.USER.USER.CREATE_ERROR
      );
    }
  }

  /**
   * @description 현재 로그인한 사용자의 프로필 정보를 수정합니다.
   * @param user 현재 로그인한 사용자의 정보
   * @param updateData 수정할 프로필 정보
   */
  async updateUserProfile(
    user: JwtPayload,
    updateData: UpdateUserDto
  ): Promise<RepoResponseType<SelectUserInfoType> | null> {
    const findUser = await this.userRepository.getUserByNo(user.userNo);

    if (!findUser?.success) {
      return findUser; // Repository 에러를 그대로 전달
    }

    // 사용자명 변경 시 중복 확인
    if (updateData.userNm) {
      const existingUser = await this.userRepository.getUserByName(updateData.userNm);

      if (existingUser?.success && existingUser.data && existingUser.data.userNo !== user.userNo) {
        return prismaResponse(
          false,
          null,
          'CONFLICT',
          MESSAGE.USER.USER.NAME_EXISTS
        );
      }
    }

    // 프로필 이미지 변경 성공 메시지 사용을 위한 처리
    // (실제 이미지 변경은 Repository에서 처리되므로 여기서는 메시지만 준비)

    return this.userRepository.updateUser(
      user.userNo,
      user.userNo,
      updateData
    );
  }

  /**
   * @description 사용자 구독 설정 수정
   * @param user 사용자 정보
   * @param updateData 구독 설정 수정 데이터
   */
  async updateUserSubscribe(
    user: JwtPayload,
    updateData: UpdateSubscribeDto
  ): Promise<RepoResponseType<SelectUserSbcrInfoType> | null> {
    const findUser = await this.userRepository.getUserByNo(user.userNo);

    // 사용자가 존재하지 않으면 에러
    if (!findUser?.success) {
      return prismaResponse(
        false,
        null,
        findUser?.error?.code,
        findUser?.error?.message
      );
    }

    return this.subscribeRepository.updateUserSubscribe(
      user.userNo,
      updateData
    );
  }

  /**
   * @description 현재 로그인한 사용자의 프로필 정보를 삭제합니다.
   * @param user 현재 로그인한 사용자의 정보
   */
  async deleteUserProfile(user: JwtPayload): Promise<RepoResponseType<boolean> | null> {
    const findUser = await this.userRepository.getUserByNo(user.userNo);

    if (!findUser?.success) {
      return prismaResponse(
        false,
        null,
        findUser?.error?.code,
        findUser?.error?.message
      );
    }

    return this.userRepository.deleteUser(
      user.userNo,
      user.userNo
    );
  }
}
