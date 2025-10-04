import { Injectable } from '@nestjs/common';

import { UpdateUserDto } from '@/dto/user.dto';
import { JwtPayload } from '@/endpoints/auth/jwt.strategy';
import type { SelectUserInfoType } from '@/endpoints/prisma/types/user.types';
import { UserRepository } from '@/endpoints/repositories/user.repository';

@Injectable()
export class AdminService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * 관리자 프로필 업데이트
   * @param authUser 인증된 사용자 정보
   * @param updateProfileData 프로필 수정 정보
   */
  async updateProfile(
    authUser: JwtPayload,
    updateProfileData: UpdateUserDto
  ): Promise<SelectUserInfoType | null> {
    const { userNm, proflImg, userBiogp, } = updateProfileData;

    // 현재 사용자 정보 조회
    const currentUser = await this.userRepository.getUserByNo(authUser.userNo);

    if (!currentUser) {
      return null;
    }

    // 사용자명 변경 시 중복 확인
    if (userNm) {
      const existingUser = await this.userRepository.getUserByName(userNm);

      if (existingUser && existingUser.userNo !== authUser.userNo) {
        return null;
      }
    }

    // 프로필 업데이트
    return this.userRepository.updateUser(
      authUser.userNo,
      authUser.userNo,
      {
        userNm,
        proflImg,
        userBiogp,
      }
    );
  }
}
