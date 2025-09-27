import { Injectable } from '@nestjs/common';

import { ResponseDto } from '@/dto/response.dto';
import { UpdateUserDto, UserInfoDto } from '@/dto/user.dto';
import { UserRepository } from '@/endpoints/repositories/user.repository';
import { createError, createResponse } from '@/utils';
import { JwtPayload } from '@auth/jwt.strategy';

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
  ): Promise<ResponseDto<UserInfoDto>> {
    const { userNm, proflImg, userBiogp, } = updateProfileData;

    // 현재 사용자 정보 조회
    const currentUser = await this.userRepository.getUserByNo(authUser.userNo);

    if (!currentUser) {
      return createError('NOT_FOUND', 'USER_NOT_FOUND');
    }

    // 사용자명 변경 시 중복 확인
    if (userNm) {
      const existingUser = await this.userRepository.getUserByName(userNm);

      if (existingUser && existingUser.userNo !== authUser.userNo) {
        return createError('CONFLICT', 'USER_NAME_EXISTS');
      }
    }

    // 프로필 업데이트
    const updatedUser = await this.userRepository.updateUser(
      authUser.userNo,
      authUser.userNo,
      {
        userNm,
        proflImg,
        userBiogp,
      }
    );

    if (!updatedUser) {
      return createError('INTERNAL_SERVER_ERROR', 'PROFILE_UPDATE_ERROR');
    }

    return createResponse('SUCCESS', 'PROFILE_UPDATE_SUCCESS', updatedUser);
  }
}
