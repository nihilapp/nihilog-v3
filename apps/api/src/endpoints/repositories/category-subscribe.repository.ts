import { Inject, Injectable } from '@nestjs/common';
import { and, asc, eq, inArray, sql } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { CategorySubscribeDto, CreateCategorySubscribeDto, MultipleCreateCategorySubscribeDto, MultipleDeleteCategorySubscribeDto, MultipleUpdateCategorySubscribeDto, SearchCategorySubscribeDto, UpdateCategorySubscribeDto } from '@/dto';
import type { ListDto, MutationResponseDto } from '@/dto/response.dto';
import { DRIZZLE } from '@/endpoints/drizzle/drizzle.module';
import { schemas } from '@/endpoints/drizzle/schemas';
import { ynEnumSchema } from '@/endpoints/drizzle/schemas/common.schema';
import { likes } from '@/utils/ormHelper';
import { pageHelper } from '@/utils/pageHelper';
import { isEmptyString } from '@/utils/stringHelper';
import { timeToString } from '@/utils/timeHelper';

const { ctgrySbcrMpng, ctgryInfo, userSbcrInfo, } = schemas;

const select = {
  rowNo: sql<number>`row_number() over (order by ${ctgrySbcrMpng.ctgrySbcrNo} desc)`.as('rowNo'),
  totalCnt: sql<number>`count(1) over ()`.as('totalCnt'),
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
  rowNo: sql<number>`row_number() over (order by ${ctgrySbcrMpng.ctgrySbcrNo} desc)`.as('rowNo'),
  totalCnt: sql<number>`count(1) over ()`.as('totalCnt'),
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
  async getCategorySubscribeList(searchData: SearchCategorySubscribeDto): Promise<ListDto<CategorySubscribeDto>> {
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
        .orderBy(asc(selectWithJoin.rowNo))
        .limit(pageHelper(page, strtRow, endRow).limit)
        .offset(pageHelper(page, strtRow, endRow).offset);

      return {
        list: list ?? [],
        totalCnt: list?.[0]?.totalCnt ?? 0,
      };
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
  async getCategorySubscribeByUserNo(userNo: number, searchData: SearchCategorySubscribeDto): Promise<ListDto<CategorySubscribeDto>> {
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

      return {
        list: list ?? [],
        totalCnt: list?.[0]?.totalCnt ?? 0,
      };
    }
    catch {
      return null;
    }
  }

  /**
   * @description 카테고리 구독 조회
   * @param ctgryNo 카테고리 번호
   */
  async getCategorySubscribeByCtgryNo(ctgryNo: number, searchData: SearchCategorySubscribeDto): Promise<ListDto<CategorySubscribeDto>> {
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

      return {
        list: list ?? [],
        totalCnt: list?.[0]?.totalCnt ?? 0,
      };
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
  async createCategorySubscribe(userNo: number, createData: CreateCategorySubscribeDto): Promise<CategorySubscribeDto | null> {
    try {
      const { sbcrNo, ctgryNo, } = createData;

      const [ createSubscribe, ] = await this.db
        .insert(ctgrySbcrMpng)
        .values({
          sbcrNo,
          ctgryNo,
          useYn: ynEnumSchema.enum.Y,
          delYn: ynEnumSchema.enum.N,
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
   * @param createData 카테고리 구독 생성 데이터
   */
  async multipleCreateCategorySubscribe(userNo: number, createData: MultipleCreateCategorySubscribeDto): Promise<CategorySubscribeDto[] | null> {
    try {
      const { sbcrNo, ctgryNoList, } = createData;

      const subscribeList = await this.db.transaction(async (context) => {
        return await context
          .insert(ctgrySbcrMpng)
          .values(ctgryNoList.map((item) => ({
            sbcrNo,
            ctgryNo: item,
            useYn: ynEnumSchema.enum.Y,
            delYn: ynEnumSchema.enum.N,
            crtNo: userNo,
            crtDt: timeToString(),
            updtNo: userNo,
            updtDt: timeToString(),
          })))
          .onConflictDoUpdate({
            target: [ ctgrySbcrMpng.sbcrNo, ctgrySbcrMpng.ctgryNo, ],
            set: {
              useYn: ynEnumSchema.enum.Y,
              delYn: ynEnumSchema.enum.N,
              updtNo: userNo,
              updtDt: timeToString(),
            },
          })
          .returning(select);
      });

      return subscribeList;
    }
    catch {
      return null;
    }
  }

  /**
   * @description 카테고리 구독 목록 수정
   * @param userNo 사용자 번호
   * @param updateData 카테고리 구독 수정 데이터
   */
  async multipleUpdateCategorySubscribe(userNo: number, updateData: MultipleUpdateCategorySubscribeDto): Promise<CategorySubscribeDto[] | null> {
    try {
      const { sbcrNo, useYn, delYn, ctgrySbcrNoList, } = updateData;

      const subscribeList = await this.db.transaction(async (context) => {
        return await context
          .update(ctgrySbcrMpng)
          .set({
            useYn,
            delYn,
            updtNo: userNo,
            updtDt: timeToString(),
          })
          .where(and(
            eq(ctgrySbcrMpng.sbcrNo, sbcrNo),
            inArray(ctgrySbcrMpng.ctgrySbcrNo, ctgrySbcrNoList)
          ))
          .returning(select);
      });

      return subscribeList;
    }
    catch {
      return null;
    }
  }

  /**
   * @description 카테고리 구독 삭제
   * @param userNo 사용자 번호
   * @param updateData 카테고리 구독 삭제 데이터
   */
  async deleteCategorySubscribe(userNo: number, updateData: UpdateCategorySubscribeDto): Promise<MutationResponseDto | null> {
    try {
      const { ctgrySbcrNo, useYn, delYn, } = updateData;

      const deletedRow = await this.db
        .update(ctgrySbcrMpng)
        .set({
          useYn: ynEnumSchema.enum.N,
          delYn: ynEnumSchema.enum.Y,
          updtNo: userNo,
          updtDt: timeToString(),
          delNo: userNo,
          delDt: timeToString(),
        })
        .where(and(
          eq(ctgrySbcrMpng.ctgrySbcrNo, ctgrySbcrNo),
          eq(ctgrySbcrMpng.useYn, useYn || ynEnumSchema.enum.Y),
          eq(ctgrySbcrMpng.delYn, delYn || ynEnumSchema.enum.N)
        ));

      return {
        rowsAffected: deletedRow.rowCount || 0,
        affectedRows: deletedRow.rowCount
          ? [ ctgrySbcrNo, ]
          : [],
      };
    }
    catch {
      return null;
    }
  }

  /**
   * @description 카테고리 번호로 카테고리 구독 삭제
   * @param userNo 사용자 번호
   * @param ctgryNo 카테고리 번호
   */
  async deleteCategorySubscribeByCtgryNo(userNo: number, ctgryNo: number): Promise<MutationResponseDto | null> {
    try {
      // 먼저 사용자의 구독 번호 조회
      const userSubscription = await this.db
        .select({ sbcrNo: userSbcrInfo.sbcrNo, })
        .from(userSbcrInfo)
        .where(eq(userSbcrInfo.userNo, userNo))
        .limit(1);

      if (!userSubscription || userSubscription.length === 0) {
        return null;
      }

      const sbcrNo = userSubscription[0].sbcrNo;

      // 카테고리 구독 삭제
      const deletedRow = await this.db
        .update(ctgrySbcrMpng)
        .set({
          useYn: ynEnumSchema.enum.N,
          delYn: ynEnumSchema.enum.Y,
          updtNo: userNo,
          updtDt: timeToString(),
          delNo: userNo,
          delDt: timeToString(),
        })
        .where(and(
          eq(ctgrySbcrMpng.ctgryNo, ctgryNo),
          eq(ctgrySbcrMpng.sbcrNo, sbcrNo),
          eq(ctgrySbcrMpng.useYn, ynEnumSchema.enum.Y),
          eq(ctgrySbcrMpng.delYn, ynEnumSchema.enum.N)
        ));

      return {
        rowsAffected: deletedRow.rowCount || 0,
        affectedRows: deletedRow.rowCount
          ? [ ctgryNo, ]
          : [],
      };
    }
    catch {
      return null;
    }
  }

  /**
   * @description 카테고리 구독 목록 삭제
   * @param userNo 사용자 번호
   * @param updateData 카테고리 구독 목록 삭제 데이터
   */
  async multipleDeleteCategorySubscribe(userNo: number, updateData: MultipleDeleteCategorySubscribeDto): Promise<MutationResponseDto | null> {
    try {
      const { ctgrySbcrNoList, } = updateData;

      const deletedRows = await this.db.transaction((context) => {
        return context
          .update(ctgrySbcrMpng)
          .set({
            useYn: ynEnumSchema.enum.N,
            delYn: ynEnumSchema.enum.Y,
            updtNo: userNo,
            updtDt: timeToString(),
            delNo: userNo,
            delDt: timeToString(),
          })
          .where(inArray(ctgrySbcrMpng.ctgrySbcrNo, ctgrySbcrNoList));
      });

      return {
        rowsAffected: deletedRows.rowCount || 0,
        affectedRows: deletedRows.rowCount
          ? ctgrySbcrNoList
          : [],
      };
    }
    catch {
      return null;
    }
  }
}
