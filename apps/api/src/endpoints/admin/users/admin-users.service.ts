import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { MESSAGE } from '@/code/messages';
import { CreateUserDto } from '@/dto/auth.dto';
import { UpdateUserDto, SearchUserDto } from '@/dto/user.dto';
import type { JwtPayload } from '@/endpoints/auth/jwt.strategy';
import { searchUserSchema } from '@/endpoints/prisma/schemas/user.schema';
import type { ListType, MultipleResultType, RepoResponseType } from '@/endpoints/prisma/types/common.types';
import type { SelectUserInfoType, SelectUserInfoListItemType } from '@/endpoints/prisma/types/user.types';
import { UserRepository } from '@/endpoints/repositories/user.repository';
import { prismaResponse } from '@/utils/prismaResponse';

@Injectable()
export class AdminUserService {
  constructor(private readonly userRepository: UserRepository) { }

  /**
   * @description 사용자 목록 검색
   * @param page 페이지 번호
   * @param strtRow 시작 행
   * @param endRow 끝 행
   * @param srchType 검색 타입
   * @param srchKywd 검색 키워드
   * @param delYn 삭제 여부
   */
  async getUserList(searchData: SearchUserDto): Promise<RepoResponseType<ListType<SelectUserInfoListItemType>> | null> {
    const safeData = searchUserSchema.safeParse(searchData);

    if (!safeData.success) {
      return prismaResponse(false, null, 'BAD_REQUEST', MESSAGE.COMMON.INVALID_REQUEST);
    }

    // 검색 조건 설정
    const finalSrchType = safeData.data.srchType || 'userNm';
    const finalSrchKywd = safeData.data.srchKywd || '';

    const result = await this.userRepository.getUserList({
      page: safeData.data.page,
      strtRow: safeData.data.strtRow,
      endRow: safeData.data.endRow,
      srchType: finalSrchType,
      srchKywd: finalSrchKywd,
      delYn: safeData.data.delYn,
    });

    return result;
  }

  /**
   * @description 사용자 번호로 조회
   * @param userNo 사용자 번호
   */
  async getUserByNo(userNo: number): Promise<RepoResponseType<SelectUserInfoType> | null> {
    return this.userRepository.getUserByNo(userNo);
  }

  /**
   * @description 사용자명으로 조회
   * @param userNm 사용자명
   */
  async getUserByNm(userNm: string): Promise<RepoResponseType<SelectUserInfoType> | null> {
    return this.userRepository.getUserByName(userNm);
  }

  /**
   * @description 이메일로 사용자 조회
   * @param emlAddr 이메일 주소
   */
  async getUserByEmail(emlAddr: string): Promise<RepoResponseType<SelectUserInfoType> | null> {
    return this.userRepository.getUserByEmail(emlAddr);
  }

  /**
   * @description 새 사용자 생성
   * @param user 사용자 정보
   * @param createUserData 사용자 생성 정보
   */
  async createUser(user: JwtPayload, createUserData: CreateUserDto): Promise<RepoResponseType<SelectUserInfoType> | null> {
    // 이메일 중복 확인
    const findUser = await this.userRepository.getUserByEmail(createUserData.emlAddr);

    if (findUser?.success) {
      return prismaResponse(false, null, 'CONFLICT', MESSAGE.USER.USER.EMAIL_EXISTS);
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(
      createUserData.password,
      10
    );

    // 사용자 계정 생성
    return this.userRepository.createUser(
      user.userNo,
      createUserData,
      hashedPassword
    );
  }

  /**
   * @description 사용자 정보 수정
   * @param adminUserNo 관리자 번호
   * @param targetUserNo 대상 사용자 번호
   * @param updateUserData 사용자 수정 정보
   */
  async updateUser(adminUserNo: number, targetUserNo: number, updateUserData: UpdateUserDto): Promise<RepoResponseType<SelectUserInfoType> | null> {
    // 사용자 검색
    const findUser = await this.userRepository.getUserByNo(targetUserNo);

    if (!findUser?.success) {
      return findUser;
    }

    // 사용자명 변경 시 중복 확인
    if (updateUserData.userNm) {
      const existingUser = await this.userRepository.getUserByName(updateUserData.userNm);

      if (existingUser?.success && existingUser.data && existingUser.data.userNo !== targetUserNo) {
        return prismaResponse(false, null, 'CONFLICT', MESSAGE.USER.USER.NAME_EXISTS);
      }
    }

    return this.userRepository.updateUser(
      adminUserNo,
      targetUserNo,
      updateUserData
    );
  }

  /**
   * @description 다수 사용자 일괄 수정
   * @param adminUserNo 관리자 번호
   * @param updateUserDto 사용자 수정 정보
   */
  async multipleUpdateUser(adminUserNo: number, updateUserDto: UpdateUserDto): Promise<RepoResponseType<MultipleResultType> | null> {
    return this.userRepository.adminMultipleUpdateUser(adminUserNo, updateUserDto);
  }

  /**
   * @description 사용자 삭제
   * @param adminUserNo 관리자 번호
   * @param targetUserNo 대상 사용자 번호
   */
  async adminDeleteUser(adminUserNo: number, targetUserNo: number): Promise<RepoResponseType<boolean> | null> {
    // 사용자 존재 확인
    const findUser = await this.userRepository.getUserByNo(targetUserNo);

    if (!findUser?.success) {
      return prismaResponse(false, null, findUser?.error?.code, findUser?.error?.message);
    }

    return this.userRepository.deleteUser(adminUserNo, targetUserNo);
  }

  /**
   * @description 다수 사용자 일괄 삭제
   * @param adminUserNo 관리자 번호
   * @param userNoList 사용자 번호 목록
   */
  async adminMultipleDeleteUser(adminUserNo: number, userNoList: number[]): Promise<RepoResponseType<MultipleResultType> | null> {
    if (!userNoList || userNoList.length === 0) {
      return prismaResponse(false, null, 'BAD_REQUEST', MESSAGE.COMMON.INVALID_REQUEST);
    }

    return this.userRepository.adminMultipleDeleteUser(adminUserNo, userNoList);
  }
}
