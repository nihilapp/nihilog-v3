import { Inject, Injectable } from '@nestjs/common';
import { and, asc, eq, inArray, sql } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { ListDto } from '@/dto/response.dto';
import { UpdateSubscribeDto, CreateSubscribeDto, SearchSubscribeDto, UserSubscribeDto } from '@/dto/subscribe.dto';
import { DRIZZLE } from '@/endpoints/drizzle/drizzle.module';
import { schemas } from '@/endpoints/drizzle/schemas';
import { CategorySubscribeRepository } from '@/endpoints/repositories/category-subscribe.repository';
import { TagSubscribeRepository } from '@/endpoints/repositories/tag-subscribe.repository';
import { likes } from '@/utils/ormHelper';
import { pageHelper } from '@/utils/pageHelper';
import { isEmptyString } from '@/utils/stringHelper';
import { timeToString } from '@/utils/timeHelper';

const { userInfo, userSbcrInfo, tagSbcrMpng, ctgrySbcrMpng, ctgryInfo, tagInfo, } = schemas;

// 공용 구독 정보 select 매핑
const userSubscribeSelect = {
  sbcrNo: userSbcrInfo.sbcrNo,
  userNo: userSbcrInfo.userNo,
  emlNtfyYn: userSbcrInfo.emlNtfyYn,
  newPstNtfyYn: userSbcrInfo.newPstNtfyYn,
  cmntRplNtfyYn: userSbcrInfo.cmntRplNtfyYn,
  useYn: userSbcrInfo.useYn,
  delYn: userSbcrInfo.delYn,
  crtNo: userSbcrInfo.crtNo,
  crtDt: userSbcrInfo.crtDt,
  updtNo: userSbcrInfo.updtNo,
  updtDt: userSbcrInfo.updtDt,
  delNo: userSbcrInfo.delNo,
  delDt: userSbcrInfo.delDt,
} as const;

// 리스트 조회용 select 매핑 (totalCnt 및 사용자 정보 포함)
const userSubscribeSelectWithTotal = {
  ...userSubscribeSelect,
  emlAddr: userInfo.emlAddr,
  userNm: userInfo.userNm,
  totalCnt: sql<number>`count(1) over()`.as('totalCnt'),
} as const;

// GROUP BY용 컬럼 목록
const userSubscribeGroupByColumns = [
  userSbcrInfo.sbcrNo,
  userSbcrInfo.userNo,
  userSbcrInfo.emlNtfyYn,
  userSbcrInfo.newPstNtfyYn,
  userSbcrInfo.cmntRplNtfyYn,
  userSbcrInfo.useYn,
  userSbcrInfo.delYn,
  userSbcrInfo.crtNo,
  userSbcrInfo.crtDt,
  userSbcrInfo.updtNo,
  userSbcrInfo.updtDt,
  userSbcrInfo.delNo,
  userSbcrInfo.delDt,
  userInfo.emlAddr,
  userInfo.userNm,
] as const;

@Injectable()
export class SubscribeRepository {
  constructor(
    @Inject(DRIZZLE)
    private readonly db: NodePgDatabase<typeof schemas>,
    private readonly tagSbcrRepo: TagSubscribeRepository,
    private readonly categorySbcrRepo: CategorySubscribeRepository
  ) { }

