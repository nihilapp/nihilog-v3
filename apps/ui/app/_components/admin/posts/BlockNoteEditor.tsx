'use client';

import type { Block, BlockNoteEditor as BlockNoteEditorType, BlockNoteExtension, PartialBlock } from '@blocknote/core';
import { createBlockNoteExtension } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import { forwardRef, useImperativeHandle, useMemo } from 'react';

// 입력 시 자동으로 새 블록이 생성되는 것을 막는 Extension
const preventAutoBlockExtension: BlockNoteExtension = createBlockNoteExtension({
  key: 'preventAutoBlock',
  // 입력 규칙을 비워서 자동 블록 생성을 막음
  inputRules: [],
});

interface BlockNoteEditorProps {
  initialContent?: PartialBlock[];
  onChange?: (blocks: Block[]) => void;
  className?: string;
}

export interface BlockNoteEditorRef {
  focus: () => void;
}

export const BlockNoteEditor = forwardRef<BlockNoteEditorRef, BlockNoteEditorProps>(function BlockNoteEditor({
  initialContent,
  onChange,
  className,
}, ref) {
  const defaultContent = useMemo(
    () => [
      {
        type: 'paragraph' as const,
        content: '',
      },
    ],
    []
  );

  const editor = useCreateBlockNote({
    initialContent: initialContent || defaultContent,
    extensions: [ preventAutoBlockExtension, ],
  });

  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        editor.focus();
      },
    }),
    [ editor, ]
  );

  const onEditorChange = (editorInstance: BlockNoteEditorType) => {
    if (onChange) {
      const blocks = editorInstance.document;
      onChange(blocks);
    }
  };

  return (
    <div className={className
      ? `h-full overflow-hidden ${className}`
      : 'h-full overflow-hidden'}
    >
      <BlockNoteView
        editor={editor}
        onChange={onEditorChange}
      />
    </div>
  );
});
