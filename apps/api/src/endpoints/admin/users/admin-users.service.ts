import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { MESSAGE } from '@/code/messages';
import { CreateUserDto } from '@/dto/auth.dto';
import type { AnalyzeStatDto } from '@/dto/common.dto';
import { UpdateUserDto, SearchUserDto } from '@/dto/user.dto';
import type { JwtPayload } from '@/endpoints/auth/jwt.strategy';
import { searchUserSchema } from '@/endpoints/prisma/schemas/user.schema';
import type { ListType, MultipleResultType, RepoResponseType } from '@/endpoints/prisma/types/common.types';
import type {
  SelectUserInfoType,
  SelectUserInfoListItemType,
  AnalyzeUserStatItemType,
  ActiveUserAnalysisItemType,
  TopUsersByContributionItemType,
  TopUsersByPostCountItemType,
  TopUsersByCommentCountItemType,
  UserRoleDistributionItemType,
  UserStatusDistributionItemType,
  InactiveUsersListItemType,
  UserGrowthRateItemType,
  UserRetentionRateItemType
} from '@/endpoints/prisma/types/user.types';
import { UserRepository } from '@/endpoints/repositories/user.repository';
import { prismaResponse } from '@/utils/prismaResponse';

@Injectable()
export class AdminUserService {
  constructor(private readonly userRepository: UserRepository) { }

  // ========================================================
  // 사용자 통계 관련 메서드
  // ========================================================

  /**
   * @description 사용자 분석 통계 (9개 지표 통합)
   * @param analyzeStatData 분석 통계 데이터
   * @param userNo 사용자 번호 (선택사항)
   */
  async getAnalyzeUserData(
    analyzeStatData: AnalyzeStatDto,
    userNo?: number
  ): Promise<RepoResponseType<AnalyzeUserStatItemType[]> | null> {
    return this.userRepository.getAnalyzeUserData(analyzeStatData, userNo);
  }

  /**
   * @description 활성 사용자 분석
   * @param analyzeStatData 분석 통계 데이터
   */
  async getActiveUserAnalysis(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<ActiveUserAnalysisItemType[]> | null> {
    return this.userRepository.getActiveUserAnalysis(analyzeStatData);
  }

  /**
   * @description 사용자별 기여도 TOP N
   * @param limit 제한 수
   * @param analyzeStatData 분석 통계 데이터 (선택사항)
   */
  async getTopUsersByContribution(
    limit: number,
    analyzeStatData?: AnalyzeStatDto
  ): Promise<RepoResponseType<TopUsersByContributionItemType[]> | null> {
    return this.userRepository.getTopUsersByContribution(limit, analyzeStatData);
  }

  /**
   * @description 사용자별 게시글 작성 수 TOP N
   * @param limit 제한 수
   * @param analyzeStatData 분석 통계 데이터 (선택사항)
   */
  async getTopUsersByPostCount(
    limit: number,
    analyzeStatData?: AnalyzeStatDto
  ): Promise<RepoResponseType<TopUsersByPostCountItemType[]> | null> {
    return this.userRepository.getTopUsersByPostCount(limit, analyzeStatData);
  }

  /**
   * @description 사용자별 댓글 작성 수 TOP N
   * @param limit 제한 수
   * @param analyzeStatData 분석 통계 데이터 (선택사항)
   */
  async getTopUsersByCommentCount(
    limit: number,
    analyzeStatData?: AnalyzeStatDto
  ): Promise<RepoResponseType<TopUsersByCommentCountItemType[]> | null> {
    return this.userRepository.getTopUsersByCommentCount(limit, analyzeStatData);
  }

  /**
   * @description 역할별 사용자 분포
   */
  async getUserRoleDistribution(): Promise<RepoResponseType<UserRoleDistributionItemType[]> | null> {
    return this.userRepository.getUserRoleDistribution();
  }

  /**
   * @description 상태별 사용자 분포
   */
  async getUserStatusDistribution(): Promise<RepoResponseType<UserStatusDistributionItemType[]> | null> {
    return this.userRepository.getUserStatusDistribution();
  }

  /**
   * @description 비활성 사용자 목록
   * @param daysThreshold 비활성 기준 일수
   */
  async getInactiveUsersList(daysThreshold: number = 30): Promise<RepoResponseType<InactiveUsersListItemType[]> | null> {
    return this.userRepository.getInactiveUsersList(daysThreshold);
  }

  /**
   * @description 사용자 성장률
   * @param analyzeStatData 분석 통계 데이터
   */
  async getUserGrowthRate(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<UserGrowthRateItemType[]> | null> {
    return this.userRepository.getUserGrowthRate(analyzeStatData);
  }

  /**
   * @description 사용자 유지율
   * @param analyzeStatData 분석 통계 데이터
   */
  async getUserRetentionRate(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<UserRetentionRateItemType[]> | null> {
    return this.userRepository.getUserRetentionRate(analyzeStatData);
  }

  // ========================================================
  // 기존 관리자 사용자 관련 메서드
  // ========================================================

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

    const result = await this.userRepository.getUserList({
      ...safeData.data,
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
   * @param user 사용자 정보 (null일 수 있음 - 최초 어드민 생성 시)
   * @param createUserData 사용자 생성 정보
   */
  async createUser(user: JwtPayload | null, createUserData: CreateUserDto): Promise<RepoResponseType<SelectUserInfoType> | null> {
    const { password, ...createUserDataWithoutPassword } = createUserData;
    // 이메일 중복 확인
    const findUser = await this.userRepository.getUserByEmail(createUserDataWithoutPassword.emlAddr);

    console.log('findUser', findUser);

    if (findUser?.success && findUser.data) {
      return prismaResponse(false, null, 'CONFLICT', MESSAGE.USER.USER.EMAIL_EXISTS);
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // 사용자 계정 생성 (user가 null이면 최초 생성자 없음)
    return this.userRepository.createUser(
      user?.userNo || null,
      createUserDataWithoutPassword,
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