  /**
   * @description 사용자 구독 정보 조회 (단일 쿼리 최적화)
   * @param userNo 사용자 번호
   */
  async getUserSubscribeByUserNo(userNo: number): Promise<UserSubscribeDto | null> {
    try {
      const [ result, ] = await this.db
        .select({
          ...userSubscribeSelect,
          emlAddr: userInfo.emlAddr,
          userNm: userInfo.userNm,
          sbcrTagList: sql<Array<{ tagNo: number; tagNm: string }> | null>`
            COALESCE(
              json_agg(
                DISTINCT jsonb_build_object(
                  'tagNo', ${tagSbcrMpng.tagNo},
                  'tagNm', ${tagInfo.tagNm}
                )
              ) FILTER (WHERE ${tagSbcrMpng.tagNo} IS NOT NULL),
              '[]'::jsonb
            )
          `,
          sbcrCtgryList: sql<Array<{ ctgryNo: number; ctgryNm: string }> | null>`
            COALESCE(
              json_agg(
                DISTINCT jsonb_build_object(
                  'ctgryNo', ${ctgrySbcrMpng.ctgryNo},
                  'ctgryNm', ${ctgryInfo.ctgryNm}
                )
              ) FILTER (WHERE ${ctgrySbcrMpng.ctgryNo} IS NOT NULL),
              '[]'::jsonb
            )
          `,
        })
        .from(userSbcrInfo)
        .innerJoin(
          userInfo,
          eq(userSbcrInfo.userNo, userInfo.userNo)
        )
        .leftJoin(
          tagSbcrMpng,
          and(
            eq(userSbcrInfo.sbcrNo, tagSbcrMpng.sbcrNo),
            eq(tagSbcrMpng.delYn, 'N')
          )
        )
        .leftJoin(
          tagInfo,
          and(
            eq(tagSbcrMpng.tagNo, tagInfo.tagNo),
            eq(tagInfo.delYn, 'N')
          )
        )
        .leftJoin(
          ctgrySbcrMpng,
          and(
            eq(userSbcrInfo.sbcrNo, ctgrySbcrMpng.sbcrNo),
            eq(ctgrySbcrMpng.delYn, 'N')
          )
        )
        .leftJoin(
          ctgryInfo,
          and(
            eq(ctgrySbcrMpng.ctgryNo, ctgryInfo.ctgryNo),
            eq(ctgryInfo.delYn, 'N')
          )
        )
        .where(eq(userSbcrInfo.userNo, userNo))
        .groupBy(...userSubscribeGroupByColumns);

      return result || null;
    }
    catch {
      return null;
    }
  }

  /**
   * @description 사용자 구독 정보 수정
   * @param userNo 사용자 번호
   * @param updateData 수정 데이터
   */
  async updateUserSubscribe(userNo: number, updateData: UpdateSubscribeDto): Promise<UserSubscribeDto | null> {
    try {
      const [ updatedSubscribe, ] = await this.db
        .update(userSbcrInfo)
        .set(updateData)
        .where(eq(userSbcrInfo.userNo, userNo))
        .returning(userSubscribeSelect);

      return updatedSubscribe;
    }
    catch {
      return null;
    }
  }

  // ===== 관리자 구독 설정 관련 메서드 =====

  /**
   * @description 전체 사용자 구독 설정 목록 조회 (단일 쿼리 최적화)
   * @param searchData 검색 조건
   */
  async getSubscribeList(searchData: SearchSubscribeDto & Partial<UserSubscribeDto>): Promise<ListDto<UserSubscribeDto>> {
    try {
      const { page, strtRow, endRow, srchType, srchKywd, delYn, } = searchData;

      // 검색 조건 구성
      const searchConditions: Record<string, string> = {};
      if (!isEmptyString(srchKywd) && srchType) {
        searchConditions[srchType] = srchKywd;
      }

      const whereConditions = [
        ...likes(userInfo, searchConditions),
        eq(userSbcrInfo.delYn, delYn || 'N'),
      ];

      const result = await this.db
        .select({
          ...userSubscribeSelectWithTotal,
          sbcrTagList: sql<Array<{ tagNo: number; tagNm: string }> | null>`
            COALESCE(
              json_agg(
                DISTINCT jsonb_build_object(
                  'tagNo', ${tagSbcrMpng.tagNo},
                  'tagNm', ${tagInfo.tagNm}
                )
              ) FILTER (WHERE ${tagSbcrMpng.tagNo} IS NOT NULL),
              '[]'::jsonb
            )
          `,
          sbcrCtgryList: sql<Array<{ ctgryNo: number; ctgryNm: string }> | null>`
            COALESCE(
              json_agg(
                DISTINCT jsonb_build_object(
                  'ctgryNo', ${ctgrySbcrMpng.ctgryNo},
                  'ctgryNm', ${ctgryInfo.ctgryNm}
                )
              ) FILTER (WHERE ${ctgrySbcrMpng.ctgryNo} IS NOT NULL),
              '[]'::jsonb
            )
          `,
        })
        .from(userSbcrInfo)
        .innerJoin(
          userInfo,
          eq(userSbcrInfo.userNo, userInfo.userNo)
        )
        .leftJoin(
          tagSbcrMpng,
          and(
            eq(userSbcrInfo.sbcrNo, tagSbcrMpng.sbcrNo),
            eq(tagSbcrMpng.delYn, 'N')
          )
        )
        .leftJoin(
          tagInfo,
          and(
            eq(tagSbcrMpng.tagNo, tagInfo.tagNo),
            eq(tagInfo.delYn, 'N')
          )
        )
        .leftJoin(
          ctgrySbcrMpng,
          and(
            eq(userSbcrInfo.sbcrNo, ctgrySbcrMpng.sbcrNo),
            eq(ctgrySbcrMpng.delYn, 'N')
          )
        )
        .leftJoin(
          ctgryInfo,
          and(
            eq(ctgrySbcrMpng.ctgryNo, ctgryInfo.ctgryNo),
            eq(ctgryInfo.delYn, 'N')
          )
        )
        .where(and(...whereConditions))
        .groupBy(...userSubscribeGroupByColumns)
        .orderBy(asc(userSbcrInfo.sbcrNo))
        .limit(pageHelper(page, strtRow, endRow).limit)
        .offset(pageHelper(page, strtRow, endRow).offset);

      return {
        list: result ?? [],
        totalCnt: result?.[0]?.totalCnt ?? 0,
      };
    }
    catch {
      return {
        list: [],
        totalCnt: 0,
      };
    }
  }

