import { Injectable } from '@nestjs/common';

import { UpdateUserDto } from '@/dto/user.dto';
import { JwtPayload } from '@/endpoints/auth/jwt.strategy';
import type { RepoResponseType } from '@/endpoints/prisma/types/common.types';
import type { SelectUserInfoType } from '@/endpoints/prisma/types/user.types';
import { UserRepository } from '@/endpoints/repositories/user.repository';
import { prismaResponse } from '@/utils/prismaResponse';

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
  ): Promise<RepoResponseType<SelectUserInfoType> | null> {
    const { userNm, proflImg, userBiogp, } = updateProfileData;

    // 현재 사용자 정보 조회
    const currentUser = await this.userRepository.getUserByNo(authUser.userNo);

    if (!currentUser?.success) {
      return currentUser; // Repository 에러를 그대로 전달
    }

    // 사용자명 변경 시 중복 확인
    if (userNm) {
      const existingUser = await this.userRepository.getUserByName(userNm);

      if (existingUser?.success && existingUser.data && existingUser.data.userNo !== authUser.userNo) {
        // 중복된 사용자명 - prismaResponse 사용
        return prismaResponse(false, null, 'CONFLICT', 'USER_NAME_EXISTS');
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
