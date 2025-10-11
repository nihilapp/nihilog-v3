import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Posts 관련 전역 상태 타입
interface PostsState {
  // 상태
  selectedPost: number | null;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;

  // 액션
  setSelectedPost: (postId: number | null) => void;
  setCreating: (isCreating: boolean) => void;
  setUpdating: (isUpdating: boolean) => void;
  setDeleting: (isDeleting: boolean) => void;
  reset: () => void;
}

// 초기 상태
const initialState = {
  selectedPost: null,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
};

// Posts 스토어 생성
export const usePostsStore = create<PostsState>()(
  devtools(
    (set) => ({
      ...initialState,

      setSelectedPost: (postId) => set({ selectedPost: postId, }),
      setCreating: (isCreating) => set({ isCreating, }),
      setUpdating: (isUpdating) => set({ isUpdating, }),
      setDeleting: (isDeleting) => set({ isDeleting, }),
      reset: () => set(initialState),
    }),
    {
      name: 'posts-store',
    }
  )
);
