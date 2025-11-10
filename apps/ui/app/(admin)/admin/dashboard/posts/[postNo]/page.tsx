import type { SelectPostType } from '@nihilog/schemas';

import { AdminPostDetail } from '@/_components/admin/posts/AdminPostDetail';
import { Api, setMeta } from '@/_libs';

interface Props {
  params: Promise<{
    postNo: string;
  }>;
}

export async function generateMetadata({ params, }: Props) {
  const { postNo, } = await params;

  const res = await Api.getQuery<SelectPostType>(`/posts/${postNo}`);

  return setMeta({
    title: `포스트 관리: [${res.data?.pstTtl}]`,
    url: `/admin/dashboard/posts/${postNo}`,
  });
}

export default async function AdminPostDetailPage({ params, }: Props) {
  const { postNo, } = await params;

  return (
    <AdminPostDetail postNo={Number(postNo)} />
  );
}
