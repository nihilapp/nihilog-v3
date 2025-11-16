import type { SelectPostType } from '@nihilog/schemas';

import { AdminPostDetail } from '@/_components/admin/posts/AdminPostDetail';
import { setMeta } from '@/_libs';
import { ServerApi } from '@/_libs/tools/server-api.tools';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{
    postNo: string;
  }>;
}

export async function generateMetadata({ params, }: Props) {
  const { postNo, } = await params;

  const res = await ServerApi.getQuery<SelectPostType>(`/posts/${postNo}`);

  return setMeta({
    title: `[${res.data?.pstTtl}] 포스트 정보`,
    url: `/admin/dashboard/posts/${postNo}`,
  });
}

export default async function AdminPostDetailPage({ params, }: Props) {
  const { postNo, } = await params;

  return (
    <AdminPostDetail postNo={Number(postNo)} />
  );
}
