'use client';

import type { Block } from '@blocknote/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePostSchema } from '@nihilog/schemas';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdSave, MdPublish } from 'react-icons/md';

import { PostEditorMain } from '@/_components/admin/posts/PostEditorMain';
import { PostEditorSidebar } from '@/_components/admin/posts/PostEditorSidebar';
import { PostStatusBadges } from '@/_components/admin/posts/PostStatusBadges';
import { Loading } from '@/_components/common/Loading';
import { Frame } from '@/_components/ui/frame';
import { useAdminUpdatePost } from '@/_hooks/admin/posts/use-admin-update-post';
import { useAdminCreateTag } from '@/_hooks/admin/tags/use-admin-create-tag';
import { useAdminGetTagMapping } from '@/_hooks/admin/tags/use-admin-get-tag-mapping';
import { useAdminMultipleAddTagMapping } from '@/_hooks/admin/tags/use-admin-multiple-add-tag-mapping';
import { useAdminMultipleDeleteTagMapping } from '@/_hooks/admin/tags/use-admin-multiple-delete-tag-mapping';
import { useAlert } from '@/_hooks/common/use-alert';
import { useGetPostByNo } from '@/_hooks/posts';
import { getTagByName } from '@/_libs/api/getTagByName';
import { Api } from '@/_libs/tools/axios.tools';
import { DateFormat, DateTools } from '@/_libs/tools/date.tools';
import { useEditMode, usePostActions, usePostData, usePostTags } from '@/_stores/posts.store';
import type { Menu } from '@/_types/common.types';

// BlockNoteEditorDynamic은 PostEditorMain에서 사용
export const BlockNoteEditorDynamic = dynamic(
  () => import('./BlockNoteEditor')
    .then((mod) => ({ default: mod.BlockNoteEditor, })),
  {
    ssr: false,
    loading: () => (
      <div className='p-5 border border-black-300 rounded-2'>
        <div className='text-black-500'>에디터를 불러오는 중...</div>
      </div>
    ),
  }
) as typeof import('./BlockNoteEditor').BlockNoteEditor;

interface Props {}

/**
 * BlockNote 에디터의 본문이 비어있는지 확인하는 함수
 * @param blocks - BlockNote Block 배열
 * @returns 본문이 비어있으면 true, 그렇지 않으면 false
 */
const isPostContentEmpty = (blocks: Block[] | null | undefined): boolean => {
  if (!blocks || blocks.length === 0) {
    return true;
  }

  try {
    // JSON 문자열로 변환하여 확인
    const jsonString = JSON.stringify(blocks);
    const normalizedJson = jsonString.replace(
      /\s/g,
      ''
    );

    // 빈 배열이거나 기본 paragraph 블록만 있는 경우 (빈 content)
    // BlockNote의 기본 빈 블록은 보통 [{"type":"paragraph","content":[]}] 또는 [{"type":"paragraph","content":""}] 형태
    const isEmptyPatterns = [
      // content가 빈 배열인 경우
      /^\[\s*\{\s*"type"\s*:\s*"paragraph"\s*,\s*"content"\s*:\s*\[\s*\]\s*\}\s*\]$/,
      // content가 빈 문자열인 경우
      /^\[\s*\{\s*"type"\s*:\s*"paragraph"\s*,\s*"content"\s*:\s*""\s*\}\s*\]$/,
      // content가 없고 children도 없는 경우
      /^\[\s*\{\s*"type"\s*:\s*"paragraph"\s*\}\s*\]$/,
    ];

    if (isEmptyPatterns.some((pattern) => pattern.test(normalizedJson))) {
      return true;
    }

    // JSON에서 실제 텍스트 콘텐츠가 있는지 확인
    // content 배열에 실제 텍스트가 있는지, 또는 children에 내용이 있는지 확인
    const hasNonEmptyContent = blocks.some((block) => {
      const blockStr = JSON.stringify(block);

      // content가 빈 배열이거나 빈 문자열이 아닌 경우
      const hasContent = !blockStr.match(/"content"\s*:\s*\[\s*\]/)
        && !blockStr.match(/"content"\s*:\s*""/)
        && blockStr.includes('"content"');

      // children이 있고 비어있지 않은 경우
      const hasChildren = blockStr.includes('"children"')
        && !blockStr.match(/"children"\s*:\s*\[\s*\]/);

      // content에 실제 텍스트가 있는지 확인 (인라인 콘텐츠 배열에 텍스트가 있는지)
      const hasTextInContent = blockStr.match(/"content"\s*:\s*\[[^\]]*"text"[^\]]*\]/)
        || blockStr.match(/"content"\s*:\s*"[^"]+"/);

      return hasContent || hasChildren || hasTextInContent !== null;
    });

    return !hasNonEmptyContent;
  }
  catch {
    // JSON 변환 실패 시 안전하게 false 반환 (에러가 있으면 비어있다고 간주하지 않음)
    return false;
  }
};

