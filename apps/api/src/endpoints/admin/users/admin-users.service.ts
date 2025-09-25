import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { CreateUserDto } from '@/dto/auth.dto';
import { ListDto, type ResponseDto } from '@/dto/response.dto';
import { UserInfoDto, UpdateUserDto, type SearchUserDto } from '@/dto/user.dto';
import { createError, createResponse } from '@/utils';
import { searchUserSchema } from '@drizzle/schemas/user.schema';
import { UserRepository } from '@repositories/user.repository';

@Injectable()
export class AdminUserService {
  constructor(private readonly userRepository: UserRepository) { }

  /**
   * @description 새 사용자 생성
   * @param createUserData 사용자 생성 정보
   */
  async createUser(createUserData: CreateUserDto): Promise<ResponseDto<UserInfoDto>> {
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
      const newUser = await this.userRepository.createUser(
        createUserData,
        hashedPassword
      );

      newUser.encptPswd = undefined;
      newUser.reshToken = undefined;

      return createResponse(
        'CREATED',
        'USER_CREATE_SUCCESS',
        newUser
      );
    }
    catch {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'USER_CREATE_ERROR'
      );
    }
  }

  /**
   * @description 사용자 목록 검색
   * @param page 페이지 번호
   * @param strtRow 시작 행
   * @param endRow 끝 행
   * @param srchType 검색 타입
   * @param srchKywd 검색 키워드
   * @param delYn 삭제 여부
   */
  async getUserList(searchData: SearchUserDto): Promise<ResponseDto<ListDto<UserInfoDto>>> {
    const safeData = searchUserSchema.safeParse(searchData);

    if (!safeData.success) {
      return createError(
        'BAD_REQUEST',
        'INVALID_REQUEST'
      );
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

      const list = result.map((user) => ({
        ...user,
        encptPswd: undefined,
        reshToken: undefined,
      }));

      const totalCnt = result.length > 0
        ? result[0].totalCnt
        : 0;

      return createResponse(
        'SUCCESS',
        'USER_LIST_SUCCESS',
        {
          list,
          totalCnt,
        }
      );
    }
    catch {
      return createError(
        'INTERNAL_SERVER_ERROR',
        'USER_LIST_ERROR'
      );
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
   * @description 사용자 정보 수정
   * @param userNo 사용자 번호
   * @param updateUserData 사용자 수정 정보
   */
  async updateUser(userNo: number, updateUserData: UpdateUserDto): Promise<ResponseDto<UserInfoDto>> {
    try {
      // 사용자 검색
      const findUser = await this.userRepository.getUserByNo(userNo);

      if (!findUser) {
        return createError(
          'NOT_FOUND',
          'USER_NOT_FOUND'
        );
      }

      const updatedUser = await this.userRepository.updateUser(userNo, updateUserData);

      updatedUser.encptPswd = undefined;
      updatedUser.reshToken = undefined;

      return createResponse(
        'SUCCESS',
        'USER_UPDATE_SUCCESS',
        updatedUser
      );
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
   * @param updateUserDataList 사용자 수정 정보 목록
   */
  async multipleUpdateUser(updateUserDataList: UpdateUserDto[]): Promise<{
    success: boolean;
    data?: UserInfoDto[];
    errorType?: 'NOT_FOUND' | 'CONFLICT' | 'INTERNAL_SERVER_ERROR';
  }> {
    try {
      // TODO: 다수 사용자 일괄 수정 로직 구현
      return { success: true, data: [], };
    }
    catch {
      return { success: false, errorType: 'INTERNAL_SERVER_ERROR', };
    }
  }

  /**
   * @description 사용자 삭제
   * @param userNo 사용자 번호
   */
  async deleteUser(userNo: number): Promise<{
    success: boolean;
    errorType?: 'NOT_FOUND' | 'INTERNAL_SERVER_ERROR';
  }> {
    try {
      // TODO: 사용자 삭제 로직 구현
      return { success: true, };
    }
    catch {
      return { success: false, errorType: 'INTERNAL_SERVER_ERROR', };
    }
  }

  /**
   * @description 다수 사용자 일괄 삭제
   * @param userNos 사용자 번호 목록
   */
  async multipleDeleteUser(userNos: number[]): Promise<{
    success: boolean;
    errorType?: 'NOT_FOUND' | 'INTERNAL_SERVER_ERROR';
  }> {
    try {
      // TODO: 다수 사용자 일괄 삭제 로직 구현
      return { success: true, };
    }
    catch {
      return { success: false, errorType: 'INTERNAL_SERVER_ERROR', };
    }
  }
}
