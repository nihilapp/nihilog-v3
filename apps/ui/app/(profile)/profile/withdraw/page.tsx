import { WithdrawForm } from '@/(profile)/profile/withdraw/_components/WithdrawForm';
import { setMeta } from '@/_libs';

export const metadata = setMeta({
  title: '회원 탈퇴',
  url: '/profile/withdraw',
});

export default function WithdrawPage() {
  return <WithdrawForm />;
}
