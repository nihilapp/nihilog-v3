'use client';

import { Icon } from '@iconify/react';
import { useCallback, useEffect } from 'react';

import { Tab } from '@/_components/ui/tab';
import { useInput } from '@/_entities/common/hooks';
import { cn, formatText } from '@/_libs';
import { usePostActions } from '@/_stores/posts.store';
import type { Block } from '@/_types/posts.types';

// 기본값은 HTMLDivElement, 'className'
interface Props {
  item: Block;
  className?: string | string[];
  custom?: {
    div?: string | string[];
  };
}

export function TextBlock({ item, }: Props) {
  const { updateBlock, } = usePostActions();
  const { value, setValue, onChange, ref, getSelection, } = useInput<HTMLTextAreaElement>(item.content);

  const textRef = ref;

  const adjustTextareaHeight = useCallback(
    () => {
      const textarea = textRef.current;
      if (!textarea) {
        return;
      }

      // 높이를 초기화하여 정확한 scrollHeight 측정
      textarea.style.height = 'auto';
      // scrollHeight를 기반으로 높이 설정
      textarea.style.height = `${textarea.scrollHeight + 2}px`;
    },
    [ textRef, ]
  );

  useEffect(
    () => {
      adjustTextareaHeight();
    },
    [ adjustTextareaHeight, ]
  );

  const onTextareaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    adjustTextareaHeight();
    const newValue = e.currentTarget.value;
    updateBlock(
      item.id,
      {
        content: newValue,
      }
    );
  };

  const onTextareaSelect = () => {
    // 사용자가 직접 범위를 지정한 경우에만 선택 추적
    const selection = getSelection();
    console.log(selection);
    // 선택 정보를 사용할 수 있음
    return selection;
  };

  const applyFormat = (
    wrapper: string,
    patterns: {
      only: RegExp;
      withOther1: RegExp;
      withOther2: RegExp;
    },
    otherWrapper: string
  ) => {
    const selection = getSelection();

    if (selection.length === 0) {
      return;
    }

    const textarea = textRef.current;
    if (!textarea) {
      return;
    }

    const currentValue = value as string;
    const result = formatText({
      selectedText: selection.text,
      selectionStart: selection.start,
      selectionEnd: selection.end,
      currentValue,
      wrapper,
      patterns,
      otherWrapper,
    });

    if (!result) {
      return;
    }

    // textarea value 업데이트
    setValue(result.newContent as typeof value);

    // 블록 업데이트
    updateBlock(
      item.id,
      {
        content: result.newContent,
      }
    );

    // 선택 범위 업데이트 (값이 업데이트된 후 실행)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (textarea) {
          textarea.setSelectionRange(
            result.newStart,
            result.newEnd
          );
          textarea.focus();
          adjustTextareaHeight();
        }
      });
    });
  };

  const onFormatBold = () => {
    applyFormat(
      '**',
      {
        only: /^\*\*(.+?)\*\*$/,
        withOther1: /^\*\*_(.+?)_\*\*$/, // **_text_**
        withOther2: /^_\*\*(.+?)\*\*_$/, // _**text**_
      },
      '_'
    );
  };

  const onFormatItalic = () => {
    applyFormat(
      '_',
      {
        only: /^_(.+?)_$/,
        withOther1: /^\*\*_(.+?)_\*\*$/, // **_text_**
        withOther2: /^_\*\*(.+?)\*\*_$/, // _**text**_
      },
      '**'
    );
  };

  return (
    <Tab.Container defaultTab='edit'>
      <Tab.PanelList>
        <Tab.Panel tabId='edit'>
          <div className='flex flex-col gap-1'>
            <div className='flex flex-row gap-1'>
              <button
                type='button'
                onClick={onFormatBold}
                className='border border-black-300 rounded-1 p-1 hover:bg-black-900 hover:text-white transition-colors duration-200 ease-in-out'
              >
                <Icon icon='material-symbols:format-bold' />
              </button>
              <button
                type='button'
                onClick={onFormatItalic}
                className='border border-black-300 rounded-1 p-1 hover:bg-black-900 hover:text-white transition-colors duration-200 ease-in-out'
              >
                <Icon icon='material-symbols:format-italic' />
              </button>
            </div>
            <textarea
              ref={textRef}
              rows={3}
              placeholder='텍스트를 입력해주세요.'
              value={value}
              onChange={onChange}
              className={cn([ 'block text-justify w-full p-2 border border-black-200 rounded-2 resize-none', ])}
              onInput={onTextareaInput}
              onSelect={onTextareaSelect}
            />
          </div>
        </Tab.Panel>
        <Tab.Panel tabId='preview'>
          <div>
            여기에 마크다운 미리보기
          </div>
        </Tab.Panel>
      </Tab.PanelList>
      <Tab.ButtonList>
        <Tab.Button tabId='edit'>편집</Tab.Button>
        <Tab.Button tabId='preview'>미리보기</Tab.Button>
      </Tab.ButtonList>
    </Tab.Container>
  );
}
