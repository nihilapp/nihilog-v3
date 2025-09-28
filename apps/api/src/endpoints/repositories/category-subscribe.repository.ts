import { Inject, Injectable } from '@nestjs/common';
import { and, asc, desc, eq, sql } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { CategorySubscribeDto, CreateCategorySubscribeDto, SearchCategorySubscribeDto } from '@/dto';
import { DRIZZLE } from '@/endpoints/drizzle/drizzle.module';
import { schemas } from '@/endpoints/drizzle/schemas';
import { likes } from '@/utils/ormHelper';
import { pageHelper } from '@/utils/pageHelper';
import { isEmptyString } from '@/utils/stringHelper';
import { timeToString } from '@/utils/timeHelper';

const { ctgrySbcrMpng, ctgryInfo, userInfo, userSbcrInfo, } = schemas;

const select = {
  rowNo: sql<number>`row_number() over (order by ${ctgrySbcrMpng.ctgrySbcrNo} desc)`,
  ctgrySbcrNo: ctgrySbcrMpng.ctgrySbcrNo,
  ctgryNo: ctgrySbcrMpng.ctgryNo,
  sbcrNo: ctgrySbcrMpng.sbcrNo,
  delYn: ctgrySbcrMpng.delYn,
  useYn: ctgrySbcrMpng.useYn,
  crtNo: ctgrySbcrMpng.crtNo,
  crtDt: ctgrySbcrMpng.crtDt,
  updtNo: ctgrySbcrMpng.updtNo,
  updtDt: ctgrySbcrMpng.updtDt,
  delNo: ctgrySbcrMpng.delNo,
  delDt: ctgrySbcrMpng.delDt,
};

const selectWithJoin = {
  rowNo: sql<number>`row_number() over (order by ${ctgrySbcrMpng.ctgrySbcrNo} desc)`,
  ctgrySbcrNo: ctgrySbcrMpng.ctgrySbcrNo,
  ctgryNo: ctgrySbcrMpng.ctgryNo,
  sbcrNo: ctgrySbcrMpng.sbcrNo,
  ctgryNm: ctgryInfo.ctgryNm,
  delYn: ctgrySbcrMpng.delYn,
  useYn: ctgrySbcrMpng.useYn,
  crtNo: ctgrySbcrMpng.crtNo,
  crtDt: ctgrySbcrMpng.crtDt,
  updtNo: ctgrySbcrMpng.updtNo,
  updtDt: ctgrySbcrMpng.updtDt,
  delNo: ctgrySbcrMpng.delNo,
  delDt: ctgrySbcrMpng.delDt,
} as const;

@Injectable()
export class CategorySubscribeRepository {
  constructor(@Inject(DRIZZLE)
  private readonly db: NodePgDatabase<typeof schemas>) { }

  /**
   * @description 카테고리 구독 전체 이력 조회
   * @param searchData 검색 데이터
   */
  async getCategorySubscribeList(searchData: SearchCategorySubscribeDto): Promise<CategorySubscribeDto[]> {
    try {
      const { page, strtRow, endRow, srchType, srchKywd, delYn, } = searchData;

      const searchConditions: Record<string, string> = {};
      if (!isEmptyString(srchKywd) && srchType) {
        searchConditions[srchType] = srchKywd;
      }

      const whereConditions = [
        ...likes(ctgrySbcrMpng, searchConditions),
        eq(ctgrySbcrMpng.delYn, delYn || 'N'),
      ];

      const list = await this.db
        .select(selectWithJoin)
        .from(ctgrySbcrMpng)
        .innerJoin(
          ctgryInfo,
          eq(ctgrySbcrMpng.ctgryNo, ctgryInfo.ctgryNo)
        )
        .where(and(...whereConditions))
        .orderBy(asc(select.rowNo))
        .limit(pageHelper(page, strtRow, endRow).limit)
        .offset(pageHelper(page, strtRow, endRow).offset);

      return list;
    }
    catch {
      return null;
    }
  }

