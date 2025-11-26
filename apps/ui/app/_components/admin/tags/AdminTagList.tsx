'use client';

import type { SelectTagInfoListItemType } from '@nihilog/schemas';
import { useMutation } from '@tanstack/react-query';
import { cva, type VariantProps } from 'class-variance-authority';
import { useState } from 'react';
import { MdLocalOffer } from 'react-icons/md';

import { NewTagForm } from '@/_components/admin/tags/NewTagForm';
import { UpdateTagForm } from '@/_components/admin/tags/UpdateTagForm';
import { Loading } from '@/_components/common/Loading';
import { Box } from '@/_components/ui/box';
import { Button } from '@/_components/ui/button';
import { Input } from '@/_components/ui/input';
import { useAlert } from '@/_hooks/common/use-alert';
import { useGetTagList } from '@/_hooks/tags';
import { Api } from '@/_libs';
import type { ReactElementProps } from '@/_types/common.types';

// 기본값은 HTMLDivElement, 'className'
interface Props
  extends ReactElementProps<'div'>, VariantProps<typeof _cssVariants> {
  className?: string | string[];
  custom?: {
    div?: string | string[];
  };
}

const _cssVariants = cva(
  [ '', ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function AdminTagList({ }: Props) {
  const [
    newModalOpen,
    setNewModalOpen,
  ] = useState(false);
  const [
    updateModalOpen,
    setUpdateModalOpen,
  ] = useState(false);
  const [
    selectedTag,
    setSelectedTag,
  ] = useState<SelectTagInfoListItemType | null>(null);

  const { response, loading, done, refetch, } = useGetTagList({
    srchMode: 'ADMIN',
    delYn: 'N',
  });
  const { triggerConfirm, } = useAlert();

  const deleteTagMutation = useMutation({
    mutationFn: async (tagNo: number) => {
      return await Api.deleteQuery<boolean>(`admin/tags/${tagNo}`);
    },
    onSuccess() {
      refetch();
    },
  });

  const onOpenUpdateModal = (tag: SelectTagInfoListItemType) => {
    setSelectedTag(tag);
    setUpdateModalOpen(true);
  };

  const onOpenNewModal = () => {
    setNewModalOpen(true);
  };

  const onCloseNewModal = () => {
    setNewModalOpen(false);
  };

  const onCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedTag(null);
  };

  const onDeleteTag = (tag: SelectTagInfoListItemType, e: React.MouseEvent) => {
    e.stopPropagation();
    triggerConfirm(
      `태그 "${tag.tagNm}"을(를) 삭제하시겠습니까?`,
      () => {
        deleteTagMutation.mutate(tag.tagNo);
      }
    );
  };

  return (
    <Box.Panel panel={false}>
      <Box.Top title='태그 목록'>
        <Box.Action>
          <Button.Action
            label='태그 추가'
            onClick={onOpenNewModal}
          />
        </Box.Action>
      </Box.Top>
      <Box.Content>
        {loading && (
          <Loading message='태그 목록을 불러오는 중...' />
        )}
        {done && response && (
          <div className='flex flex-wrap gap-2'>
            {response.data.list.map((tag) => (
              <Input.TextItem
                key={tag.tagNo}
                text={tag.tagNm}
                icon={<MdLocalOffer />}
                color={tag.tagColr ?? undefined}
                onClick={() => {
                  onOpenUpdateModal(tag);
                }}
                onDelete={(e) => {
                  onDeleteTag(
                    tag,
                    e
                  );
                }}
                clickable
              />
            ))}
          </div>
        )}
      </Box.Content>

      <NewTagForm
        open={newModalOpen}
        onClose={onCloseNewModal}
        onSuccess={() => {
          refetch();
        }}
      />

      {selectedTag && (
        <UpdateTagForm
          open={updateModalOpen}
          onClose={onCloseUpdateModal}
          tag={selectedTag}
        />
      )}
    </Box.Panel>
  );
}
