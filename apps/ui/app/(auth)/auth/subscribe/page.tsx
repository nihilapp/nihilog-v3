import { SubscribeForm } from '@/_components/auth/SubscribeForm';
import { setMeta } from '@/_libs';

// interface Props {}

export const metadata = setMeta({
  title: '구독',
  url: '/auth/subscribe',
});

export default function SubscribePage() {
  return (
    <SubscribeForm />
  );
}