function PostEditorContent() {
  const params = useSearchParams();
  const pstNo = params.get('pstNo');

  const editMode = useEditMode();
  const postData = usePostData();
  const postTags = usePostTags();

  const { setPostData, setErrors, clearErrors, setTags, } = usePostActions();
  const router = useRouter();
  const { triggerError, triggerConfirm, } = useAlert();

  const { response, loading, done, } = useGetPostByNo(Number(pstNo));
  const updatePostMutation = useAdminUpdatePost(Number(pstNo) || 0);
  const createTagMutation = useAdminCreateTag();

  // 태그 매핑 상태 관리
  const [
    existingTagMappings,
    setExistingTagMappings,
  ] = useState<Array<{
    tagMapNo: number;
    tagNo: number;
    tagNm: string;
  }>>([]);

  // 태그 매핑 관련 훅
  const addTagMappingMutation = useAdminMultipleAddTagMapping();
  const deleteTagMappingMutation = useAdminMultipleDeleteTagMapping();

  // 포스트의 태그 매핑 조회 (pstNo가 있을 때만)
  const { response: tagMappingResponse, } = useAdminGetTagMapping(
    {
      pstNo: Number(pstNo) || 0,
      delYn: 'N',
    },
    !!pstNo
  );

  const serializePostMtxt = (blocks: Block[] | null | undefined): string => {
    return blocks
      ? JSON.stringify(blocks)
      : '[]';
  };

  const getFormData = useCallback(
    () => ({
      pstTtl: postData.pstTtl,
      pstSmry: postData.pstSmry,
      pstMtxt: serializePostMtxt(postData.pstMtxt),
      pstCd: postData.pstCd,
      pstThmbLink: postData.pstThmbLink || undefined,
      pstStts: postData.pstStts,
      publDt: postData.publDt,
      pinYn: postData.pinYn,
      rlsYn: postData.rlsYn,
      archYn: postData.archYn,
      secrYn: postData.secrYn,
      pstPswd: postData.pstPswd,
      ctgryNo: postData.ctgryNo,
    }),
    [ postData, ]
  );

  const form = useForm({
    mode: 'all',
    resolver: zodResolver(updatePostSchema),
    defaultValues: {
      pstTtl: postData.pstTtl,
      pstSmry: postData.pstSmry,
      pstMtxt: serializePostMtxt(postData.pstMtxt),
      pstCd: postData.pstCd,
      pstThmbLink: postData.pstThmbLink || undefined,
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

  const preparePostDataForValidation = () => {
    // postData를 zod 스키마 형식에 맞게 변환
    const data = {
      pstTtl: postData.pstTtl || undefined,
      pstSmry: postData.pstSmry || undefined,
      pstMtxt: serializePostMtxt(postData.pstMtxt),
      pstCd: postData.pstCd || undefined,
      pstThmbLink: postData.pstThmbLink || undefined,
      pstStts: postData.pstStts,
      publDt: postData.publDt || undefined,
      pinYn: postData.pinYn,
      rlsYn: postData.rlsYn,
      archYn: postData.archYn,
      secrYn: postData.secrYn,
      pstPswd: postData.pstPswd || undefined,
      ctgryNo: postData.ctgryNo,
    };

    // 빈 문자열을 undefined로 변환 (본문 제외)
    return Object.fromEntries(Object.entries(data).map(([
      key,
      value,
    ]) => [
      key,
      key === 'pstMtxt'
        ? value
        : value === ''
          ? undefined
          : value,
    ]));
  };

  const onValidationError = () => {
    triggerError('필수값이 누락되었습니다.');
  };

  const validatePostData = useCallback(
    async (): Promise<{
      isValid: boolean;
      errors: Array<{
        field: string;
        message: string;
      }>;
    }> => {
      // form 검증 먼저 실행
      await form.trigger();

      // formState.errors가 업데이트될 때까지 약간의 지연
      await new Promise((resolve) => {
        setTimeout(
          resolve,
          0
        );
      });

      // 본문이 비어있는지 확인
      const isContentEmpty = isPostContentEmpty(postData.pstMtxt);

      // form 에러와 본문 에러를 합침
      const formErrors = Object.entries(form.formState.errors).map(([
        field,
        error,
      ]) => ({
        field,
        message: error?.message || '검증 오류가 발생했습니다.',
      }));

      const contentError = isContentEmpty
        ? [
          {
            field: 'pstMtxt',
            message: '본문은 필수입니다.',
          },
        ]
        : [];

      const allErrors = [
        ...formErrors,
        ...contentError,
      ];

      // 에러를 스토어에 저장
      if (allErrors.length > 0) {
        setErrors(allErrors);
        return {
          isValid: false,
          errors: allErrors,
        };
      }

      // 검증 통과 시 에러 초기화
      clearErrors();
      return {
        isValid: true,
        errors: [],
      };
    },
    [
      form,
      postData,
      setErrors,
      clearErrors,
    ]
  );

  /**
   * 태그 이름으로 태그를 조회하고, 없으면 생성하는 헬퍼 함수
   * @param tagName 태그 이름
   * @returns 태그 번호 (실패 시 null)
   */
  const findOrCreateTag = async (tagName: string): Promise<number | null> => {
    try {
      // 1. 태그 이름으로 조회
      const existingTag = await getTagByName(tagName);

      // 2. 이미 존재하는 경우 태그 번호 반환
      if (existingTag?.tagNo) {
        return existingTag.tagNo;
      }

      // 3. 존재하지 않는 경우 생성
      const createdTagResponse = await createTagMutation.mutateAsync({
        tagNm: tagName,
      });

      if (createdTagResponse?.data?.tagNo) {
        return createdTagResponse.data.tagNo;
      }

      return null;
    }
    catch (error) {
      console.error(
        '태그 조회/생성 실패:',
        error
      );
      return null;
    }
  };

  // 태그 매핑 처리 함수
  const syncTagMappings = async (pstNoValue: number) => {
    if (!pstNoValue) {
      return;
    }

    try {
      // 1. 기존 매핑된 태그 리스트 가져오기 (이미 existingTagMappings에 있음)
      const existingTagNames = existingTagMappings.map((m) => m.tagNm);
      const currentTagNames = postTags.map((tag) => tag.tagText);

      // 2. 입력된 태그 리스트와 비교해서 기존에 있는 태그 식별 (태그 번호 기억)
      const existingTagNos: number[] = [];
      for (let i = 0; i < postTags.length; i++) {
        const tag = postTags[i];
        if (!tag) {
          continue;
        }
        // 이미 tagNo가 있는 경우 사용
        if (tag.tagNo !== null) {
          existingTagNos.push(tag.tagNo);
        }
        else {
          // tagNo가 없는 경우 기존 매핑에서 찾기
          const existingMapping = existingTagMappings.find((m) => m.tagNm === tag.tagText);
          if (existingMapping) {
            existingTagNos.push(existingMapping.tagNo);
          }
        }
      }

      // 3. 신규 태그로 추가할 태그 식별 (입력된 태그 중 기존 매핑에 없는 것)
      const newTagNames = currentTagNames.filter((tagName) => !existingTagNames.includes(tagName));

      // 4. 신규 태그 추가 (태그 이름으로 조회해서 존재하지 않을 때만 추가)
      const newTagNos: number[] = [];
      for (const tagName of newTagNames) {
        const tagNo = await findOrCreateTag(tagName);
        if (tagNo) {
          newTagNos.push(tagNo);
        }
      }

      // 5. 기존 태그 번호들과 신규 태그 번호들을 하나의 배열로 묶기
      const allTagNos = [
        ...existingTagNos,
        ...newTagNos,
      ];

      // 6. 기존 태그 매핑을 전부 삭제
      if (existingTagMappings.length > 0) {
        const tagMapNoList = existingTagMappings.map((m) => m.tagMapNo);
        await deleteTagMappingMutation.mutateAsync({
          tagMapNoList,
        });
      }

      // 7. 신규 매핑 추가
      if (allTagNos.length > 0) {
        const tagMappings: Array<{ pstNo: number;
          tagNo: number; }> = allTagNos.map((tagNo) => ({
          pstNo: pstNoValue,
          tagNo,
        }));

        await addTagMappingMutation.mutateAsync(tagMappings);
      }

      // 태그 매핑 동기화 후 기존 매핑 정보 업데이트
      // 태그 매핑을 다시 조회하여 최신 상태로 업데이트
      try {
        const updatedMappingResponse = await Api.getQuery<{
          list: Array<{
            tagMapNo: number;
            tagNo: number;
            tag: {
              tagNm: string;
            } | null;
          }>;
          totalCnt: number;
        }>(`admin/tags/mapping/search?pstNo=${pstNoValue}&delYn=N`);

        if (!updatedMappingResponse.error && updatedMappingResponse.data) {
          const updatedMappings = updatedMappingResponse.data.list.map((mapping) => ({
            tagMapNo: mapping.tagMapNo,
            tagNo: mapping.tagNo,
            tagNm: mapping.tag?.tagNm || '',
          }));
          setExistingTagMappings(updatedMappings);
          // 스토어의 태그 목록도 업데이트 (tagNo 포함)
          setTags(updatedMappings.map((mapping) => ({
            tagNo: mapping.tagNo,
            tagText: mapping.tagNm,
          })));
        }
      }
      catch {
        // 태그 매핑 재조회 실패 시 무시 (이미 동기화는 완료됨)
      }
    }
    catch (error) {
      console.error(
        '태그 매핑 동기화 실패:',
        error
      );
      triggerError('태그 매핑 동기화에 실패했습니다.');
    }
  };

  const onSavePost = async () => {
    if (!pstNo) {
      triggerError('포스트 번호가 없습니다.');
      return;
    }

    const validationResult = await validatePostData();
    if (!validationResult.isValid) {
      onValidationError();
      return;
    }

    // 검증 통과 후 postData를 zod로 파싱하여 타입 안전한 데이터 얻기
    const data = preparePostDataForValidation();
    const parsedData = updatePostSchema.parse(data);

    triggerConfirm(
      '포스트를 저장하시겠습니까?',
      async () => {
        await updatePostMutation.mutateAsync({
          ...parsedData,
          pstStts: 'WRITING',
        });
        // 포스트 저장 후 태그 매핑 동기화
        if (pstNo) {
          await syncTagMappings(Number(pstNo));
        }
      }
    );
  };

  const onPublishPost = async () => {
    if (!pstNo) {
      triggerError('포스트 번호가 없습니다.');
      return;
    }

    const validationResult = await validatePostData();
    if (!validationResult.isValid) {
      onValidationError();
      return;
    }

    // 검증 통과 후 postData를 zod로 파싱하여 타입 안전한 데이터 얻기
    const data = preparePostDataForValidation();
    const parsedData = updatePostSchema.parse(data);

    triggerConfirm(
      '포스트를 발행하시겠습니까?',
      async () => {
        const now = DateTools.format(
          DateTools.now(),
          DateFormat.DATETIME
        );

        await updatePostMutation.mutateAsync({
          ...parsedData,
          rlsYn: 'Y',
          pstStts: 'FINISHED',
          publDt: (parsedData.publDt as string | undefined)
            || now,
        });
        // 포스트 발행 후 태그 매핑 동기화
        if (pstNo) {
          await syncTagMappings(Number(pstNo));
        }
      }
    );
  };

  const menuItems: Menu[] = [
    {
      icon: <MdSave className='size-5' />,
      name: '저장',
      action: onSavePost,
      classNames: 'button-outline-black-900 hover:button-normal-blue-500',
    },
    {
      icon: <MdPublish className='size-5' />,
      name: '발행',
      action: onPublishPost,
      classNames: 'button-outline-black-900 hover:button-normal-blue-500',
    },
  ];

  // postData 변경 시 form 값 동기화 및 검증 실행
  useEffect(
    () => {
      const formData = getFormData();

      // form 값 업데이트
      Object.entries(formData).forEach(([
        key,
        value,
      ]) => {
        form.setValue(
          key as keyof typeof formData,
          value,
          {
            shouldValidate: false,
            shouldDirty: false,
          }
        );
      });

      // 검증 실행 (form.trigger와 본문 검증 포함)
      // 최초 로딩 시에도 검증이 실행되도록 함
      validatePostData();
    },
    [
      postData,
      form,
      setErrors,
      clearErrors,
      validatePostData,
      getFormData,
    ]
  );

  // 포스트 로드 시 태그 매핑 조회하여 태그 목록에 반영 (pstNo가 있을 때만)
  useEffect(
    () => {
      if (!pstNo) {
        // 새 포스트인 경우 빈 배열로 초기화
        setTags([]);
        setExistingTagMappings([]);
        return;
      }

      if (tagMappingResponse?.data?.list) {
        const tagMappings = tagMappingResponse.data.list.map((mapping) => ({
          tagMapNo: mapping.tagMapNo,
          tagNo: mapping.tagNo,
          tagNm: mapping.tag?.tagNm || '',
        }));

        setExistingTagMappings(tagMappings);
        setTags(tagMappings.map((mapping) => ({
          tagNo: mapping.tagNo,
          tagText: mapping.tagNm,
        })));
      }
      else if (tagMappingResponse?.data && tagMappingResponse.data.list.length === 0) {
        // 태그 매핑이 없는 경우 빈 배열로 초기화
        setTags([]);
        setExistingTagMappings([]);
      }
    },
    [
      pstNo,
      tagMappingResponse?.data,
      setTags,
    ]
  );

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
          pstMtxt: (response.data.pstMtxt as Block[]) ?? [],
          pstCd: response.data.pstCd ?? '',
          pstThmbLink: response.data.pstThmbLink || undefined,
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
      }
    },
    [
      pstNo,
      router,
      response?.data,
      done,
      setPostData,
    ]
  );

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
              <PostEditorMain />
            </Frame.Main>
            <Frame.Side.Container sidePosition='right' title='사이드바'>
              <PostEditorSidebar />
            </Frame.Side.Container>
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
