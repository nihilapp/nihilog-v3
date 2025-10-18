import { Injectable } from '@nestjs/common';

import { MESSAGE } from '@/code/messages';
import type { DeleteSubscribeDto } from '@/dto';
import type { AnalyzeStatDto } from '@/dto/common.dto';
import type { ListDto } from '@/dto/response.dto';
import {
  CreateSubscribeDto,
  UpdateSubscribeDto,
  type SearchSubscribeDto
} from '@/dto/subscribe.dto';
import { searchSubscribeSchema } from '@/endpoints/prisma/schemas/subscribe.schema';
import type { MultipleResultType, RepoResponseType } from '@/endpoints/prisma/types/common.types';
import type {
  SelectUserSbcrInfoType,
  SelectUserSbcrInfoListItemType,
  AnalyzeSubscribeStatItemType,
  SubscribeNotificationDistributionItemType,
  TotalActiveNotificationUsersItemType,
  TotalInactiveNotificationUsersItemType
} from '@/endpoints/prisma/types/subscribe.types';
import { SubscribeRepository } from '@/endpoints/repositories/subscribe.repository';
import { prismaResponse } from '@/utils/prismaResponse';

@Injectable()
export class AdminSubscribeService {
  constructor(private readonly subscribeRepository: SubscribeRepository) {}

  // ========================================================
  // 구독 설정 통계 관련 메서드
  // ========================================================

  /**
   * @description 구독 설정 분석 통계 (6개 지표 통합)
   * @param analyzeStatData 분석 통계 데이터
   */
  async adminGetAnalyzeSubscribeData(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<AnalyzeSubscribeStatItemType[]> | null> {
    return this.subscribeRepository.getAnalyzeSubscribeData(analyzeStatData);
  }

  /**
   * @description 알림 설정별 분포 통계
   */
  async adminGetSubscribeNotificationDistribution(): Promise<RepoResponseType<SubscribeNotificationDistributionItemType[]> | null> {
    return this.subscribeRepository.getSubscribeNotificationDistribution();
  }

  /**
   * @description 전체 알림 활성 사용자 수 통계
   * @param analyzeStatData 분석 통계 데이터
   */
  async adminGetTotalActiveNotificationUsers(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<TotalActiveNotificationUsersItemType[]> | null> {
    return this.subscribeRepository.getTotalActiveNotificationUsers(analyzeStatData);
  }

  /**
   * @description 전체 알림 비활성 사용자 수 통계
   * @param analyzeStatData 분석 통계 데이터
   */
  async adminGetTotalInactiveNotificationUsers(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<TotalInactiveNotificationUsersItemType[]> | null> {
    return this.subscribeRepository.getTotalInactiveNotificationUsers(analyzeStatData);
  }

  // ========================================================
  // 기존 구독 설정 관리 메서드
  // ========================================================

  /**
   * @description 전체 사용자 구독 설정 목록 조회
   * @param searchData 검색 조건
   */
  async adminGetUserSubscribeList(searchData: SearchSubscribeDto): Promise<RepoResponseType<ListDto<SelectUserSbcrInfoListItemType>> | null> {
    const safeData = searchSubscribeSchema.safeParse(searchData);

    if (!safeData.success) {
      return prismaResponse(
        false,
        null,
        'BAD_REQUEST',
        MESSAGE.COMMON.INVALID_REQUEST
      );
    }

    return this.subscribeRepository.getSubscribeList(safeData.data);
  }

  /**
   * @description 특정 사용자 구독 설정 조회
   * @param userNo 사용자 번호
   */
  async getUserSubscribeByUserNo(userNo: number): Promise<RepoResponseType<SelectUserSbcrInfoType> | null> {
    return this.subscribeRepository.getUserSubscribeByUserNo(userNo);
  }

  /**
   * @description 관리자가 특정 사용자 구독 설정 생성
   * @param adminNo 관리자 번호
   * @param createData 구독 설정 생성 정보
   */
  async adminCreateUserSubscribe(
    adminNo: number,
    createData: CreateSubscribeDto
  ): Promise<RepoResponseType<SelectUserSbcrInfoType> | null> {
    const findSubscribe = await this.getUserSubscribeByUserNo(createData.userNo);

    if (findSubscribe?.success && findSubscribe.data) {
      return prismaResponse(
        false,
        null,
        'CONFLICT',
        MESSAGE.SUBSCRIBE.ADMIN.ALREADY_EXISTS
      );
    }

    return this.subscribeRepository.createUserSubscribe(
      adminNo,
      createData
    );
  }

  /**
   * @description 다수 사용자 구독 설정 일괄 변경
   * @param adminNo 관리자 번호
   * @param updateData 구독 설정 일괄 수정 데이터
   */
  async adminMultipleUpdateUserSubscribe(adminNo: number, updateData: UpdateSubscribeDto): Promise<RepoResponseType<MultipleResultType> | null> {
    return this.subscribeRepository.multipleUpdateUserSubscribe(
      adminNo,
      updateData
    );
  }

  /**
   * @description 특정 사용자 구독 설정 삭제
   * @param adminNo 관리자 번호
   * @param sbcrNo 구독 번호
   */
  async adminDeleteUserSubscribe(adminNo: number, sbcrNo: number): Promise<RepoResponseType<boolean> | null> {
    return this.subscribeRepository.deleteUserSubscribe(
      adminNo,
      sbcrNo
    );
  }

  /**
   * @description 다수 사용자 구독 설정 일괄 삭제
   * @param adminNo 관리자 번호
   * @param deleteData 사용자 번호 목록
   */
  async adminMultipleDeleteUserSubscribe(
    adminNo: number,
    deleteData: DeleteSubscribeDto
  ): Promise<RepoResponseType<MultipleResultType> | null> {
    if (!deleteData.sbcrNoList) {
      return null;
    }

    return this.subscribeRepository.multipleDeleteUserSubscribe(
      adminNo,
      deleteData.sbcrNoList
    );
  }
}
