import type { SelectCategoryType } from '@nihilog/schemas';

import { setMeta } from '@/_libs';
import { ServerApi } from '@/_libs/tools/server-api.tools';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{
    categoryNo: string;
  }>;
}

export async function generateMetadata({ params, }: Props) {
  const { categoryNo, } = await params;

  const res = await ServerApi.getQuery<SelectCategoryType>(`/categories/${categoryNo}`);
  return setMeta({
    title: `[${res.data?.ctgryNm}] 카테고리 정보`,
    url: `/admin/dashboard/categories/${categoryNo}`,
  });
}

export default function page() {
  return (
    <div>content</div>
  );
}
