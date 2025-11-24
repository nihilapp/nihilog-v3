'use client';

import type { Block, PartialBlock } from '@blocknote/core';
import { useRef } from 'react';
import { MdArticle, MdLocalOffer } from 'react-icons/md';

import type { BlockNoteEditorRef } from '@/_components/admin/posts/BlockNoteEditor';
import { Box } from '@/_components/ui/box';
import { Input } from '@/_components/ui/input';
import { usePostActions, usePostData, usePostErrors, usePostTags } from '@/_stores/posts.store';

import { BlockNoteEditorDynamic } from './BlockNoteEditorDynamic';

interface Props {}

export function PostEditorMain({ }: Props) {
  const postData = usePostData();
  const postErrors = usePostErrors();
  const postTags = usePostTags();
  const { setPostData, addTag, removeTag, } = usePostActions();
  const editorRef = useRef<BlockNoteEditorRef>(null);

  const getErrorMessage = (fieldName: string): string | undefined => {
    const error = postErrors.find((err) => err.field === fieldName);
    return error?.message;
  };

  const onEditorChange = (blocks: Block[]) => {
    setPostData({
      ...postData,
      pstMtxt: blocks,
    });
  };

  const onEditorContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 에디터 내부가 아닌 빈 공간 클릭 시에만 포커스
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.bn-container') === null) {
      // BlockNote 에디터의 contentEditable 요소 찾기
      const editorElement = e.currentTarget.querySelector('[contenteditable="true"]') as HTMLElement;
      if (editorElement) {
        editorElement.focus();
      }
      else {
        // ref를 통한 포커스 시도
        editorRef.current?.focus();
      }
    }
  };

  return (
    <Box.Content className='gap-5 flex flex-col h-full'>
      <Input.Label
        label='본문'
        icon={<MdArticle />}
        direction='vertical'
        className='flex-1 flex flex-col min-h-0'
        errorMessage={getErrorMessage('pstMtxt')}
      >
        <div
          className='p-5 border border-black-300 rounded-2 flex-1 flex flex-col min-h-0 cursor-text overflow-hidden'
          onClick={onEditorContainerClick}
        >
          <div className='flex-1 flex flex-col min-h-0 overflow-hidden'>
            <BlockNoteEditorDynamic
              ref={editorRef}
              initialContent={
                postData.pstMtxt && postData.pstMtxt.length > 0
                  ? (postData.pstMtxt as PartialBlock[])
                  : undefined
              }
              onChange={onEditorChange}
            />
          </div>
        </div>
      </Input.Label>

      <div>
        <Input.Label label='태그' id='tags' icon={<MdLocalOffer />} direction='vertical' showErrorMessage={false} />
        <Input.TextArray
          items={postTags.map((tag) => tag.tagText)}
          onChange={(newTags) => {
            // 현재 태그와 새 태그를 비교하여 추가/제거 처리
            const currentTagTexts = postTags.map((tag) => tag.tagText);
            // 추가된 태그 찾기
            const addedTags = newTags.filter((tag) => !currentTagTexts.includes(tag));
            // 제거된 태그 찾기
            const removedTags = currentTagTexts.filter((tag) => !newTags.includes(tag));

            // 추가된 태그 처리
            addedTags.forEach((tagText) => {
              addTag(tagText);
            });

            // 제거된 태그 처리
            removedTags.forEach((tagText) => {
              const index = postTags.findIndex((tag) => tag.tagText === tagText);
              if (index !== -1) {
                removeTag(index);
              }
            });
          }}
          placeholder='태그 입력'
          maxItems={20}
          custom={{
            item: 'bg-black-100 text-black-900',
            itemButton: 'text-black-700 hover:text-black-900 hover:bg-black-200 focus:ring-black-500',
          }}
        />
      </div>
    </Box.Content>
  );
}