  /**
   * @description 관리자가 사용자 구독 설정 생성
   * @param adminNo 관리자 번호
   * @param createData 구독 설정 생성 데이터
   */
  async createUserSubscribe(adminNo: number, createData: CreateSubscribeDto): Promise<UserSubscribeDto | null> {
    try {
      const [ newUserSubcribe, ] = await this.db
        .insert(userSbcrInfo)
        .values({
          userNo: createData.userNo,
          emlNtfyYn: createData.emlNtfyYn,
          newPstNtfyYn: createData.newPstNtfyYn,
          cmntRplNtfyYn: createData.cmntRplNtfyYn,
          useYn: 'Y',
          delYn: 'N',
          crtNo: adminNo,
          crtDt: timeToString(),
        })
        .returning(userSubscribeSelect);

      return newUserSubcribe;
    }
    catch {
      return null;
    }
  }

  /**
   * @description 관리자가 다수 사용자 구독 설정 일괄 수정
   * @param adminNo 관리자 번호
   * @param updateData 구독 설정 일괄 수정 데이터
   */
  async multipleUpdateUserSubscribe(adminNo: number, updateData: UpdateSubscribeDto): Promise<UserSubscribeDto> {
    try {
      const { userNoList, ...updateDataWithoutUserNoList } = updateData;

      const [ updatedSubscribe, ] = await this.db
        .update(userSbcrInfo)
        .set({
          ...updateDataWithoutUserNoList,
          updtNo: adminNo,
          updtDt: timeToString(),
        })
        .where(inArray(
          userSbcrInfo.userNo,
          userNoList || []
        ))
        .returning(userSubscribeSelect);

      return updatedSubscribe;
    }
    catch {
      return null;
    }
  }

  /**
   * @description 관리자가 사용자 구독 설정 삭제
   * @param adminNo 관리자 번호
   * @param sbcrNo 구독 번호
   */
  async deleteUserSubscribeBySbcrNo(adminNo: number, sbcrNo: number): Promise<boolean> {
    try {
      const deletedRows = await this.db
        .update(userSbcrInfo)
        .set({
          useYn: 'N',
          updtNo: adminNo,
          updtDt: timeToString(),
          delYn: 'Y',
          delNo: adminNo,
          delDt: timeToString(),
        })
        .where(eq(
          userSbcrInfo.sbcrNo,
          sbcrNo
        ));

      return deletedRows.rowCount > 0;
    }
    catch {
      return false;
    }
  }

  /**
   * @description 관리자가 다수 사용자 구독 설정 일괄 삭제
   * @param adminNo 관리자 번호
   * @param userNoList 사용자 번호 목록
   */
  async multipleDeleteUserSubscribe(adminNo: number, userNoList: number[]): Promise<boolean> {
    try {
      const deletedRows = await this.db
        .update(userSbcrInfo)
        .set({
          useYn: 'N',
          updtNo: adminNo,
          updtDt: timeToString(),
          delYn: 'Y',
          delNo: adminNo,
          delDt: timeToString(),
        })
        .where(inArray(userSbcrInfo.userNo, userNoList || []));

      return deletedRows.rowCount > 0;
    }
    catch {
      return false;
    }
  }
}
