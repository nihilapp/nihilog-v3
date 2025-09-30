import { Inject, Injectable } from '@nestjs/common';
import { and, asc, eq, inArray, sql } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { CreateAdminDto } from '@/dto/admin.dto';
import { CreateUserDto } from '@/dto/auth.dto';
import { UpdateUserDto, type SearchUserDto, type UserInfoDto } from '@/dto/user.dto';
import { DRIZZLE } from '@/endpoints/drizzle/drizzle.module';
import { schemas } from '@/endpoints/drizzle/schemas';
import type { MultipleResultType } from '@/endpoints/drizzle/schemas/response.schema';
import { UserInfoType } from '@/endpoints/drizzle/schemas/user.schema';
import { userInfo } from '@/endpoints/drizzle/tables';
import { likes, updateColumns } from '@/utils/ormHelper';
import { pageHelper } from '@/utils/pageHelper';
import { isEmptyString } from '@/utils/stringHelper';
import { timeToString } from '@/utils/timeHelper';

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

const userInfoSelectWithoutPassword = {
  userNo: userInfo.userNo,
  emlAddr: userInfo.emlAddr,
  userNm: userInfo.userNm,
  userRole: userInfo.userRole,
  proflImg: userInfo.proflImg,
  userBiogp: userInfo.userBiogp,
  encptPswd: sql<null>`null`.as('encptPswd'),
  reshToken: sql<null>`null`.as('reshToken'),
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

// 리스트 조회용 select 매핑 (totalCnt 포함)
const userInfoSelectWithTotal = {
  ...userInfoSelect,
  totalCnt: sql<number>`count(1) over()`.as('totalCnt'),
} as const;

@Injectable()
export class UserRepository {
  constructor(@Inject(DRIZZLE)
  private readonly db: NodePgDatabase<typeof schemas>) { }

  /**
   * @description 사용자 번호로 조회
   * @param userNo 사용자 번호
   * @param delYn 삭제 여부
   */
  async getUserByNo(userNo: number, delYn: 'Y' | 'N' = 'N'): Promise<UserInfoType | null> {
    const whereConditions = [
      eq(userInfo.userNo, userNo),
      eq(userInfo.delYn, delYn),
    ];

    try {
      const [ result, ] = await this.db
        .select(userInfoSelect)
        .from(userInfo)
        .where(and(...whereConditions));

      return result;
    }
    catch {
      return null;
    }
  }

  /**
   * @description 사용자 계정 생성
   * @param userNo 현재 사용자 번호
   * @param signUpData 회원가입 정보
   * @param hashedPassword 해시된 비밀번호
   */
  async createUser(
    userNo: number | null,
    signUpData: CreateUserDto | CreateAdminDto,
    hashedPassword: string
  ): Promise<UserInfoType | null> {
    const currentTime = timeToString();

    try {
      const [ result, ] = await this.db
        .insert(userInfo)
        .values({
          emlAddr: signUpData.emlAddr,
          userNm: signUpData.userNm,
          userRole: signUpData.userRole,
          encptPswd: hashedPassword,
          crtNo: userNo || null,
          crtDt: currentTime,
          updtNo: userNo || null,
          updtDt: currentTime,
        })
        .returning(userInfoSelectWithoutPassword);

      return result;
    }
    catch {
      return null;
    }
  }

  /**
   * @description 사용자 정보 업데이트
   * @param userNo 현재 사용자 번호
   * @param targetUserNo 대상 사용자 번호
   * @param updateData 업데이트 데이터
   */
  async updateUser(userNo: number, targetUserNo: number, updateData: UpdateUserDto): Promise<UserInfoType | null> {
    const updateValues = updateColumns(updateData);

    if (Object.keys(updateValues).length === 0) {
      return null;
    }

    try {
      const [ result, ] = await this.db
        .update(userInfo)
        .set({
          ...updateValues,
          updtNo: userNo,
          updtDt: timeToString(),
        })
        .where(eq(
          userInfo.userNo,
          targetUserNo
        ))
        .returning(userInfoSelectWithoutPassword);

      return result;
    }
    catch {
      return null;
    }
  }

  /**
   * @description 사용자 소프트 삭제
   * @param userNo 현재 사용자 번호
   * @param targetUserNo 대상 사용자 번호
   */
  async deleteUser(userNo: number, targetUserNo: number): Promise<boolean> {
    const currentTime = timeToString();

    try {
      await this.db
        .update(userInfo)
        .set({
          useYn: 'N',
          delYn: 'Y',
          delDt: currentTime,
          delNo: userNo,
          updtDt: currentTime,
          updtNo: userNo,
        })
        .where(eq(userInfo.userNo, targetUserNo));

      return true;
    }
    catch {
      return false;
    }
  }

  /**
   * @description 사용자 목록 조회
   * @param searchData 검색 조건
   */
  async getUserList(searchData: SearchUserDto & Partial<UserInfoDto>): Promise<UserInfoType[]> {
    const { page, strtRow, endRow, srchType, srchKywd, delYn, } = searchData;

    const searchConditions: Record<string, string> = {};
    if (!isEmptyString(srchKywd) && srchType) {
      searchConditions[srchType] = srchKywd;
    }

    const whereConditions = [
      ...likes(userInfo, searchConditions),
      eq(userInfo.delYn, delYn || 'N'),
    ];

    try {
      const result = await this.db
        .select(userInfoSelectWithTotal)
        .from(userInfo)
        .where(and(...whereConditions))
        .orderBy(asc(userInfo.userNo))
        .limit(pageHelper(page, strtRow, endRow).limit)
        .offset(pageHelper(page, strtRow, endRow).offset);

      return result;
    }
    catch {
      return [];
    }
  }

  /**
   * @description 이메일로 사용자 조회
   * @param emlAddr 이메일 주소
   * @param delYn 삭제 여부
   */
  async getUserByEmail(emlAddr: string, delYn: 'Y' | 'N' = 'N'): Promise<UserInfoType | null> {
    const whereConditions = [
      eq(userInfo.emlAddr, emlAddr),
      eq(userInfo.delYn, delYn),
    ];

    try {
      const [ result, ] = await this.db
        .select(userInfoSelect)
        .from(userInfo)
        .where(and(...whereConditions));

      return result;
    }
    catch {
      return null;
    }
  }

  /**
   * @description 사용자명으로 사용자 조회
   * @param userNm 사용자명
   * @param delYn 삭제 여부
   */
  async getUserByName(userNm: string, delYn: 'Y' | 'N' = 'N'): Promise<UserInfoType | null> {
    const whereConditions = [
      eq(userInfo.userNm, userNm),
      eq(userInfo.delYn, delYn),
    ];

    try {
      const [ result, ] = await this.db
        .select(userInfoSelect)
        .from(userInfo)
        .where(and(...whereConditions));

      return result;
    }
    catch {
      return null;
    }
  }

  /**
   * @description 관리자가 사용자 계정 생성
   * @param userNo 현재 사용자 번호
   * @param signUpData 회원가입 정보
   * @param hashedPassword 해시된 비밀번호
   */
  async adminCreateUser(
    userNo: number | null,
    signUpData: CreateUserDto | CreateAdminDto,
    hashedPassword: string
  ): Promise<UserInfoType | null> {
    const currentTime = timeToString();

    try {
      const [ result, ] = await this.db
        .insert(userInfo)
        .values({
          emlAddr: signUpData.emlAddr,
          userNm: signUpData.userNm,
          userRole: signUpData.userRole,
          encptPswd: hashedPassword,
          crtNo: userNo || null,
          crtDt: currentTime,
          updtNo: userNo || null,
          updtDt: currentTime,
        })
        .returning(userInfoSelectWithoutPassword);

      return result;
    }
    catch {
      return null;
    }
  }

  /**
   * @description 관리자가 사용자 정보 업데이트
   * @param userNo 현재 사용자 번호
   * @param targetUserNo 대상 사용자 번호
   * @param updateData 업데이트 데이터
   */
  async adminUpdateUser(userNo: number, targetUserNo: number, updateData: UpdateUserDto): Promise<UserInfoType | null> {
    const updateValues = updateColumns(updateData);

    if (Object.keys(updateValues).length === 0) {
      return null;
    }

    try {
      const [ result, ] = await this.db
        .update(userInfo)
        .set({
          ...updateValues,
          updtNo: userNo,
          updtDt: timeToString(),
        })
        .where(eq(
          userInfo.userNo,
          targetUserNo
        ))
        .returning(userInfoSelectWithoutPassword);

      return result;
    }
    catch {
      return null;
    }
  }

  /**
   * @description 관리자가 다수 사용자 일괄 수정
   * @param userNo 현재 사용자 번호
   * @param updateUserDto 사용자 수정 정보 목록
   */
  async adminMultipleUpdateUser(userNo: number, updateUserDto: UpdateUserDto): Promise<MultipleResultType | null> {
    const { userNoList, delYn, useYn, userRole, } = updateUserDto;

    if (!userNoList || userNoList.length === 0) {
      return null;
    }

    try {
      const result = await this.db
        .update(userInfo)
        .set({
          updtNo: userNo,
          updtDt: timeToString(),
          ...(delYn && {
            delNo: userNo,
            delYn,
            delDt: timeToString(),
          }),
          ...(useYn && { useYn, }),
          ...(userRole && { userRole, }),
        })
        .where(inArray(userInfo.userNo, userNoList))
        .returning({
          userNo: userInfo.userNo,
        });

      const successCnt = result.length;
      const failCnt = userNoList.length - successCnt;
      const failNoList = userNoList
        .filter((item) => (
          !result.some((resultItem) => resultItem.userNo === item)
        ));

      return {
        successCnt,
        failCnt,
        failNoList,
      };
    }
    catch {
      return null;
    }
  }

  /**
   * @description 관리자가 사용자 소프트 삭제
   * @param userNo 현재 사용자 번호
   * @param targetUserNo 대상 사용자 번호
   */
  async adminDeleteUser(userNo: number, targetUserNo: number): Promise<boolean> {
    const currentTime = timeToString();

    try {
      await this.db
        .update(userInfo)
        .set({
          useYn: 'N',
          delYn: 'Y',
          delDt: currentTime,
          delNo: userNo,
          updtDt: currentTime,
          updtNo: userNo,
        })
        .where(eq(userInfo.userNo, targetUserNo));

      return true;
    }
    catch {
      return false;
    }
  }

  /**
   * @description 다수 사용자 일괄 삭제
   * @param userNo 현재 사용자 번호
   * @param userNoList 사용자 번호 목록
   */
  async adminMultipleDeleteUser(userNo: number, userNoList: number[]): Promise<boolean> {
    if (!userNoList || userNoList.length === 0) {
      return false;
    }

    try {
      await this.db
        .update(userInfo)
        .set({
          useYn: 'N',
          delYn: 'Y',
          delDt: timeToString(),
          delNo: userNo,
          updtDt: timeToString(),
          updtNo: userNo,
        })
        .where(inArray(userInfo.userNo, userNoList));

      return true;
    }
    catch {
      return false;
    }
  }
}
