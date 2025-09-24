import { Inject, Injectable } from '@nestjs/common';
import { and, desc, eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UpdateSubscriptionDto, type CreateSubscriptionDto } from '@/dto/subscription.dto';
import { userInfo, userSbcrInfo } from '@/endpoints/drizzle/tables';
import { likes, updateColumns } from '@/utils/ormHelper';
import { equals } from '@/utils/ormHelper';
import { pageHelper } from '@/utils/pageHelper';
import { timeToString } from '@/utils/timeHelper';
import { DRIZZLE } from '@drizzle/drizzle.module';
import { schemas } from '@drizzle/schemas';
import { UserSubscriptionType } from '@drizzle/schemas/subscription.schema';

// 공용 구독 정보 select 매핑
const userSubscriptionSelect = {
  sbcrNo: userSbcrInfo.sbcrNo,
  userNo: userSbcrInfo.userNo,
  emlNtfyYn: userSbcrInfo.emlNtfyYn,
  newPstNtfyYn: userSbcrInfo.newPstNtfyYn,
  cmntRplNtfyYn: userSbcrInfo.cmntRplNtfyYn,
  sbcrCtgryList: userSbcrInfo.sbcrCtgryList,
  sbcrTagList: userSbcrInfo.sbcrTagList,
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
export class SubscriptionRepository {
  constructor(@Inject(DRIZZLE)
  private readonly db: NodePgDatabase<typeof schemas>) { }

  /**
   * @description 구독 정보 다건 조회
   * @param page 페이지 번호
   * @param strtRow 시작 행
   * @param endRow 종료 행
   * @param srchType 검색 타입
   * @param srchKywd 검색 키워드
   */
  async getSubscriptionList(
    page: number,
    strtRow: number,
    endRow: number,
    srchType: string,
    srchKywd: '' | 'emlAddr' | 'userNm'
  ) {
    const pagination = pageHelper(
      page,
      endRow,
      strtRow
    );

    const subscription = await this.db
      .select({
        ...userSubscriptionSelect,
        emlAddr: userInfo.emlAddr,
        userNm: userInfo.userNm,
      })
      .from(userSbcrInfo)
      .innerJoin(
        userInfo,
        eq(
          userSbcrInfo.userNo,
          userInfo.userNo
        )
      )
      .where(and(...likes(
        userInfo,
        {
          [srchType]: srchKywd,
        }
      )))
      .orderBy(desc(userSbcrInfo.sbcrNo))
      .limit(pagination.limit)
      .offset(pagination.offset);

    return subscription;
  }

  /**
   * @description 사용자 번호로 구독 정보 조회
   * @param userNo 사용자 번호
   */
  async getSubscriptionByUserNo(userNo: number) {
    const [ subscription, ] = await this.db
      .select({
        ...userSubscriptionSelect,
        emlAddr: userInfo.emlAddr,
        userNm: userInfo.userNm,
      })
      .from(userSbcrInfo)
      .innerJoin(
        userInfo,
        eq(
          userSbcrInfo.userNo,
          userInfo.userNo
        )
      )
      .where(and(eq(
        userSbcrInfo.userNo,
        userNo
      )));

    return subscription;
  }

  /**
   * @description 구독 정보 생성
   * @param createSubscriptionDto 생성 정보
   */
  async createSubscription(createSubscriptionDto: CreateSubscriptionDto) {
    const newSubscribe = await this.db
      .insert(userSbcrInfo)
      .values({
        userNo: createSubscriptionDto.userNo,
        emlNtfyYn: createSubscriptionDto.emlNtfyYn,
        newPstNtfyYn: createSubscriptionDto.newPstNtfyYn,
        cmntRplNtfyYn: createSubscriptionDto.cmntRplNtfyYn,
        sbcrCtgryList: createSubscriptionDto.sbcrCtgryList,
        sbcrTagList: createSubscriptionDto.sbcrTagList,
      })
      .returning(userSubscriptionSelect);

    return newSubscribe;
  }

  /**
   * @description 구독 정보 수정
   * @param updateSubscriptionDto 수정 정보
   */
  async updateSubscription(updateSubscriptionDto: UpdateSubscriptionDto) {

  }

  /**
   * @description 구독 정보 삭제
   * @param userNo 사용자 번호
   */
  async deleteSubscription(userNo: number) {

  }

  /**
   * @description 카테고리 번호로 구독 정보 조회
   * @param ctgryNo 카테고리 번호
   */
  async getSubscribersByCategoryNo(ctgryNo: number) {

  }

  // TODO: 구독 관련 메서드들 구현 예정
  // - findSubscription: 구독 정보 조회
  // - createSubscription: 구독 정보 생성
  // - updateSubscription: 구독 정보 수정
  // - deleteSubscription: 구독 정보 삭제
}
