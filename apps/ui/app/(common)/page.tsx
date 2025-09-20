import { Home } from '@/(common)/_components/Home';
import { setMeta } from '@/_libs/setMeta';

export const metadata = setMeta({
  title: '메인',
  url: '/',
});

export default function Page() {
  return <Home />;
}
