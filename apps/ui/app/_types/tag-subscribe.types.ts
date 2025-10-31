import type {
  TagSbcrMpngTableType
} from '../_schemas';

// 단일 태그 구독 조회 (tag 정보 포함)
export type SelectTagSbcrMpngType = TagSbcrMpngTableType & {
  tag: {
    tagNm: string;
  };
};

// 목록 조회 항목 (페이징 정보 포함)
export type SelectTagSbcrMpngListItemType = SelectTagSbcrMpngType & {
  totalCnt: number;
  rowNo: number;
};
