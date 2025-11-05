import { Home } from '@/_components/common/home/Home';
import { setMeta } from '@/_libs';

// interface Props {}

export const metadata = setMeta({
  title: '홈',
  url: '/',
});

export default function HomePage() {
  return (
    <Home />
  );
}
