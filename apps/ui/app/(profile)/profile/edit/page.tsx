import { ProfileEditForm } from '@/(profile)/profile/edit/_components/ProfileEditForm';
import { setMeta } from '@/_libs';

export const metadata = setMeta({
  title: '프로필 수정',
  url: '/profile/edit',
});

export default function ProfileEditPage() {
  return <ProfileEditForm />;
}
