import { Inject, Injectable } from '@nestjs/common';
import { asc, eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UpdateSubscribeDto, type UserSubscribeDto } from '@/dto/subscribe.dto';
import { DRIZZLE } from '@drizzle/drizzle.module';
import { schemas } from '@drizzle/schemas';

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

@Injectable()
export class SubscribeRepository {
  constructor(@Inject(DRIZZLE)
  private readonly db: NodePgDatabase<typeof schemas>) { }

  /**
   * 사용자 구독 정보 조회
   * @param userNo 사용자 번호
   */
  async getUserSubscribeByUserNo(userNo: number): Promise<UserSubscribeDto> {
    const sbcrTagList = await this.db
      .select({
        tagNo: tagSbcrMpng.tagNo,
        tagNm: tagInfo.tagNm,
      })
      .from(tagSbcrMpng)
      .innerJoin(tagInfo, eq(tagSbcrMpng.tagNo, tagInfo.tagNo))
      .where(eq(
        tagSbcrMpng.sbcrNo,
        userSbcrInfo.sbcrNo
      ))
      .orderBy(asc(tagSbcrMpng.tagNo));

    const sbcrCtgryList = await this.db
      .select({
        ctgryNo: ctgrySbcrMpng.ctgryNo,
        ctgryNm: ctgryInfo.ctgryNm,
      })
      .from(ctgrySbcrMpng)
      .innerJoin(ctgryInfo, eq(ctgrySbcrMpng.ctgryNo, ctgryInfo.ctgryNo))
      .where(eq(
        ctgrySbcrMpng.sbcrNo,
        userSbcrInfo.sbcrNo
      ))
      .orderBy(asc(ctgrySbcrMpng.ctgryNo));

    const [ subscribe, ] = await this.db
      .select({
        ...userSubscribeSelect,
        emlAddr: userInfo.emlAddr,
        userNm: userInfo.userNm,
      })
      .from(userSbcrInfo)
      .innerJoin(
        userInfo,
        eq(userSbcrInfo.userNo, userInfo.userNo)
      )
      .where(eq(userSbcrInfo.userNo, userNo));

    return {
      ...subscribe,
      sbcrTagList,
      sbcrCtgryList,
    };
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
}
