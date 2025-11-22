'use client';

import type { UseFormReturn } from 'react-hook-form';
import { BsToggles } from 'react-icons/bs';
import { MdArchive, MdEdit, MdFolder, MdImage, MdLocalOffer, MdLockOutline, MdOutlineTextFields, MdPushPin, MdVpnKey } from 'react-icons/md';

import { PostCategorySelect } from '@/_components/admin/posts/PostCategorySelect';
import { Box } from '@/_components/ui/box';
import { Input } from '@/_components/ui/input';

interface Props {
  form: UseFormReturn<Record<string, unknown>>;
  tags: string[];
  setTags: (tags: string[]) => void;
  selectedCtgryNo?: number;
  pstStts?: string;
  rlsYn?: 'Y' | 'N';
  secrYn?: 'Y' | 'N';
  pinYn?: 'Y' | 'N';
  archYn?: 'Y' | 'N';
  onCategoryChange: (value: number | undefined) => void;
  onStatusChange: (value: string) => void;
  onReleaseChange: (value: 'Y' | 'N') => void;
  onSecretChange: (value: 'Y' | 'N') => void;
  onPinChange: (value: 'Y' | 'N') => void;
  onArchiveChange: (value: 'Y' | 'N') => void;
  onStatusDisplayValue: (value: string) => string;
}

export function PostEditorSidebar({
  form,
  tags,
  setTags,
  selectedCtgryNo,
  pstStts,
  rlsYn,
  secrYn,
  pinYn,
  archYn,
  onCategoryChange,
  onStatusChange,
  onReleaseChange,
  onSecretChange,
  onPinChange,
  onArchiveChange,
  onStatusDisplayValue,
}: Props) {
  return (
    <Box.Content className='gap-5'>
      <Input.Label
        label='포스트 상태'
        icon={<MdEdit />}
        direction='vertical'
      >
        <Input.SelectContainer
          value={pstStts ?? 'EMPTY'}
          onValueChange={onStatusChange}
        >
          <Input.Selection
            placeholder='상태를 선택하세요'
            displayValue={onStatusDisplayValue}
          />
          <Input.Select>
            <Input.SelectItem value='EMPTY'>
              초안 없음
            </Input.SelectItem>
            <Input.SelectItem value='WRITING'>
              작성중
            </Input.SelectItem>
            <Input.SelectItem value='FINISHED'>
              작성완료
            </Input.SelectItem>
          </Input.Select>
        </Input.SelectContainer>
      </Input.Label>

      {/* <Input.Label
        label='발행 일시'
        icon={<MdSchedule />}
        direction='vertical'
      >
        <Input.Text
          type='text'
          placeholder={`${DateFormat.DATETIME} 형식으로 입력하세요`}
          value={publDt || ''}
          onChange={onPublishDateInputChange}
        />
      </Input.Label> */}

      <Input.Label
        label='발행'
        icon={<BsToggles />}
        direction='horizontal'
      >
        <Input.Switch
          value={rlsYn ?? 'N'}
          onChange={onReleaseChange}
        />
      </Input.Label>

      <Input.Label
        label='고정'
        icon={<MdPushPin />}
        direction='horizontal'
      >
        <Input.Switch
          value={pinYn ?? 'N'}
          onChange={onPinChange}
        />
      </Input.Label>

      <Input.Label
        label='아카이브'
        icon={<MdArchive />}
        direction='horizontal'
      >
        <Input.Switch
          value={archYn ?? 'N'}
          onChange={onArchiveChange}
        />
      </Input.Label>

      <Input.Label
        label='비밀글'
        icon={<MdLockOutline />}
        direction='horizontal'
      >
        <Input.Switch
          value={secrYn ?? 'N'}
          onChange={onSecretChange}
        />
      </Input.Label>

      {secrYn === 'Y' && (
        <Input.Label
          label='비밀번호'
          icon={<MdVpnKey />}
          direction='vertical'
        >
          <Input.Text
            type='password'
            placeholder='비밀번호를 입력해주세요.'
            {...form.register('pstPswd')}
          />
        </Input.Label>
      )}

      <Input.Label
        label='썸네일 링크'
        icon={<MdImage />}
        direction='vertical'
      >
        <Input.Text
          type='text'
          placeholder='썸네일 이미지 URL을 입력해주세요.'
          {...form.register('pstThmbLink')}
        />
      </Input.Label>

      <Input.Label
        label='슬러그'
        icon={<MdOutlineTextFields />}
        direction='vertical'
      >
        <Input.Text
          type='text'
          placeholder='슬러그를 입력해주세요.'
          {...form.register('pstCd')}
        />
      </Input.Label>

      <Input.Label
        label='카테고리'
        icon={<MdFolder />}
        direction='vertical'
      >
        <PostCategorySelect
          value={selectedCtgryNo}
          onChange={onCategoryChange}
        />
      </Input.Label>

      <Input.Label
        label='태그'
        icon={<MdLocalOffer />}
        direction='vertical'
      >
        <Input.TextArray
          value={tags}
          onChange={setTags}
          placeholder='태그를 입력하고 Enter를 누르세요'
          maxItems={20}
          inputPosition='bottom'
          custom={{
            item: 'bg-black-100 text-black-900',
            itemButton: 'text-black-700 hover:text-black-900 hover:bg-black-200 focus:ring-black-500',
          }}
        />
      </Input.Label>
    </Box.Content>
  );
}
