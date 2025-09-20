import { setMeta } from '@/_libs';

import { UserDetail } from './_components/UserDetail';

interface Props {
  params: Promise<{ userNo: string }>;
}

export async function generateMetadata({ params, }: Props) {
  const { userNo, } = await params;

  return setMeta({
    title: `사용자 상세 - ${userNo}번 사용자`,
    url: `/users/${userNo}`,
  });
}

export default async function UserPage({ params, }: Props) {
  const { userNo, } = await params;

  return <UserDetail userNo={Number(userNo)} />;
}
