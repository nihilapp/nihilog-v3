import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Comments 관련 전역 상태 타입
interface CommentsState {
  // 상태
  selectedComment: number | null;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  isApproving: boolean;
  isRejecting: boolean;

  // 액션
  setSelectedComment: (commentId: number | null) => void;
  setCreating: (isCreating: boolean) => void;
  setUpdating: (isUpdating: boolean) => void;
  setDeleting: (isDeleting: boolean) => void;
  setApproving: (isApproving: boolean) => void;
  setRejecting: (isRejecting: boolean) => void;
  reset: () => void;
}

// 초기 상태
const initialState = {
  selectedComment: null,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  isApproving: false,
  isRejecting: false,
};

// Comments 스토어 생성
export const useCommentsStore = create<CommentsState>()(devtools(
  (set) => ({
    ...initialState,

    setSelectedComment: (commentId) => set({ selectedComment: commentId, }),
    setCreating: (isCreating) => set({ isCreating, }),
    setUpdating: (isUpdating) => set({ isUpdating, }),
    setDeleting: (isDeleting) => set({ isDeleting, }),
    setApproving: (isApproving) => set({ isApproving, }),
    setRejecting: (isRejecting) => set({ isRejecting, }),
    reset: () => set(initialState),
  }),
  {
    name: 'comments-store',
  }
));
