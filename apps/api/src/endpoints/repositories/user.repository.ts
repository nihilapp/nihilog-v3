import { Inject, Injectable } from '@nestjs/common';
import { and, asc, eq, sql } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { CreateAdminDto } from '@/dto/admin.dto';
import { CreateUserDto } from '@/dto/auth.dto';
import { UpdateUserDto } from '@/dto/user.dto';
import { userInfo } from '@/endpoints/drizzle/tables';
import { updateColumns } from '@/utils/ormHelper';
import { equals, likes } from '@/utils/ormHelper';
import { pageHelper } from '@/utils/pageHelper';
import { isEmptyString } from '@/utils/stringHelper';
import { timeToString } from '@/utils/timeHelper';
import { DRIZZLE } from '@drizzle/drizzle.module';
import { schemas } from '@drizzle/schemas';
import { UserInfoType } from '@drizzle/schemas/user.schema';

// 공용 사용자 select 매핑: 중복 제거
const userInfoSelect = {
  userNo: userInfo.userNo,
  emlAddr: userInfo.emlAddr,
  userNm: userInfo.userNm,
  userRole: userInfo.userRole,
  proflImg: userInfo.proflImg,
  userBiogp: userInfo.userBiogp,
  encptPswd: userInfo.encptPswd,
  reshToken: userInfo.reshToken,
  useYn: userInfo.useYn,
  delYn: userInfo.delYn,
  lastLgnDt: userInfo.lastLgnDt,
  crtNo: userInfo.crtNo,
  crtDt: userInfo.crtDt,
  updtNo: userInfo.updtNo,
  updtDt: userInfo.updtDt,
  delNo: userInfo.delNo,
  delDt: userInfo.delDt,
} as const;

@Injectable()
export class UserRepository {
  constructor(@Inject(DRIZZLE)
  private readonly db: NodePgDatabase<typeof schemas>) { }

  /**
   * @description 사용자 정보 조회
   * @param conditions 조회 조건
   */
  async findUser(conditions: {
    userNo?: number;
    emlAddr?: string;
    userNm?: string;
    includeDeleted?: boolean;
  }): Promise<UserInfoType | null> {
    const { includeDeleted, ...searchConditions } = conditions;

    const whereConditions = [
      ...equals(userInfo, searchConditions),
      // includeDeleted가 true면 delYn 조건 제거, 아니면 'N'만 조회
      !includeDeleted
        ? eq(userInfo.delYn, 'N')
        : undefined,
    ].filter(Boolean);

    const [ result, ] = await this.db
      .select(userInfoSelect)
      .from(userInfo)
      .where(and(...whereConditions));

    return result;
  }

  /**
   * @description 사용자 계정 생성
   * @param signUpData 회원가입 정보
   * @param hashedPassword 해시된 비밀번호
   */
  async createUserWithRole(
    signUpData: CreateUserDto | CreateAdminDto,
    hashedPassword: string
  ): Promise<UserInfoType> {
    const currentTime = timeToString();

    const [ result, ] = await this.db
      .insert(userInfo)
      .values({
        emlAddr: signUpData.emlAddr,
        userNm: signUpData.userNm,
        userRole: signUpData.userRole,
        encptPswd: hashedPassword,
        crtDt: currentTime,
        updtDt: currentTime,
      })
      .returning(userInfoSelect);

    return result;
  }

  /**
   * @description 사용자 정보 업데이트
   * @param userNo 사용자 번호
   * @param updateData 업데이트 데이터
   */
  async updateUser(userNo: number, updateData: UpdateUserDto): Promise<UserInfoType> {
    const updateValues = updateColumns(updateData);

    if (Object.keys(updateValues).length === 0) {
      throw new Error('업데이트할 데이터가 없습니다.');
    }

    const [ result, ] = await this.db
      .update(userInfo)
      .set({ ...updateValues, updtDt: timeToString(), })
      .where(eq(userInfo.userNo, userNo))
      .returning(userInfoSelect);

    return result;
  }

  /**
   * @description 사용자 목록 조회
   * @param page 페이지 번호
   * @param strtRow 시작 행
   * @param endRow 종료 행
   * @param srchType 검색 타입
   * @param srchKywd 검색 키워드
   * @param delYn 삭제 여부
   */
  async getUsers(
    page?: number,
    strtRow?: number,
    endRow?: number,
    srchType?: 'userNm' | 'emlAddr' | 'userRole',
    srchKywd?: string,
    delYn?: 'Y' | 'N'
  ): Promise<UserInfoType[]> {
    const searchConditions: Record<string, string> = {};
    if (!isEmptyString(srchKywd) && srchType) {
      searchConditions[srchType] = srchKywd;
    }

    const whereConditions = [
      ...likes(userInfo, searchConditions),
      delYn !== undefined
        ? eq(userInfo.delYn, delYn)
        : undefined,
    ].filter(Boolean);

    const result = await this.db
      .select(userInfoSelect)
      .from(userInfo)
      .where(and(...whereConditions))
      .orderBy(asc(userInfo.userNo))
      .limit(pageHelper(page, strtRow, endRow).limit)
      .offset(pageHelper(page, strtRow, endRow).offset);

    return result;
  }

  /**
   * @description 사용자 소프트 삭제
   * @param userNo 사용자 번호
   */
  async deleteUser(userNo: number): Promise<UserInfoType | null> {
    const currentTime = timeToString();

    const [ result, ] = await this.db
      .update(userInfo)
      .set({
        useYn: 'N',
        delYn: 'Y',
        delDt: currentTime,
        delNo: userNo, // 자기 자신이 삭제
        updtDt: currentTime,
        updtNo: userNo, // 자기 자신이 수정
      })
      .where(eq(userInfo.userNo, userNo))
      .returning(userInfoSelect);

    return result || null;
  }

  /**
   * @description 사용자명 중복 확인
   * @param userNm 사용자명
   * @param excludeUserNo 제외할 사용자 번호
   */
  async isUserNameExists(userNm: string, excludeUserNo?: number): Promise<boolean> {
    const whereConditions = [
      eq(userInfo.userNm, userNm),
      eq(userInfo.delYn, 'N'),
    ];

    if (excludeUserNo) {
      whereConditions.push(sql`${userInfo.userNo} != ${excludeUserNo}`);
    }

    const [ result, ] = await this.db
      .select({ count: sql<number>`COUNT(1)`, })
      .from(userInfo)
      .where(and(...whereConditions));

    return result.count > 0;
  }
}
