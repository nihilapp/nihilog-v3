import type { SelectTagInfoType } from '@nihilog/schemas';

import { Api } from '@/_libs/tools';

export async function getTagByName(name: string): Promise<SelectTagInfoType | null> {
  try {
    const data = await Api.getQuery<SelectTagInfoType>(`tags/name/${name}`);

    if (data.error) {
      return null;
    }

    return data.data;
  }
  catch {
    // 태그를 찾을 수 없거나 다른 에러가 발생한 경우 null 반환
    return null;
  }
}
