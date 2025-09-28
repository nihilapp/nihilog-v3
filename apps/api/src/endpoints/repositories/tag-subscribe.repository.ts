import { Inject, Injectable } from '@nestjs/common';
import { and, asc, eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import type { TagSubscribeItemDto } from '@/dto';
import { DRIZZLE } from '@/endpoints/drizzle/drizzle.module';
import { schemas } from '@/endpoints/drizzle/schemas';

const { tagSbcrMpng, tagInfo, } = schemas;

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
}
