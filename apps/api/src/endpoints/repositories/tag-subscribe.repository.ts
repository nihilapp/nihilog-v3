import { Inject, Injectable } from '@nestjs/common';
import { and, asc, eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { TagSubscribeItemDto } from '@/dto';
import { DRIZZLE } from '@/endpoints/drizzle/drizzle.module';
import { schemas } from '@/endpoints/drizzle/schemas';

const { tagSbcrMpng, tagInfo, userSbcrInfo, } = schemas;

@Injectable()
export class TagSubscribeRepository {
  constructor(@Inject(DRIZZLE)
  private readonly db: NodePgDatabase<typeof schemas>) { }

  /**
   * @description 구독 태그 목록 조회
   * @param sbcrNo 구독 번호
   */
  async getTagSubscribeItemListBySbcrNo(sbcrNo: number): Promise<TagSubscribeItemDto[]> {
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

  /**
   * @description 사용자별 구독 태그 목록 조회
   * @param userNo 사용자 번호
   */
  async getTagSubscribeListByUserNo(userNo: number): Promise<any[]> {
    // TODO: 구현 필요 - 사용자 구독 태그 목록 조회 로직
    return [];
  }

  /**
   * @description 특정 태그 구독 상태 조회
   * @param userNo 사용자 번호
   * @param tagNo 태그 번호
   */
  async getTagSubscribeByTagNo(userNo: number, tagNo: number): Promise<any> {
    // TODO: 구현 필요 - 특정 태그 구독 상태 조회 로직
    return null;
  }

  /**
   * @description 태그 구독 설정
   * @param userNo 사용자 번호
   * @param tagNo 태그 번호
   */
  async createTagSubscribe(userNo: number, tagNo: number): Promise<any> {
    // TODO: 구현 필요 - 태그 구독 설정 로직
    return null;
  }

  /**
   * @description 다수 태그 구독 설정
   * @param userNo 사용자 번호
   * @param createData 다수 태그 구독 생성 데이터
   */
  async multipleCreateTagSubscribe(userNo: number, createData: any): Promise<any[]> {
    // TODO: 구현 필요 - 다수 태그 구독 설정 로직
    return [];
  }

  /**
   * @description 다수 태그 구독 설정 변경
   * @param userNo 사용자 번호
   * @param updateData 다수 태그 구독 변경 데이터
   */
  async multipleUpdateTagSubscribe(userNo: number, updateData: any): Promise<any[]> {
    // TODO: 구현 필요 - 다수 태그 구독 설정 변경 로직
    return [];
  }

  /**
   * @description 태그 구독 해제
   * @param userNo 사용자 번호
   * @param tagNo 태그 번호
   */
  async deleteTagSubscribe(userNo: number, tagNo: number): Promise<any> {
    // TODO: 구현 필요 - 태그 구독 해제 로직
    return null;
  }

  /**
   * @description 다수 태그 구독 해제
   * @param userNo 사용자 번호
   * @param deleteData 다수 태그 구독 해제 데이터
   */
  async multipleDeleteTagSubscribe(userNo: number, deleteData: any): Promise<any> {
    // TODO: 구현 필요 - 다수 태그 구독 해제 로직
    return null;
  }
}
