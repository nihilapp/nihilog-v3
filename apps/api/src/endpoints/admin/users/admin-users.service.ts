import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { CreateUserDto } from '@/dto/auth.dto';
import { UpdateUserDto, SearchUserDto } from '@/dto/user.dto';
import type { JwtPayload } from '@/endpoints/auth/jwt.strategy';
import { searchUserSchema } from '@/endpoints/prisma/schemas/user.schema';
import type { ListType, MultipleResultType } from '@/endpoints/prisma/types/common.types';
import type { SelectUserInfoType, SelectUserInfoListItemType } from '@/endpoints/prisma/types/user.types';
import { UserRepository } from '@/endpoints/repositories/user.repository';

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
  async getUserList(searchData: SearchUserDto): Promise<ListType<SelectUserInfoListItemType> | null> {
    const safeData = searchUserSchema.safeParse(searchData);

    if (!safeData.success) {
      return null;
    }

    // 검색 조건 설정
    const finalSrchType = safeData.data.srchType || 'userNm';
    const finalSrchKywd = safeData.data.srchKywd || '';

    try {
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
    catch {
      return null;
    }
  }

  /**
   * @description 사용자 번호로 조회
   * @param userNo 사용자 번호
   */
  async getUserByNo(userNo: number): Promise<SelectUserInfoType | null> {
    try {
      const userData = await this.userRepository.getUserByNo(userNo);
      return userData;
    }
    catch {
      return null;
    }
  }

  /**
   * @description 사용자명으로 조회
   * @param userNm 사용자명
   */
  async getUserByNm(userNm: string): Promise<SelectUserInfoType | null> {
    try {
      const userData = await this.userRepository.getUserByName(userNm);
      return userData;
    }
    catch {
      return null;
    }
  }

  /**
   * @description 이메일로 사용자 조회
   * @param emlAddr 이메일 주소
   */
  async getUserByEmail(emlAddr: string): Promise<SelectUserInfoType | null> {
    try {
      const userData = await this.userRepository.getUserByEmail(emlAddr);
      return userData;
    }
    catch {
      return null;
    }
  }

  /**
   * @description 새 사용자 생성
   * @param user 사용자 정보
   * @param createUserData 사용자 생성 정보
   */
  async createUser(user: JwtPayload, createUserData: CreateUserDto): Promise<SelectUserInfoType | null> {
    try {
      // 이메일 중복 확인
      const findUser = await this.userRepository.getUserByEmail(createUserData.emlAddr);

      if (findUser) {
        return null;
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
    catch {
      return null;
    }
  }

  /**
   * @description 사용자 정보 수정
   * @param adminUserNo 관리자 번호
   * @param targetUserNo 대상 사용자 번호
   * @param updateUserData 사용자 수정 정보
   */
  async updateUser(adminUserNo: number, targetUserNo: number, updateUserData: UpdateUserDto): Promise<SelectUserInfoType | null> {
    try {
      // 사용자 검색
      const findUser = await this.userRepository.getUserByNo(targetUserNo);

      if (!findUser) {
        return null;
      }

      // 사용자명 변경 시 중복 확인
      if (updateUserData.userNm) {
        const existingUser = await this.userRepository.getUserByName(updateUserData.userNm);

        if (existingUser && existingUser.userNo !== targetUserNo) {
          return null;
        }
      }

      return this.userRepository.updateUser(
        adminUserNo,
        targetUserNo,
        updateUserData
      );
    }
    catch {
      return null;
    }
  }

  /**
   * @description 다수 사용자 일괄 수정
   * @param adminUserNo 관리자 번호
   * @param updateUserDto 사용자 수정 정보
   */
  async multipleUpdateUser(adminUserNo: number, updateUserDto: UpdateUserDto): Promise<MultipleResultType | null> {
    try {
      return this.userRepository.adminMultipleUpdateUser(adminUserNo, updateUserDto);
    }
    catch {
      return null;
    }
  }

  /**
   * @description 사용자 삭제
   * @param adminUserNo 관리자 번호
   * @param targetUserNo 대상 사용자 번호
   */
  async adminDeleteUser(adminUserNo: number, targetUserNo: number): Promise<boolean> {
    try {
      // 사용자 존재 확인
      const findUser = await this.userRepository.getUserByNo(targetUserNo);

      if (!findUser) {
        return false;
      }

      return this.userRepository.deleteUser(adminUserNo, targetUserNo);
    }
    catch {
      return false;
    }
  }

  /**
   * @description 다수 사용자 일괄 삭제
   * @param adminUserNo 관리자 번호
   * @param userNoList 사용자 번호 목록
   */
  async adminMultipleDeleteUser(adminUserNo: number, userNoList: number[]): Promise<MultipleResultType | null> {
    try {
      if (!userNoList || userNoList.length === 0) {
        return null;
      }

      return this.userRepository.adminMultipleDeleteUser(adminUserNo, userNoList);
    }
    catch {
      return null;
    }
  }
}
