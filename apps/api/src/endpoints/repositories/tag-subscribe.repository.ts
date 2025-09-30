import { Inject, Injectable } from '@nestjs/common';
import { and, asc, eq, inArray, sql } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { TagSubscribeDto, CreateTagSubscribeDto, MultipleCreateTagSubscribeDto, MultipleDeleteTagSubscribeDto, MultipleUpdateTagSubscribeDto, SearchTagSubscribeDto, TagSubscribeItemDto, UpdateTagSubscribeDto } from '@/dto';
import type { ListDto, MutationResponseDto } from '@/dto/response.dto';
import { DRIZZLE } from '@/endpoints/drizzle/drizzle.module';
import { schemas } from '@/endpoints/drizzle/schemas';
import { ynEnumSchema } from '@/endpoints/drizzle/schemas/common.schema';
import { likes } from '@/utils/ormHelper';
import { pageHelper } from '@/utils/pageHelper';
import { isEmptyString } from '@/utils/stringHelper';
import { timeToString } from '@/utils/timeHelper';

const { tagSbcrMpng, tagInfo, userSbcrInfo, } = schemas;

const select = {
  rowNo: sql<number>`row_number() over (order by ${tagSbcrMpng.tagSbcrNo} desc)`.as('rowNo'),
  totalCnt: sql<number>`count(1) over ()`.as('totalCnt'),
  tagSbcrNo: tagSbcrMpng.tagSbcrNo,
  tagNo: tagSbcrMpng.tagNo,
  sbcrNo: tagSbcrMpng.sbcrNo,
  delYn: tagSbcrMpng.delYn,
  useYn: tagSbcrMpng.useYn,
  crtNo: tagSbcrMpng.crtNo,
  crtDt: tagSbcrMpng.crtDt,
  updtNo: tagSbcrMpng.updtNo,
  updtDt: tagSbcrMpng.updtDt,
  delNo: tagSbcrMpng.delNo,
  delDt: tagSbcrMpng.delDt,
};

const selectWithJoin = {
  rowNo: sql<number>`row_number() over (order by ${tagSbcrMpng.tagSbcrNo} desc)`.as('rowNo'),
  totalCnt: sql<number>`count(1) over ()`.as('totalCnt'),
  tagSbcrNo: tagSbcrMpng.tagSbcrNo,
  tagNo: tagSbcrMpng.tagNo,
  sbcrNo: tagSbcrMpng.sbcrNo,
  tagNm: tagInfo.tagNm,
  delYn: tagSbcrMpng.delYn,
  useYn: tagSbcrMpng.useYn,
  crtNo: tagSbcrMpng.crtNo,
  crtDt: tagSbcrMpng.crtDt,
  updtNo: tagSbcrMpng.updtNo,
  updtDt: tagSbcrMpng.updtDt,
  delNo: tagSbcrMpng.delNo,
  delDt: tagSbcrMpng.delDt,
} as const;

@Injectable()
export class TagSubscribeRepository {
  constructor(@Inject(DRIZZLE)
  private readonly db: NodePgDatabase<typeof schemas>) { }

