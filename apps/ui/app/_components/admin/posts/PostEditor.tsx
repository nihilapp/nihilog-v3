'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import { updatePostSchema } from '@nihilog/schemas';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { CommandPalette } from '@/_components/admin/post-blocks/CommandPalette';
import { TextBlock } from '@/_components/admin/post-blocks/TextBlock';
import { PostStatusBadges } from '@/_components/admin/posts/PostStatusBadges';
import { Loading } from '@/_components/common/Loading';
import { Box } from '@/_components/ui/box';
import { Button } from '@/_components/ui/button';
import { Frame } from '@/_components/ui/frame';
import { Input } from '@/_components/ui/input';
import { useGetPostByNo } from '@/_entities/posts/hooks';
import { useEditMode, usePostActions, usePostBlocks, usePostData } from '@/_stores/posts.store';
import type { Menu } from '@/_types/common.types';
import type { Block } from '@/_types/posts.types';

interface Props {}

function PostEditorContent() {
  const params = useSearchParams();
  const pstNo = params.get('pstNo');

  const editMode = useEditMode();
  const postData = usePostData();

  const { setPostData, addBlock, } = usePostActions();
  const router = useRouter();

  const { response, loading, done, } = useGetPostByNo(Number(pstNo));

  const menuItems: Menu[] = [
    {
      icon: <Icon icon='material-symbols:save' />,
      name: '저장',
      action: () => {
        console.log('저장');
      },
      classNames: 'button-outline-black-900 hover:button-normal-blue-500',
    },
    {
      icon: <Icon icon='material-symbols:publish' />,
      name: '발행',
      action: () => {
        //
      },
      classNames: 'button-outline-black-900 hover:button-normal-blue-500',
    },
  ];

  const postBlocks = usePostBlocks();
  const [
    isCommandOpen,
    setIsCommandOpen,
  ] = useState(false);
  const [
    commandPosition,
    setCommandPosition,
  ] = useState<{ top: number;
    left: number; } | undefined>(undefined);
  const blockEditorRef = useRef<HTMLDivElement>(null);
  const commandInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const form = useForm({
    mode: 'all',
    resolver: zodResolver(updatePostSchema),
    defaultValues: {
      pstTtl: postData.pstTtl,
      pstSmry: postData.pstSmry,
      pstMtxt: postData.pstMtxt,
      pstCd: postData.pstCd,
      pstThmbLink: postData.pstThmbLink,
      pstStts: postData.pstStts,
      publDt: postData.publDt,
      pinYn: postData.pinYn,
      rlsYn: postData.rlsYn,
      archYn: postData.archYn,
      secrYn: postData.secrYn,
      pstPswd: postData.pstPswd,
      ctgryNo: postData.ctgryNo,
    },
  });

  useEffect(
    () => {
      if (!pstNo) {
        router.replace('/admin/dashboard');
        return;
      }

      if (done && response?.data) {
        const newPostData = {
          pstTtl: response.data.pstTtl ?? '',
          pstSmry: response.data.pstSmry ?? '',
          pstMtxt: response.data.pstMtxt ?? '',
          pstCd: response.data.pstCd ?? '',
          pstThmbLink: response.data.pstThmbLink ?? '',
          pstStts: response.data.pstStts,
          publDt: response.data.publDt ?? '',
          pinYn: response.data.pinYn,
          rlsYn: response.data.rlsYn,
          archYn: response.data.archYn,
          secrYn: response.data.secrYn,
          pstPswd: response.data.pstPswd ?? '',
          ctgryNo: response.data.ctgryNo ?? undefined,
        };

        setPostData(newPostData);
        form.reset(newPostData);
      }
    },
    [
      pstNo,
      router,
      response?.data,
      done,
      setPostData,
      form,
    ]
  );

  useEffect(
    () => {
      // Canvas를 미리 생성하여 ref에 저장
      if (!canvasRef.current) {
        const canvas = document.createElement('canvas');
        canvasRef.current = canvas;
      }
    },
    []
  );

  const getCaretPosition = () => {
    const input = commandInputRef.current;
    const container = blockEditorRef.current;
    if (!input || !container) {
      return {
        top: 0,
        left: 0,
      };
    }

    const inputRect = input.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const selectionStart = input.selectionStart ?? 0;
    const textBeforeCaret = input.value.substring(
      0,
      selectionStart
    );

    // Canvas API를 사용해서 텍스트 너비 측정
    const canvas = canvasRef.current;
    if (!canvas) {
      return {
        top: inputRect.top - containerRect.top + inputRect.height,
        left: inputRect.left - containerRect.left,
      };
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return {
        top: inputRect.top - containerRect.top + inputRect.height,
        left: inputRect.left - containerRect.left,
      };
    }

    // input 요소의 스타일을 가져오기 위해 ref 사용
    const styles = getComputedStyle(input);
    context.font = `${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`;
    const textWidth = context.measureText(textBeforeCaret || ' ').width;

    // input의 padding-left를 고려
    const paddingLeft = parseFloat(styles.paddingLeft) || 0;

    // 부모 요소(container) 기준으로 상대 위치 계산
    return {
      top: inputRect.top - containerRect.top + inputRect.height,
      left: inputRect.left - containerRect.left + paddingLeft + textWidth,
    };
  };

  const onCommandInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isCommandOpen) {
      // 팔레트가 열려있을 때는 ESC만 허용
      if (e.key !== 'Escape') {
        e.preventDefault();
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        setIsCommandOpen(false);
        if (commandInputRef.current) {
          commandInputRef.current.value = '';
        }
      }
    }
    else {
      // 팔레트가 닫혀있을 때는 슬래시만 허용
      if (e.key !== '/') {
        e.preventDefault();
        return;
      }

      if (e.key === '/') {
        e.preventDefault();
        const position = getCaretPosition();
        setCommandPosition({
          top: position.top + 8,
          left: position.left,
        });
        setIsCommandOpen(true);
      }
    }
  };

  const onCommandSelect = (type: Block['type']) => {
    addBlock(type);
    setIsCommandOpen(false);
    if (commandInputRef.current) {
      commandInputRef.current.value = '';
      // 포커스 유지
      commandInputRef.current.focus();
    }
  };

  const onCommandClose = () => {
    setIsCommandOpen(false);
    if (commandInputRef.current) {
      commandInputRef.current.value = '';
    }
  };

  return (
    <>
      {editMode === 'update' && loading && (
        <Loading
          message='포스트 정보를 불러오는 중입니다...'
        />
      )}
      {editMode === 'update' && (!response || !done) && (
        null
      )}
      {done && postData && (
        <>
          <Frame.Header text='NIHILOG POST EDITOR' href='/admin/dashboard'>
            <PostStatusBadges
              editMode={editMode}
              pstStts={postData.pstStts}
              rlsYn={postData.rlsYn}
              secrYn={postData.secrYn}
              archYn={postData.archYn}
              pinYn={postData.pinYn}
            />
            <div className='frame-nav-saparator' />
            <Frame.AuthButtons
              beforeSignInMenu={[]}
              afterSignInMenu={menuItems}
            />
          </Frame.Header>
          <Frame.Content>
            <Frame.Main>
              <Box.Content className='gap-5'>
                <Input.Label label='제목' direction='horizontal'>
                  <Input.Text
                    type='text'
                    placeholder='제목을 입력해주세요.'
                    {...form.register('pstTtl')}
                  />
                </Input.Label>

                <Input.Label label='요약' direction='horizontal'>
                  <Input.LongText
                    rows={3}
                    className='resize-none'
                    placeholder='요약을 입력해주세요.'
                    {...form.register('pstSmry')}
                  />
                </Input.Label>

                <div
                  ref={blockEditorRef}
                  className='flex flex-col gap-2 p-5 border border-black-300 rounded-2 items-start relative'
                >
                  {postBlocks.map((block) => (
                    <React.Fragment key={block.id}>
                      {block.type === 'text' && <TextBlock item={block} />}
                    </React.Fragment>
                  ))}
                  <div className='w-full'>
                    <input
                      ref={commandInputRef}
                      type='text'
                      placeholder='/ 를 입력하여 블럭을 추가할 수 있습니다.'
                      className='w-full border-0 outline-none bg-transparent text-black-500 placeholder:text-black-400'
                      onKeyDown={onCommandInputKeyDown}
                    />
                  </div>
                  <CommandPalette
                    isOpen={isCommandOpen}
                    onSelect={onCommandSelect}
                    onClose={onCommandClose}
                    position={commandPosition}
                  />
                </div>
              </Box.Content>
            </Frame.Main>
            <Frame.Side sidePosition='right' title='사이드바'>
              <div>
                {/* 기본 설정들 모음 */}
              </div>

              <h3>블럭</h3>
              <div className='grid grid-cols-2 gap-2'>
                {/* 블럭 버튼들 모음 */}
                <Button.Action
                  label='텍스트'
                  icon={<Icon icon='material-symbols:text-fields' />}
                  onClick={() => addBlock('text')}
                  className='button-ghost-black-700 hover:bg-black-100! border border-black-200 h-[80px]'
                />
              </div>
            </Frame.Side>
          </Frame.Content>
          <Frame.Footer />
        </>
      )}
    </>
  );
}

export function PostEditor({ }: Props) {
  return (
    <Suspense fallback={<Loading message='포스트 정보를 불러오는 중입니다...' />}>
      <PostEditorContent />
    </Suspense>
  );
}
