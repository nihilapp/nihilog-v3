import { Injectable } from '@nestjs/common';

import { MESSAGE } from '@/code/messages';
import type { CreateTagDto, DeleteTagDto, UpdateTagDto } from '@/dto';
import type { AnalyzeStatDto } from '@/dto/common.dto';
import type { CreatePstTagMpngDto, DeletePstTagMpngDto, SearchPstTagMpngDto } from '@/dto/tag.dto';
import type { ListType, MultipleResultType, RepoResponseType } from '@/endpoints/prisma/types/common.types';
import type {
  SelectPstTagMpngListItemType,
  SelectPstTagMpngType,
  SelectTagInfoType,
  AnalyzeTagStatItemType,
  TopUsedTagItemType,
  TagUsageTrendItemType,
  UnusedTagItemType,
  TopTagsBySubscriberItemType,
  TagSubscriberGrowthRateItemType,
  TagWithoutSubscribersItemType,
  TagUsageEfficiencyItemType,
  TagAverageUsageFrequencyItemType,
  TagLifecycleItemType,
  TagStatusDistributionItemType,
  TagCreatorStatItemType,
  TagCleanupRecommendationItemType
} from '@/endpoints/prisma/types/tag.types';
import { TagRepository } from '@/endpoints/repositories/tag.repository';
import { prismaResponse } from '@/utils/prismaResponse';

@Injectable()
export class AdminTagsService {
  constructor(private readonly tagRepository: TagRepository) { }

  // ========================================================
  // 태그 통계 관련 메서드
  // ========================================================

  /**
   * @description 태그 분석 통계 (시간대별 합산) - 9개 지표 통합
   * @param analyzeStatData 분석 통계 데이터
   * @param tagNo 태그 번호 (선택적, 없으면 전체/있으면 해당 태그만)
   */
  async adminGetAnalyzeTagData(analyzeStatData: AnalyzeStatDto, tagNo?: number): Promise<RepoResponseType<AnalyzeTagStatItemType[]> | null> {
    return this.tagRepository.getAnalyzeTagData(analyzeStatData, tagNo);
  }

  /**
   * @description 태그별 사용 횟수 TOP N
   * @param limit 상위 N개
   * @param analyzeStatData 분석 통계 데이터 (선택적)
   */
  async adminGetTopUsedTagsByCount(limit: number, analyzeStatData?: AnalyzeStatDto): Promise<RepoResponseType<TopUsedTagItemType[]> | null> {
    return this.tagRepository.getTopUsedTagsByCount(limit, analyzeStatData);
  }

