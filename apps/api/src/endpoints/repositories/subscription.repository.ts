import { Inject, Injectable } from '@nestjs/common';
import { and, desc, eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UpdateSubscriptionDto, type CreateSubscriptionDto } from '@/dto/subscription.dto';
import { userInfo, userSbcrInfo } from '@/endpoints/drizzle/tables';
import { likes, updateColumns } from '@/utils/ormHelper';
import { pageHelper } from '@/utils/pageHelper';
import { timeToString } from '@/utils/timeHelper';
import { DRIZZLE } from '@drizzle/drizzle.module';
import { schemas } from '@drizzle/schemas';

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
   * @description 구독 목록 조회
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
   * @description 카테고리 번호로 구독 목록 조회
   * @param _ctgryNo 카테고리 번호
   */
  async getSubscriptionListByCategoryNo(_ctgryNo: number) {
    const result = await this.db
      .select({
        ...userSubscriptionSelect,
        emlAddr: userInfo.emlAddr,
        userNm: userInfo.userNm,
      })
      .from(userSbcrInfo)
      .innerJoin(
        userInfo,
        eq(userSbcrInfo.userNo, userInfo.userNo)
      )
      .where(and(
        eq(userSbcrInfo.delYn, 'N'),
        eq(userSbcrInfo.useYn, 'Y')
      ));

    return result;
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
    const currentTime = timeToString();

    const newSubscribe = await this.db
      .insert(userSbcrInfo)
      .values({
        userNo: createSubscriptionDto.userNo,
        emlNtfyYn: createSubscriptionDto.emlNtfyYn,
        newPstNtfyYn: createSubscriptionDto.newPstNtfyYn,
        cmntRplNtfyYn: createSubscriptionDto.cmntRplNtfyYn,
        sbcrCtgryList: JSON.stringify(createSubscriptionDto.sbcrCtgryList),
        sbcrTagList: JSON.stringify(createSubscriptionDto.sbcrTagList),
        crtDt: currentTime,
        updtDt: currentTime,
      })
      .returning(userSubscriptionSelect);

    return newSubscribe;
  }

  /**
   * @description 다수 구독 정보 일괄 생성
   * @param createSubscriptionDtoList 구독 생성 정보 목록
   */
  async multipleCreateSubscription(createSubscriptionDtoList: CreateSubscriptionDto[]) {
    // TODO: 다수 구독 정보 일괄 생성 로직 구현
    return [];
  }

  /**
   * @description 구독 정보 수정
   * @param updateSubscriptionDto 수정 정보
   */
  async updateSubscription(userNo: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    const updateValues = updateColumns(updateSubscriptionDto);

    if (Object.keys(updateValues).length === 0) {
      throw new Error('업데이트할 데이터가 없습니다.');
    }

    const [ result, ] = await this.db
      .update(userSbcrInfo)
      .set({
        ...updateValues,
        updtDt: timeToString(),
        sbcrCtgryList: updateValues.sbcrCtgryList
          ? JSON.stringify(updateValues.sbcrCtgryList)
          : undefined,
        sbcrTagList: updateValues.sbcrTagList
          ? JSON.stringify(updateValues.sbcrTagList)
          : undefined,
      })
      .where(eq(userSbcrInfo.userNo, userNo))
      .returning(userSubscriptionSelect);

    return result;
  }

  /**
   * @description 다수 구독 정보 일괄 수정
   * @param updateSubscriptionDtoList 구독 수정 정보 목록
   */
  async multipleUpdateSubscription(updateSubscriptionDtoList: UpdateSubscriptionDto[]) {
    // TODO: 다수 구독 정보 일괄 수정 로직 구현
    return [];
  }

  /**
   * @description 구독 정보 삭제
   * @param userNo 사용자 번호
   */
  async deleteSubscription(userNo: number) {
    const currentTime = timeToString();

    const [ result, ] = await this.db
      .update(userSbcrInfo)
      .set({
        useYn: 'N',
        delYn: 'Y',
        delDt: currentTime,
        delNo: userNo,
        updtDt: currentTime,
        updtNo: userNo,
      })
      .where(eq(userSbcrInfo.userNo, userNo))
      .returning(userSubscriptionSelect);

    return result || null;
  }

  /**
   * @description 다수 구독 정보 일괄 삭제
   * @param userNos 사용자 번호 목록
   */
  async multipleDeleteSubscription(userNos: number[]) {
    // TODO: 다수 구독 정보 일괄 삭제 로직 구현
    return [];
  }
}
