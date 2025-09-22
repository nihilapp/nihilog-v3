import { ListDto } from '@/dto/response.dto';
import { UserInfoDto } from '@/dto/user.dto';
import { CreateUserDto } from '@/dto/auth.dto';
import { searchUserSchema } from '@drizzle/schemas/user.schema';
import { UserRepository } from '@repositories/user.repository';
import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository
  ) { }

  /**
   * @description 새 사용자 생성
   * @param createUserData 사용자 생성 정보
   */
  async createUser(createUserData: CreateUserDto): Promise<{
    success: boolean;
    data?: UserInfoDto;
    errorType?: 'CONFLICT' | 'INTERNAL_SERVER_ERROR';
  }> {
    try {
      // 이메일 중복 확인
      const existingUser = await this.userRepository.findUser({ emlAddr: createUserData.emlAddr, });

      if (existingUser) {
        return { success: false, errorType: 'CONFLICT', };
      }

      // 비밀번호 해시화
      const hashedPassword = await bcrypt.hash(createUserData.password, 10);

      // 사용자 계정 생성
      const newUser = await this.userRepository.createUserWithRole(createUserData, hashedPassword);

      return { success: true, data: newUser, };
    }
    catch {
      return { success: false, errorType: 'INTERNAL_SERVER_ERROR', };
    }
  }

  /**
   * @description 사용자 목록 검색
   * @param strtRow 시작 행
   * @param endRow 끝 행
   * @param srchType 검색 타입
   * @param srchKywd 검색 키워드
   * @param delYn 삭제 여부
   */
  async getUsers(
    strtRow?: number,
    endRow?: number,
    srchType?: 'userNm' | 'emlAddr' | 'userRole',
    srchKywd?: string,
    delYn?: 'Y' | 'N'
  ): Promise<ListDto<UserInfoDto> | null> {
    const searchData = {
      strtRow,
      endRow,
      srchType,
      srchKywd,
      delYn,
    };

    const safeData = searchUserSchema.safeParse(searchData);

    if (!safeData.success) {
      return null;
    }

    // 검색 조건 설정
    const finalSrchType = safeData.data.srchType || 'userNm';
    const finalSrchKywd = safeData.data.srchKywd || '';

    try {
      const result = await this.userRepository.getUsers(
        safeData.data.strtRow,
        safeData.data.endRow,
        finalSrchType,
        finalSrchKywd,
        safeData.data.delYn
      );

      const list = result;
      const totalCnt = result.length > 0
        ? result[0].totalCnt
        : 0;

      return {
        list,
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
      const userData = await this.userRepository.findUser({ userNo, });
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
      const userData = await this.userRepository.findUser({ userNm, });
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
      const userData = await this.userRepository.findUser({ emlAddr, });
      return userData;
    }
    catch {
      return null;
    }
  }
}
