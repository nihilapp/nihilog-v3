'use client';

import type { Block, BlockNoteEditor as BlockNoteEditorType, BlockNoteExtension, PartialBlock } from '@blocknote/core';
import { createBlockNoteExtension } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';

// 입력 시 자동으로 새 블록이 생성되는 것을 막는 Extension
const preventAutoBlockExtension: BlockNoteExtension = createBlockNoteExtension({
  key: 'preventAutoBlock',
  // 입력 규칙을 비워서 자동 블록 생성을 막음
  inputRules: [],
});

interface BlockNoteEditorProps {
  initialContent?: PartialBlock[];
  onChange?: (blocks: Block[]) => void;
}

export function BlockNoteEditor({
  initialContent,
  onChange,
}: BlockNoteEditorProps) {
  const editor = useCreateBlockNote({
    initialContent: initialContent || [
      {
        type: 'paragraph',
        content: '',
      },
    ],
    extensions: [ preventAutoBlockExtension, ],
  });

  const handleChange = (editorInstance: BlockNoteEditorType) => {
    if (onChange) {
      const blocks = editorInstance.document;
      onChange(blocks);
    }
  };

  return (
    <BlockNoteView
      editor={editor}
      onChange={handleChange}
    />
  );
}