  /**
   * @description 태그별 사용 추이
   * @param analyzeStatData 분석 통계 데이터
   */
  async adminGetTagUsageTrend(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<TagUsageTrendItemType[]> | null> {
    return this.tagRepository.getTagUsageTrend(analyzeStatData);
  }

  /**
   * @description 미사용 태그 목록
   */
  async adminGetUnusedTagsList(): Promise<RepoResponseType<UnusedTagItemType[]> | null> {
    return this.tagRepository.getUnusedTagsList();
  }

  /**
   * @description 태그별 구독자 수 TOP N
   * @param limit 상위 N개
   */
  async adminGetTopTagsBySubscriberCount(limit: number): Promise<RepoResponseType<TopTagsBySubscriberItemType[]> | null> {
    return this.tagRepository.getTopTagsBySubscriberCount(limit);
  }

  /**
   * @description 태그별 구독자 성장률
   * @param analyzeStatData 분석 통계 데이터
   */
  async adminGetTagSubscriberGrowthRate(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<TagSubscriberGrowthRateItemType[]> | null> {
    return this.tagRepository.getTagSubscriberGrowthRate(analyzeStatData);
  }

  /**
   * @description 구독자 없는 태그 목록
   */
  async adminGetTagsWithoutSubscribers(): Promise<RepoResponseType<TagWithoutSubscribersItemType[]> | null> {
    return this.tagRepository.getTagsWithoutSubscribers();
  }

  /**
   * @description 태그별 사용 효율성
   */
  async adminGetTagUsageEfficiency(): Promise<RepoResponseType<TagUsageEfficiencyItemType[]> | null> {
    return this.tagRepository.getTagUsageEfficiency();
  }

  /**
   * @description 태그별 평균 사용 빈도
   * @param analyzeStatData 분석 통계 데이터
   */
  async adminGetTagAverageUsageFrequency(analyzeStatData: AnalyzeStatDto): Promise<RepoResponseType<TagAverageUsageFrequencyItemType[]> | null> {
    return this.tagRepository.getTagAverageUsageFrequency(analyzeStatData);
  }

  /**
   * @description 태그 생명주기 분석
   */
  async adminGetTagLifecycleAnalysis(): Promise<RepoResponseType<TagLifecycleItemType[]> | null> {
    return this.tagRepository.getTagLifecycleAnalysis();
  }

  /**
   * @description 태그 상태별 분포
   */
  async adminGetTagStatusDistribution(): Promise<RepoResponseType<TagStatusDistributionItemType[]> | null> {
    return this.tagRepository.getTagStatusDistribution();
  }

  /**
   * @description 태그 생성자별 통계
   */
  async adminGetTagCreatorStatistics(): Promise<RepoResponseType<TagCreatorStatItemType[]> | null> {
    return this.tagRepository.getTagCreatorStatistics();
  }

  /**
   * @description 태그 정리 필요도
   */
  async adminGetTagCleanupRecommendations(): Promise<RepoResponseType<TagCleanupRecommendationItemType[]> | null> {
    return this.tagRepository.getTagCleanupRecommendations();
  }

  // ========================================================
  // 태그 관리 관련 메서드
  // ========================================================

  /**
   * @description 태그 생성
   * @param userNo 사용자 번호
   * @param createData 태그 생성 데이터
   */
  async adminCreateTag(userNo: number, createData: CreateTagDto): Promise<RepoResponseType<SelectTagInfoType> | null> {
    // 태그명 중복 확인
    const findTag = await this.tagRepository.getTagByTagNm(createData.tagNm);

    if (findTag?.success) {
      return prismaResponse(false, null, 'CONFLICT', MESSAGE.TAG.ADMIN.NAME_IN_USE);
    }

    return this.tagRepository.createTag(userNo, createData);
  }

  /**
   * @description 다수 태그 생성
   * @param userNo 사용자 번호
   * @param createData 다수 태그 생성 데이터
   */
  async adminMultipleCreateTag(userNo: number, createData: CreateTagDto[]): Promise<RepoResponseType<MultipleResultType> | null> {
    // 태그명 중복 확인
    for (const item of createData) {
      const findTag = await this.tagRepository.getTagByTagNm(item.tagNm);
      if (findTag?.success) {
        return prismaResponse(false, null, 'CONFLICT', MESSAGE.TAG.ADMIN.NAME_IN_USE);
      }
    }

    return this.tagRepository.multipleCreateTag(userNo, createData);
  }

  /**
   * @description 태그 수정
   * @param userNo 사용자 번호
   * @param updateData 태그 수정 데이터
   */
  async adminUpdateTag(userNo: number, updateData: UpdateTagDto): Promise<RepoResponseType<SelectTagInfoType> | null> {
    // 태그는 이름을 바꿀 이유가 별로 없음.

    return this.tagRepository.updateTag(userNo, updateData);
  }

  /**
   * @description 다수 태그 수정
   * @param userNo 사용자 번호
   * @param updateData 다수 태그 수정 데이터
   */
  async adminMultipleUpdateTag(userNo: number, updateData: UpdateTagDto): Promise<RepoResponseType<MultipleResultType> | null> {
    // 태그는 이름을 바꿀 이유가 별로 없음.

    return this.tagRepository.multipleUpdateTag(userNo, updateData);
  }

  /**
   * @description 태그 삭제
   * @param userNo 사용자 번호
   * @param deleteData 태그 삭제 데이터
   */
  async adminDeleteTag(userNo: number, deleteData: DeleteTagDto): Promise<RepoResponseType<boolean> | null> {
    return this.tagRepository.deleteTag(userNo, deleteData);
  }

  /**
   * @description 다수 태그 삭제
   * @param userNo 사용자 번호
   * @param deleteData 다수 태그 삭제 데이터
   */
  async adminMultipleDeleteTag(userNo: number, deleteData: DeleteTagDto): Promise<RepoResponseType<MultipleResultType> | null> {
    return this.tagRepository.multipleDeleteTag(userNo, deleteData);
  }

  /**
   * @description 태그 매핑 조회
   * @param searchData 검색 데이터
   */
  async adminGetTagMapping(searchData: SearchPstTagMpngDto): Promise<RepoResponseType<ListType<SelectPstTagMpngListItemType>> | null> {
    return this.tagRepository.getPostTagMapping(searchData);
  }

  /**
   * @description 태그 매핑 조회
   * @param tagNo 태그 번호
   * @param pstNo 포스트 번호
   */
  async adminGetTagMappingByTagNo(tagNo: number, pstNo: number): Promise<RepoResponseType<SelectPstTagMpngType> | null> {
    return this.tagRepository.getPostTagMappingByTagNo(tagNo, pstNo);
  }

  /**
   * @description 태그 매핑 추가
   * @param userNo 사용자 번호
   * @param createData 태그 매핑 추가 데이터
   */
  async adminAddTagMapping(userNo: number, createData: CreatePstTagMpngDto): Promise<RepoResponseType<SelectPstTagMpngType> | null> {
    // 태그 중복
    const findTag = await this.tagRepository
      .getPostTagMappingByTagNo(createData.tagNo, createData.pstNo);
    if (findTag?.success) {
      return prismaResponse(false, null, 'CONFLICT', MESSAGE.TAG.ADMIN.MAPPING_ALREADY_EXISTS);
    }

    return this.tagRepository.addTagToPost(userNo, createData);
  }

  /**
   * @description 다수 태그 매핑 추가
   * @param userNo 사용자 번호
   * @param createData 다수 태그 매핑 추가 데이터
   */
  async adminMultipleAddTagMapping(userNo: number, createData: CreatePstTagMpngDto[]): Promise<RepoResponseType<MultipleResultType> | null> {
    for (const item of createData) {
      const findTag = await this.tagRepository
        .getPostTagMappingByTagNo(item.tagNo, item.pstNo);
      if (findTag?.success) {
        return prismaResponse(false, null, 'CONFLICT', MESSAGE.TAG.ADMIN.MAPPING_ALREADY_EXISTS);
      }
    }
    return this.tagRepository.multipleAddTagToPost(userNo, createData);
  }

  /**
   * @description 태그 매핑 삭제
   * @param userNo 사용자 번호
   * @param deleteData 태그 매핑 삭제 데이터
   */
  async adminDeleteTagMapping(userNo: number, deleteData: DeletePstTagMpngDto): Promise<RepoResponseType<boolean> | null> {
    return this.tagRepository.removeTagFromPost(userNo, deleteData);
  }

  /**
   * @description 다수 태그 매핑 삭제
   * @param userNo 사용자 번호
   * @param deleteData 다수 태그 매핑 삭제 데이터
   */
  async adminMultipleDeleteTagMapping(userNo: number, deleteData: DeletePstTagMpngDto): Promise<RepoResponseType<MultipleResultType> | null> {
    return this.tagRepository.multipleRemoveTagFromPost(userNo, deleteData);
  }
}