  /**
   * @description 태그 구독 전체 이력 조회
   * @param searchData 검색 데이터
   */
  async getTagSubscribeList(searchData: SearchTagSubscribeDto & Partial<TagSubscribeDto>): Promise<ListDto<TagSubscribeDto>> {
    try {
      const { page, strtRow, endRow, srchType, srchKywd, delYn, sbcrNo, tagNo, tagSbcrNoList, } = searchData;

      const searchConditions: Record<string, string> = {};
      if (!isEmptyString(srchKywd) && srchType) {
        searchConditions[srchType] = srchKywd;
      }

      const whereConditions = [
        ...likes(tagSbcrMpng, searchConditions),
        eq(tagSbcrMpng.delYn, delYn || 'N'),
      ];

      if (sbcrNo) {
        whereConditions.push(eq(tagSbcrMpng.sbcrNo, sbcrNo));
      }

      if (tagNo) {
        whereConditions.push(eq(tagSbcrMpng.tagNo, tagNo));
      }

      if (tagSbcrNoList && tagSbcrNoList.length > 0) {
        whereConditions.push(inArray(tagSbcrMpng.tagSbcrNo, tagSbcrNoList));
      }

      const list = await this.db
        .select(selectWithJoin)
        .from(tagSbcrMpng)
        .innerJoin(
          tagInfo,
          eq(tagSbcrMpng.tagNo, tagInfo.tagNo)
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
   * @description 태그 구독 번호로 태그 구독 조회
   * @param tagSbcrNo 태그 구독 번호
   */
  async getTagSubscribeByTagSbcrNo(tagSbcrNo: number): Promise<TagSubscribeDto | null> {
    try {
      const [ subscribe, ] = await this.db
        .select(selectWithJoin)
        .from(tagSbcrMpng)
        .innerJoin(
          tagInfo,
          eq(tagSbcrMpng.tagNo, tagInfo.tagNo)
        )
        .where(eq(tagSbcrMpng.tagSbcrNo, tagSbcrNo));

      return subscribe;
    }
    catch {
      return null;
    }
  }

  /**
   * @description 구독 태그 목록 조회
   * @param sbcrNo 구독 번호
   */
  async getTagSubscribeItemListBySbcrNo(sbcrNo: number): Promise<TagSubscribeItemDto[]> {
    try {
      const itemList = await this.db
        .select({
          tagNo: tagSbcrMpng.tagNo,
          tagNm: tagInfo.tagNm,
        })
        .from(tagSbcrMpng)
        .innerJoin(tagInfo, and(
          eq(
            tagSbcrMpng.tagNo,
            tagInfo.tagNo
          ),
          eq(tagInfo.delYn, 'N')
        ))
        .where(and(
          eq(
            tagSbcrMpng.sbcrNo,
            sbcrNo
          ),
          eq(tagSbcrMpng.delYn, 'N')
        ))
        .orderBy(asc(tagSbcrMpng.tagNo));

      return itemList;
    }
    catch {
      return [];
    }
  }

  /**
   * @description 사용자가 구독한 태그 목록 조회
   * @param userNo 사용자 번호
   * @param searchData 검색 데이터
   */
  async getTagSubscribeByUserNo(
    userNo: number,
    searchData: SearchTagSubscribeDto & Partial<TagSubscribeDto>
  ): Promise<ListDto<TagSubscribeDto>> {
    try {
      const { page, strtRow, endRow, srchType, srchKywd, delYn, } = searchData;

      const searchConditions: Record<string, string> = {};
      if (!isEmptyString(srchKywd) && srchType) {
        searchConditions[srchType] = srchKywd;
      }

      const whereConditions = [
        ...likes(tagSbcrMpng, searchConditions),
        eq(userSbcrInfo.userNo, userNo),
        eq(tagSbcrMpng.delYn, delYn || 'N'),
      ];

      const list = await this.db
        .select(selectWithJoin)
        .from(tagSbcrMpng)
        .innerJoin(
          tagInfo,
          eq(tagSbcrMpng.tagNo, tagInfo.tagNo)
        )
        .innerJoin(
          userSbcrInfo,
          eq(tagSbcrMpng.sbcrNo, userSbcrInfo.sbcrNo)
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
   * @description 태그 구독 조회
   * @param tagNo 태그 번호
   * @param searchData 검색 데이터
   */
  async getTagSubscribeByTagNo(
    tagNo: number,
    searchData: SearchTagSubscribeDto & Partial<TagSubscribeDto>
  ): Promise<ListDto<TagSubscribeDto>> {
    try {
      const { page, strtRow, endRow, srchType, srchKywd, delYn, } = searchData;

      const searchConditions: Record<string, string> = {};
      if (!isEmptyString(srchKywd) && srchType) {
        searchConditions[srchType] = srchKywd;
      }

      const whereConditions = [
        ...likes(tagSbcrMpng, searchConditions),
        eq(tagSbcrMpng.tagNo, tagNo),
        eq(tagSbcrMpng.delYn, delYn || 'N'),
      ];

      const list = await this.db
        .select(selectWithJoin)
        .from(tagSbcrMpng)
        .innerJoin(
          tagInfo,
          eq(tagSbcrMpng.tagNo, tagInfo.tagNo)
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
   * @description 태그 구독 생성
   * @param userNo 사용자 번호
   * @param createData 태그 구독 생성 데이터
   */
  async createTagSubscribe(
    userNo: number,
    createData: CreateTagSubscribeDto
  ): Promise<TagSubscribeDto | null> {
    try {
      const { sbcrNo, tagNo, } = createData;

      const [ createSubscribe, ] = await this.db
        .insert(tagSbcrMpng)
        .values({
          sbcrNo,
          tagNo,
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
   * @description 태그 구독 목록 생성
   * @param userNo 사용자 번호
   * @param createData 태그 구독 생성 데이터
   */
  async multipleCreateTagSubscribe(
    userNo: number,
    createData: MultipleCreateTagSubscribeDto
  ): Promise<TagSubscribeDto[] | null> {
    try {
      const { sbcrNo, tagNoList, } = createData;

      const subscribeList = await this.db.transaction(async (context) => {
        return await context
          .insert(tagSbcrMpng)
          .values(tagNoList.map((item) => ({
            sbcrNo,
            tagNo: item,
            useYn: ynEnumSchema.enum.Y,
            delYn: ynEnumSchema.enum.N,
            crtNo: userNo,
            crtDt: timeToString(),
            updtNo: userNo,
            updtDt: timeToString(),
          })))
          .onConflictDoUpdate({
            target: [ tagSbcrMpng.sbcrNo, tagSbcrMpng.tagNo, ],
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
   * @description 태그 구독 수정
   * @param userNo 사용자 번호
   * @param updateData 태그 구독 수정 데이터
   */
  async updateTagSubscribe(
    userNo: number,
    updateData: UpdateTagSubscribeDto
  ): Promise<TagSubscribeDto | null> {
    try {
      const { tagSbcrNo, useYn, delYn, } = updateData;

      const [ updateSubscribe, ] = await this.db
        .update(tagSbcrMpng)
        .set({
          useYn,
          delYn,
          updtNo: userNo,
          updtDt: timeToString(),
        })
        .where(eq(tagSbcrMpng.tagSbcrNo, tagSbcrNo))
        .returning(select);

      return updateSubscribe;
    }
    catch {
      return null;
    }
  }

  /**
   * @description 태그 구독 목록 수정
   * @param userNo 사용자 번호
   * @param updateData 태그 구독 수정 데이터
   */
  async multipleUpdateTagSubscribe(
    userNo: number,
    updateData: MultipleUpdateTagSubscribeDto
  ): Promise<TagSubscribeDto[] | null> {
    try {
      const { sbcrNo, useYn, delYn, tagSbcrNoList, } = updateData;

      const subscribeList = await this.db.transaction(async (context) => {
        return await context
          .update(tagSbcrMpng)
          .set({
            useYn,
            delYn,
            updtNo: userNo,
            updtDt: timeToString(),
          })
          .where(and(
            eq(tagSbcrMpng.sbcrNo, sbcrNo),
            inArray(tagSbcrMpng.tagSbcrNo, tagSbcrNoList)
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
   * @description 태그 구독 삭제
   * @param userNo 사용자 번호
   * @param updateData 태그 구독 삭제 데이터
   */
  async deleteTagSubscribe(
    userNo: number,
    updateData: UpdateTagSubscribeDto
  ): Promise<MutationResponseDto | null> {
    try {
      const { tagSbcrNo, useYn, delYn, } = updateData;

      const deletedRow = await this.db
        .update(tagSbcrMpng)
        .set({
          useYn: ynEnumSchema.enum.N,
          delYn: ynEnumSchema.enum.Y,
          updtNo: userNo,
          updtDt: timeToString(),
          delNo: userNo,
          delDt: timeToString(),
        })
        .where(and(
          eq(tagSbcrMpng.tagSbcrNo, tagSbcrNo),
          eq(tagSbcrMpng.useYn, useYn || ynEnumSchema.enum.Y),
          eq(tagSbcrMpng.delYn, delYn || ynEnumSchema.enum.N)
        ));

      return {
        rowsAffected: deletedRow.rowCount || 0,
        affectedRows: deletedRow.rowCount
          ? [ tagSbcrNo, ]
          : [],
      };
    }
    catch {
      return null;
    }
  }

  /**
   * @description 태그 구독 번호로 태그 구독 삭제
   * @param userNo 사용자 번호
   * @param tagSbcrNo 태그 구독 번호
   */
  async deleteTagSubscribeByTagSbcrNo(
    userNo: number,
    tagSbcrNo: number
  ): Promise<MutationResponseDto | null> {
    try {
      const deletedRow = await this.db
        .update(tagSbcrMpng)
        .set({
          useYn: ynEnumSchema.enum.N,
          delYn: ynEnumSchema.enum.Y,
          updtNo: userNo,
          updtDt: timeToString(),
          delNo: userNo,
          delDt: timeToString(),
        })
        .where(and(
          eq(tagSbcrMpng.tagSbcrNo, tagSbcrNo),
          eq(tagSbcrMpng.useYn, ynEnumSchema.enum.Y),
          eq(tagSbcrMpng.delYn, ynEnumSchema.enum.N)
        ));

      return {
        rowsAffected: deletedRow.rowCount || 0,
        affectedRows: deletedRow.rowCount
          ? [ tagSbcrNo, ]
          : [],
      };
    }
    catch {
      return null;
    }
  }

  /**
   * @description 태그 구독 목록 삭제
   * @param userNo 사용자 번호
   * @param updateData 태그 구독 목록 삭제 데이터
   */
  async multipleDeleteTagSubscribe(
    userNo: number,
    updateData: MultipleDeleteTagSubscribeDto
  ): Promise<MutationResponseDto | null> {
    try {
      const { tagSbcrNoList, } = updateData;

      const deletedRows = await this.db.transaction((context) => {
        return context
          .update(tagSbcrMpng)
          .set({
            useYn: ynEnumSchema.enum.N,
            delYn: ynEnumSchema.enum.Y,
            updtNo: userNo,
            updtDt: timeToString(),
            delNo: userNo,
            delDt: timeToString(),
          })
          .where(inArray(tagSbcrMpng.tagSbcrNo, tagSbcrNoList));
      });

      return {
        rowsAffected: deletedRows.rowCount || 0,
        affectedRows: deletedRows.rowCount
          ? tagSbcrNoList
          : [],
      };
    }
    catch {
      return null;
    }
  }
}
