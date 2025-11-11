import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface PostsAction {
  setEditMode: (editMode: 'create' | 'update') => void;
  setModCount: (modCount: number) => void;
  setPostNo: (postNo: number) => void;
  setPostSlug: (postSlug: string) => void;
  reset: () => void;
}

// Posts 관련 전역 상태 타입
interface PostsState {
  // 상태
  editMode: 'create' | 'update';
  modCount: number;
  postNo: number;
  postSlug: string;

  // 액션
  actions: PostsAction;
}

// Posts 스토어 생성
const postsStore = create<PostsState>()(devtools(
  (set) => ({
    editMode: 'create',
    modCount: 0,
    postNo: 0,
    postSlug: '',
    actions: {
      setEditMode: (editMode: 'create' | 'update') => set({ editMode, }),
      setModCount: (modCount: number) => set({ modCount, }),
      setPostNo: (postNo: number) => set({ postNo, }),
      setPostSlug: (postSlug: string) => set({ postSlug, }),
      reset: () => set({
        editMode: 'create',
        modCount: 0,
        postNo: 0,
        postSlug: '',
      }),
    },
  }),
  {
    name: 'posts-store',
  }
));

export const useEditMode = () => postsStore((state) => state.editMode);
export const useModCount = () => postsStore((state) => state.modCount);
export const usePostNo = () => postsStore((state) => state.postNo);
export const usePostSlug = () => postsStore((state) => state.postSlug);

export const usePostActions = () => postsStore((state) => state.actions);
