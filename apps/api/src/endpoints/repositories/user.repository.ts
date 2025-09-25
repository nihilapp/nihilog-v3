import { Inject, Injectable } from '@nestjs/common';
import { and, asc, eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { CreateAdminDto } from '@/dto/admin.dto';
import { CreateUserDto } from '@/dto/auth.dto';
import { UpdateUserDto, type SearchUserDto } from '@/dto/user.dto';
import { userInfo } from '@/endpoints/drizzle/tables';
import { updateColumns } from '@/utils/ormHelper';
import { likes } from '@/utils/ormHelper';
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
   * @description 사용자 목록 조회
   * @param searchData 검색 조건
   */
  async getUserList(searchData: SearchUserDto): Promise<UserInfoType[]> {
    const { page, strtRow, endRow, srchType, srchKywd, delYn, } = searchData;

    const searchConditions: Record<string, string> = {};
    if (!isEmptyString(srchKywd) && srchType) {
      searchConditions[srchType] = srchKywd;
    }

    const whereConditions = [
      ...likes(userInfo, searchConditions),
      eq(userInfo.delYn, delYn || 'N'),
    ];

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
   * @description 사용자 번호로 조회
   * @param userNo 사용자 번호
   * @param delYn 삭제 여부
   */
  async getUserByNo(userNo: number, delYn: 'Y' | 'N' = 'N'): Promise<UserInfoType | null> {
    const whereConditions = [
      eq(userInfo.userNo, userNo),
      eq(userInfo.delYn, delYn),
    ];

    const [ result, ] = await this.db
      .select(userInfoSelect)
      .from(userInfo)
      .where(and(...whereConditions));

    return result;
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

    const [ result, ] = await this.db
      .select(userInfoSelect)
      .from(userInfo)
      .where(and(...whereConditions));

    return result;
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
  async createUser(
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
      .set({
        ...updateValues,
        updtDt: timeToString(),
      })
      .where(eq(
        userInfo.userNo,
        userNo
      ))
      .returning(userInfoSelect);

    return result;
  }

  /**
   * @description 다수 사용자 일괄 수정
   * @param updateUserDataList 사용자 수정 정보 목록
   */
  async multipleUpdateUser(updateUserDataList: UpdateUserDto[]): Promise<UserInfoType[]> {
    // TODO: 다수 사용자 일괄 수정 로직 구현
    return [];
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
   * @description 다수 사용자 일괄 삭제
   * @param userNos 사용자 번호 목록
   */
  async multipleDeleteUser(userNos: number[]): Promise<UserInfoType[]> {
    // TODO: 다수 사용자 일괄 삭제 로직 구현
    return [];
  }
}
