import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UpdateSubscriptionDto } from '@/dto/subscription.dto';
import { userSubscribeInfo } from '@/endpoints/drizzle/tables/user-subscribe-info.table';
import { updateColumns } from '@/utils/ormHelper';
import { equals } from '@/utils/ormHelper';
import { timeToString } from '@/utils/timeHelper';
import { DRIZZLE } from '@drizzle/drizzle.module';
import { schemas } from '@drizzle/schemas';
import { UserSubscriptionType } from '@drizzle/schemas/subscription.schema';

// 공용 구독 정보 select 매핑
const userSubscriptionSelect = {
  sbcrNo: userSubscribeInfo.sbcrNo,
  userNo: userSubscribeInfo.userNo,
  emlNtfyYn: userSubscribeInfo.emlNtfyYn,
  newPstNtfyYn: userSubscribeInfo.newPstNtfyYn,
  cmntRplNtfyYn: userSubscribeInfo.cmntRplNtfyYn,
  sbcrCtgryList: userSubscribeInfo.sbcrCtgryList,
  sbcrTagList: userSubscribeInfo.sbcrTagList,
  useYn: userSubscribeInfo.useYn,
  delYn: userSubscribeInfo.delYn,
  crtNo: userSubscribeInfo.crtNo,
  crtDt: userSubscribeInfo.crtDt,
  updtNo: userSubscribeInfo.updtNo,
  updtDt: userSubscribeInfo.updtDt,
  delNo: userSubscribeInfo.delNo,
  delDt: userSubscribeInfo.delDt,
} as const;

@Injectable()
export class SubscriptionRepository {
  constructor(
    @Inject(DRIZZLE)
    private readonly db: NodePgDatabase<typeof schemas>
  ) {}

  // TODO: 구독 관련 메서드들 구현 예정
  // - findSubscription: 구독 정보 조회
  // - createSubscription: 구독 정보 생성
  // - updateSubscription: 구독 정보 수정
  // - deleteSubscription: 구독 정보 삭제
}
