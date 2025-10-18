import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Subscribe 관련 전역 상태 타입
interface SubscribeState {
  // 상태
  isUpdatingSettings: boolean;
  isSubscribingCategory: boolean;
  isUnsubscribingCategory: boolean;
  isSubscribingTag: boolean;
  isUnsubscribingTag: boolean;

  // 액션
  setUpdatingSettings: (isUpdating: boolean) => void;
  setSubscribingCategory: (isSubscribing: boolean) => void;
  setUnsubscribingCategory: (isUnsubscribing: boolean) => void;
  setSubscribingTag: (isSubscribing: boolean) => void;
  setUnsubscribingTag: (isUnsubscribing: boolean) => void;
  reset: () => void;
}

// 초기 상태
const initialState = {
  isUpdatingSettings: false,
  isSubscribingCategory: false,
  isUnsubscribingCategory: false,
  isSubscribingTag: false,
  isUnsubscribingTag: false,
};

// Subscribe 스토어 생성
export const useSubscribeStore = create<SubscribeState>()(devtools(
  (set) => ({
    ...initialState,

    setUpdatingSettings: (isUpdating) => set({ isUpdatingSettings: isUpdating, }),
    setSubscribingCategory: (isSubscribing) => set({ isSubscribingCategory: isSubscribing, }),
    setUnsubscribingCategory: (isUnsubscribing) => set({ isUnsubscribingCategory: isUnsubscribing, }),
    setSubscribingTag: (isSubscribing) => set({ isSubscribingTag: isSubscribing, }),
    setUnsubscribingTag: (isUnsubscribing) => set({ isUnsubscribingTag: isUnsubscribing, }),
    reset: () => set(initialState),
  }),
  {
    name: 'subscribe-store',
  }
));
