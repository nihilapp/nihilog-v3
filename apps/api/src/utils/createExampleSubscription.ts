import { UserSubscriptionType } from '@drizzle/schemas/subscription.schema';

/**
 * @description 구독 설정 예시 데이터.
 */
export function createExampleSubscription() {
  const now = new Date();
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return {
    sbcrNo: 1,
    userNo: 1,
    emlNtfyYn: 'Y',
    newPstNtfyYn: 'Y',
    cmntRplNtfyYn: 'Y',
    sbcrCtgryList: [1, 2, 3],
    sbcrTagList: [1, 2, 3, 4, 5],
    useYn: 'Y',
    delYn: 'N',
    crtNo: 1,
    crtDt: formatDate(now),
    updtNo: 1,
    updtDt: formatDate(now),
    delNo: null,
    delDt: null,
  } as UserSubscriptionType;
}