import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { CreateUserDto } from '@/dto/auth.dto';
import { ListDto, type MultipleResultDto, type ResponseDto } from '@/dto/response.dto';
import { UserInfoDto, UpdateUserDto, SearchUserDto } from '@/dto/user.dto';
import type { JwtPayload } from '@/endpoints/auth/jwt.strategy';
import { searchUserSchema } from '@/endpoints/drizzle/schemas/user.schema';
import { UserRepository } from '@/endpoints/repositories/user.repository';
import { createError, createResponse } from '@/utils';

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
  async getUserList(searchData: SearchUserDto & Partial<UserInfoDto>): Promise<ListDto<UserInfoDto> | null> {
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

      const totalCnt = result.length > 0
        ? result[0].totalCnt
        : 0;

      return {
        list: result,
        totalCnt,
      };
    }
    catch {
      return null;
    }
  }

  /**
   * @description 사용자 번호로 조회
   * @param userNo 사용자 번호
   */
  async getUserByNo(userNo: number): Promise<UserInfoDto | null> {
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
  async getUserByNm(userNm: string): Promise<UserInfoDto | null> {
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
  async getUserByEmail(emlAddr: string): Promise<UserInfoDto | null> {
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
  async createUser(user: JwtPayload, createUserData: CreateUserDto): Promise<ResponseDto<UserInfoDto>> {
    try {
      // 이메일 중복 확인
      const findUser = await this.userRepository.getUserByEmail(createUserData.emlAddr);

      if (findUser) {
        return createError(
          'CONFLICT',
          'CONFLICT_EMAIL'
        );
      }

      // 비밀번호 해시화
      const hashedPassword = await bcrypt.hash(
        createUserData.password,
        10
      );

      // 사용자 계정 생성
      const newUser = await this.userRepository.adminCreateUser(
        user.userNo,
        createUserData,
        hashedPassword
      );

      if (!newUser) {
        return createError('INTERNAL_SERVER_ERROR', 'USER_CREATE_ERROR');
      }

      return createResponse('CREATED', 'USER_CREATE_SUCCESS', newUser);
    }
    catch {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'USER_CREATE_ERROR'
      );
    }
  }

  /**
   * @description 사용자 정보 수정
   * @param adminUserNo 관리자 번호
   * @param targetUserNo 대상 사용자 번호
   * @param updateUserData 사용자 수정 정보
   */
  async updateUser(adminUserNo: number, targetUserNo: number, updateUserData: UpdateUserDto): Promise<ResponseDto<UserInfoDto>> {
    try {
      // 사용자 검색
      const findUser = await this.userRepository.getUserByNo(targetUserNo);

      if (!findUser) {
        return createError(
          'NOT_FOUND',
          'USER_NOT_FOUND'
        );
      }

      // 사용자명 변경 시 중복 확인
      if (updateUserData.userNm) {
        const existingUser = await this.userRepository.getUserByName(updateUserData.userNm);

        if (existingUser && existingUser.userNo !== targetUserNo) {
          return createError('CONFLICT', 'USER_NAME_EXISTS');
        }
      }

      const result = await this.userRepository.adminUpdateUser(
        adminUserNo,
        targetUserNo,
        updateUserData
      );

      if (!result) {
        return createError('INTERNAL_SERVER_ERROR', 'USER_UPDATE_ERROR');
      }

      return createResponse('SUCCESS', 'USER_UPDATE_SUCCESS', result);
    }
    catch {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'USER_UPDATE_ERROR'
      );
    }
  }

  /**
   * @description 다수 사용자 일괄 수정
   * @param adminUserNo 관리자 번호
   * @param updateUserDto 사용자 수정 정보
   */
  async multipleUpdateUser(adminUserNo: number, updateUserDto: UpdateUserDto): Promise<ResponseDto<MultipleResultDto>> {
    try {
      const result = await this.userRepository.adminMultipleUpdateUser(adminUserNo, updateUserDto);

      if (!result) {
        return createError(
          'INTERNAL_SERVER_ERROR',
          'USER_UPDATE_ERROR'
        );
      }

      return createResponse('SUCCESS', 'USER_UPDATE_SUCCESS', result);
    }
    catch {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'USER_UPDATE_ERROR'
      );
    }
  }

  /**
   * @description 사용자 삭제
   * @param adminUserNo 관리자 번호
   * @param targetUserNo 대상 사용자 번호
   */
  async adminDeleteUser(adminUserNo: number, targetUserNo: number): Promise<ResponseDto<null>> {
    try {
      // 사용자 존재 확인
      const findUser = await this.userRepository.getUserByNo(targetUserNo);

      if (!findUser) {
        return createError(
          'NOT_FOUND',
          'USER_NOT_FOUND'
        );
      }

      const result = await this.userRepository.adminDeleteUser(adminUserNo, targetUserNo);

      if (!result) {
        return createError('INTERNAL_SERVER_ERROR', 'USER_DELETE_ERROR');
      }

      return createResponse('SUCCESS', 'USER_DELETE_SUCCESS', null);
    }
    catch {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'USER_DELETE_ERROR'
      );
    }
  }

  /**
   * @description 다수 사용자 일괄 삭제
   * @param adminUserNo 관리자 번호
   * @param userNoList 사용자 번호 목록
   */
  async adminMultipleDeleteUser(adminUserNo: number, userNoList: number[]): Promise<ResponseDto<null>> {
    try {
      if (!userNoList || userNoList.length === 0) {
        return createError('BAD_REQUEST', 'INVALID_REQUEST');
      }

      const result = await this.userRepository.adminMultipleDeleteUser(adminUserNo, userNoList);

      if (!result) {
        return createError('INTERNAL_SERVER_ERROR', 'USER_DELETE_ERROR');
      }

      return createResponse('SUCCESS', 'USER_DELETE_SUCCESS', null);
    }
    catch {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'USER_DELETE_ERROR'
      );
    }
  }
}