  /**
   * @description 사용자가 구독한 카테고리 목록 조회
   * @param userNo 사용자 번호
   * @param searchData 검색 데이터
   */
  async getCategorySubscribeByUserNo(userNo: number, searchData: SearchCategorySubscribeDto) {
    try {
      const { page, strtRow, endRow, srchType, srchKywd, delYn, } = searchData;

      const searchConditions: Record<string, string> = {};
      if (!isEmptyString(srchKywd) && srchType) {
        searchConditions[srchType] = srchKywd;
      }

      const whereConditions = [
        ...likes(ctgrySbcrMpng, searchConditions),
        eq(userSbcrInfo.userNo, userNo),
        eq(ctgrySbcrMpng.delYn, delYn || 'N'),
      ];

      const list = await this.db
        .select(selectWithJoin)
        .from(ctgrySbcrMpng)
        .innerJoin(
          ctgryInfo,
          eq(ctgrySbcrMpng.ctgryNo, ctgryInfo.ctgryNo)
        )
        .innerJoin(
          userSbcrInfo,
          eq(ctgrySbcrMpng.sbcrNo, userSbcrInfo.sbcrNo)
        )
        .where(and(...whereConditions))
        .orderBy(asc(select.rowNo))
        .limit(pageHelper(page, strtRow, endRow).limit)
        .offset(pageHelper(page, strtRow, endRow).offset);

      return list;
    }
    catch {
      return null;
    }
  }

  /**
   * @description 카테고리 구독 조회
   * @param ctgryNo 카테고리 번호
   */
  async getCategorySubscribeByCtgryNo(ctgryNo: number, searchData: SearchCategorySubscribeDto) {
    try {
      const { page, strtRow, endRow, srchType, srchKywd, delYn, } = searchData;

      const searchConditions: Record<string, string> = {};
      if (!isEmptyString(srchKywd) && srchType) {
        searchConditions[srchType] = srchKywd;
      }

      const whereConditions = [
        ...likes(ctgrySbcrMpng, searchConditions),
        eq(ctgrySbcrMpng.ctgryNo, ctgryNo),
        eq(ctgrySbcrMpng.delYn, delYn || 'N'),
      ];

      const list = await this.db
        .select(selectWithJoin)
        .from(ctgrySbcrMpng)
        .innerJoin(
          ctgryInfo,
          eq(ctgrySbcrMpng.ctgryNo, ctgryInfo.ctgryNo)
        )
        .where(and(...whereConditions))
        .orderBy(asc(select.rowNo))
        .limit(pageHelper(page, strtRow, endRow).limit)
        .offset(pageHelper(page, strtRow, endRow).offset);

      return list;
    }
    catch {
      return null;
    }
  }

  /**
   * @description 카테고리 구독 생성
   * @param userNo 사용자 번호
   * @param createData 카테고리 구독 생성 데이터
   */
  async createCategorySubscribe(userNo: number, createData: CreateCategorySubscribeDto) {
    try {
      const { sbcrNo, ctgryNo, useYn, delYn, } = createData;

      const [ createSubscribe, ] = await this.db
        .insert(ctgrySbcrMpng)
        .values({
          sbcrNo,
          ctgryNo,
          useYn,
          delYn,
          crtNo: userNo,
          crtDt: timeToString(),
          updtNo: userNo,
          updtDt: timeToString(),
        })
        .returning(select);

      return createSubscribe;
    }
    catch {
      return null;
    }
  }

  /**
   * @description 카테고리 구독 목록 생성
   * @param userNo 사용자 번호
   * @param ctgryNoList 카테고리 번호 목록
   */
  async multipleCreateCategorySubscribe(userNo: number, ctgryNoList: number[]) {

  }

  /**
   * @description 카테고리 구독 목록 수정
   * @param userNo 사용자 번호
   * @param ctgryNoList 카테고리 번호 목록
   * @param updateData 수정 데이터
   */
  async multipleUpdateCategorySubscribe(userNo: number, ctgryNoList: number[], updateData: any) {

  }

  /**
   * @description 카테고리 구독 삭제
   * @param userNo 사용자 번호
   * @param ctgryNo 카테고리 번호
   */
  async deleteCategorySubscribe(userNo: number, ctgryNo: number) {

  }

  /**
   * @description 카테고리 구독 목록 삭제
   * @param userNo 사용자 번호
   * @param ctgryNoList 카테고리 번호 목록
   */
  async multipleDeleteCategorySubscribe(userNo: number, ctgryNoList: number[]) {

  }
}
