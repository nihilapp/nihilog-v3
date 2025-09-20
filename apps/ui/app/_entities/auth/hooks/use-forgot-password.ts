import { useState } from 'react';
import { toast } from 'sonner';

import { authKeys } from '@/_entities/auth/auth.keys';
import type { MutationOptionsType } from '@/_entities/common/common.types';
import { usePost } from '@/_entities/common/hooks';
import { getToastStyle } from '@/_libs';
import type { ForgotPasswordType } from '@/_schemas/user.schema';

interface UseForgotPasswordOptions extends MutationOptionsType<null, ForgotPasswordType> {}

/**
 * @description 비밀번호 재설정 이메일 발송을 위한 커스텀 훅
 * @param {UseForgotPasswordOptions} [options] - 뮤테이션 옵션 (선택사항)
 * @returns 비밀번호 재설정 이메일 발송 뮤테이션 객체
 */
export function useForgotPassword(options: UseForgotPasswordOptions = {}) {
  const [
    isPostedEmail, setIsPostedEmail,
  ] = useState(false);

  const query = usePost<null, ForgotPasswordType>({
    url: [
      'auth', 'forgot-password',
    ],
    key: authKeys.forgotPassword(),
    callback(res) {
      toast.success(res.message, {
        style: getToastStyle('success'),
      });
      // 이메일 발송 성공 시 상태 업데이트
      setIsPostedEmail(true);
    },
    errorCallback(err) {
      toast.error(err.message, {
        style: getToastStyle('error'),
      });
    },
    ...options,
  });

  return {
    ...query,
    isPostedEmail,
  };
}
