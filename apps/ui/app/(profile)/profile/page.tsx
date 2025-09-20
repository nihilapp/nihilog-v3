import { ProfileView } from '@/(profile)/profile/_components/ProfileView';
import { setMeta } from '@/_libs';

export const metadata = setMeta({
  title: '마이페이지',
  url: '/profile',
});

export default function ProfilePage() {
  return <ProfileView />;
}
