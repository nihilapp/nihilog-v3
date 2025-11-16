import type { PostStatus, YnStatus } from '@nihilog/db';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { CommonHelper } from '@/_libs/tools';
import type { Block } from '@/_types/posts.types';

interface PostsAction {
  setEditMode: (editMode: 'create' | 'update') => void;
  setPostData: (postData: PostData) => void;
  reset: () => void;
  // 블록 관리
  addBlock: (type: Block['type'], index?: number) => void;
  updateBlock: (id: string, updates: Partial<Block>) => void;
  deleteBlock: (id: string) => void;
}

interface PostData {
  pstTtl: string;
  pstSmry: string;
  pstMtxt: string;
  pstCd: string;
  pstThmbLink: string;
  pstStts: PostStatus;
  publDt: string;
  pinYn: YnStatus;
  rlsYn: YnStatus;
  archYn: YnStatus;
  secrYn: YnStatus;
  pstPswd: string;
  ctgryNo: number | undefined;
}

// Posts 관련 전역 상태 타입
interface PostsState {
  // 상태
  editMode: 'create' | 'update';
  postData: PostData;
  postBlocks: Block[];

  // 액션
  actions: PostsAction;
}

// Posts 스토어 생성
const postsStore = create<PostsState>()(devtools(
  immer((set) => ({
    editMode: 'create',
    postData: {
      pstTtl: '',
      pstSmry: '',
      pstMtxt: '',
      pstCd: '',
      pstThmbLink: '',
      pstStts: 'EMPTY',
      publDt: '',
      pinYn: 'N',
      rlsYn: 'N',
      archYn: 'N',
      secrYn: 'N',
      pstPswd: '',
      ctgryNo: undefined,
    },
    postBlocks: [],
    actions: {
      setEditMode: (editMode: 'create' | 'update') => set((state) => {
        state.editMode = editMode;
      }),
      setPostData: (postData: PostData) => set((state) => {
        state.postData = {
          ...state.postData,
          ...postData,
        };
      }),
      reset: () => set((state) => {
        state.editMode = 'create';
        state.postData = {
          pstTtl: '',
          pstSmry: '',
          pstMtxt: '',
          pstCd: '',
          pstThmbLink: '',
          pstStts: 'EMPTY',
          publDt: '',
          pinYn: 'N',
          rlsYn: 'N',
          archYn: 'N',
          secrYn: 'N',
          pstPswd: '',
          ctgryNo: undefined,
        };
        state.postBlocks = [];
      }),
      addBlock: (type: Block['type'], index?: number) => set((state) => {
        const newBlock: Block = {
          id: CommonHelper.uuid(),
          type,
          content: '',
          style: {},
          attributes: {},
          children: [],
          index: index ?? state.postBlocks.length,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isEditable: true,
          canMove: true,
          canDelete: true,
          canDuplicate: true,
          canEdit: true,
          isValid: true,
        };

        if (index !== undefined && index >= 0 && index <= state.postBlocks.length) {
          state.postBlocks.splice(
            index,
            0,
            newBlock
          );
          // 인덱스 재정렬
          state.postBlocks.forEach((b, i) => {
            b.index = i;
          });
        }
        else {
          state.postBlocks.push(newBlock);
        }
      }),
      updateBlock: (id: string, updates: Partial<Block>) => set((state) => {
        const block = state.postBlocks.find((b) => b.id === id);
        if (block) {
          block.updatedAt = new Date().toISOString();
          if (updates.content !== undefined) {
            block.content = updates.content;
          }
          if (updates.style !== undefined) {
            block.style = updates.style;
          }
          if (updates.attributes !== undefined) {
            block.attributes = updates.attributes;
          }
          if (updates.children !== undefined) {
            block.children = updates.children;
          }
          if (updates.parentId !== undefined) {
            block.parentId = updates.parentId;
          }
          if (updates.depth !== undefined) {
            block.depth = updates.depth;
          }
          if (updates.index !== undefined) {
            block.index = updates.index;
          }
          if (updates.createdAt !== undefined) {
            block.createdAt = updates.createdAt;
          }
          if (updates.isSelected !== undefined) {
            block.isSelected = updates.isSelected;
          }
          if (updates.isFocused !== undefined) {
            block.isFocused = updates.isFocused;
          }
          if (updates.isCollapsed !== undefined) {
            block.isCollapsed = updates.isCollapsed;
          }
          if (updates.isEditable !== undefined) {
            block.isEditable = updates.isEditable;
          }
          if (updates.isValid !== undefined) {
            block.isValid = updates.isValid;
          }
          if (updates.error !== undefined) {
            block.error = updates.error;
          }
          if (updates.canMove !== undefined) {
            block.canMove = updates.canMove;
          }
          if (updates.canDelete !== undefined) {
            block.canDelete = updates.canDelete;
          }
          if (updates.canDuplicate !== undefined) {
            block.canDuplicate = updates.canDuplicate;
          }
          if (updates.canEdit !== undefined) {
            block.canEdit = updates.canEdit;
          }
          if (updates.alignment !== undefined) {
            block.alignment = updates.alignment;
          }
          if (updates.className !== undefined) {
            block.className = updates.className;
          }
        }
      }),
      deleteBlock: (id: string) => set((state) => {
        state.postBlocks = state.postBlocks.filter((b) => b.id !== id);
        // 인덱스 재정렬
        state.postBlocks.forEach((b, i) => {
          b.index = i;
        });
      }),
    },
  })),
  {
    name: 'posts-store',
  }
));

export const useEditMode = () => postsStore((state) => state.editMode);
export const usePostData = () => postsStore((state) => state.postData);
export const usePostBlocks = () => postsStore((state) => state.postBlocks);

export const usePostActions = () => postsStore((state) => state.actions);
