import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import type { CreateUserDto } from '@/dto';
import type { UpdateSubscribeDto } from '@/dto/subscribe.dto';
import { UpdateUserDto } from '@/dto/user.dto';
import type { JwtPayload } from '@/endpoints/auth/jwt.strategy';
import type { SelectUserSbcrInfoType } from '@/endpoints/prisma/types/subscribe.types';
import type { SelectUserInfoType } from '@/endpoints/prisma/types/user.types';
import { SubscribeRepository } from '@/endpoints/repositories/subscribe.repository';
import { UserRepository } from '@/endpoints/repositories/user.repository';

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
  async getUserProfile(user: JwtPayload): Promise<SelectUserInfoType | null> {
    try {
      return this.userRepository.getUserByNo(user.userNo);
    }
    catch {
      return null;
    }
  }

  /**
   * @description 현재 로그인한 사용자의 구독 정보를 조회합니다.
   * @param user 현재 로그인한 사용자의 정보
   */
  async getUserSubscribeByUserNo(user: JwtPayload): Promise<SelectUserSbcrInfoType | null> {
    try {
      return this.subscribeRepository.getUserSubscribeByUserNo(user.userNo);
    }
    catch {
      return null;
    }
  }

  /**
   * @description 사용자 계정 생성
   * @param createUserDto 사용자 계정 생성 정보
   */
  async createUser(createUserDto: CreateUserDto): Promise<SelectUserInfoType | null> {
    try {
      const findUser = await this.userRepository.getUserByEmail(createUserDto.emlAddr);

      if (findUser) {
        return null;
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      return this.userRepository.createUser(null, createUserDto, hashedPassword);
    }
    catch {
      return null;
    }
  }

  /**
   * @description 현재 로그인한 사용자의 프로필 정보를 수정합니다.
   * @param user 현재 로그인한 사용자의 정보
   * @param updateData 수정할 프로필 정보
   */
  async updateUserProfile(user: JwtPayload, updateData: UpdateUserDto): Promise<SelectUserInfoType | null> {
    try {
      const findUser = await this.userRepository.getUserByNo(user.userNo);

      if (!findUser) {
        return null;
      }

      // 사용자명 변경 시 중복 확인
      if (updateData.userNm) {
        const existingUser = await this.userRepository.getUserByName(updateData.userNm);

        if (existingUser && existingUser.userNo !== user.userNo) {
          return null;
        }
      }

      return this.userRepository.updateUser(user.userNo, user.userNo, updateData);
    }
    catch {
      return null;
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
  ): Promise<SelectUserSbcrInfoType | null> {
    try {
      const findUser = await this.userRepository.getUserByNo(user.userNo);

      // 사용자가 존재하지 않으면 에러
      if (!findUser) {
        return null;
      }

      return this.subscribeRepository.updateUserSubscribe(user.userNo, updateData);
    }
    catch {
      return null;
    }
  }

  /**
   * @description 현재 로그인한 사용자의 프로필 정보를 삭제합니다.
   * @param user 현재 로그인한 사용자의 정보
   */
  async deleteUserProfile(user: JwtPayload): Promise<boolean> {
    try {
      const findUser = await this.userRepository.getUserByNo(user.userNo);

      if (!findUser) {
        return false;
      }

      return this.userRepository.deleteUser(user.userNo, user.userNo);
    }
    catch {
      return false;
    }
  }
}
