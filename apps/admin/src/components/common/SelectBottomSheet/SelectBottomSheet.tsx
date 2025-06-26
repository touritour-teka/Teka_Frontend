import Button from '@/components/Button';
import {
  usePatchRoomCloseMutation,
  usePatchRoomOpenMutation,
} from '@/services/room/mutations';
import { Status } from '@/types/room/client';
import { color } from '@teka/design-system';
import { Column, Row, Text } from '@teka/ui';
import { flex } from '@teka/utils';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface SelectBottomSheetProps {
  onClose: () => void;
  isOpen: boolean;
  selectedId: number;
  status: Status;
}

const SelectBottomSheet = ({
  onClose,
  isOpen,
  selectedId,
  status,
}: SelectBottomSheetProps) => {
  const [selectedStatus, setSelectedStatus] = useState<Status>(status);
  const { chatRoomOpenMutate } = usePatchRoomOpenMutation(selectedId);
  const { chatRoomCloseMutate } = usePatchRoomCloseMutation(selectedId);

  const handleConfirm = () => {
    if (selectedStatus === 'OPEN') {
      chatRoomOpenMutate();
      onClose();
      window.location.reload();
    } else {
      chatRoomCloseMutate();
      onClose();
      window.location.reload();
    }
  };

  const handleOnClose = () => {
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <BlurBackground $isOpen={isOpen}>
      <StyledSelectBottomSheet>
        <Column gap={20}>
          <Column gap={20}>
            <Text fontType="semibold18" color={color.gray900}>
              채팅방 상태 변경
            </Text>
            <Column gap={10}>
              <StyledOutlineButton
                selected={selectedStatus === 'OPEN'}
                onClick={() => setSelectedStatus('OPEN')}
              >
                <Column gap={8}>
                  <Text fontType="semibold18" color={color.gray900}>
                    운영 중
                  </Text>
                  <Text fontType="regular14" color={color.gray400}>
                    기본적인 채팅방의 형태입니다.
                  </Text>
                </Column>
              </StyledOutlineButton>
              <StyledOutlineButton
                selected={selectedStatus === 'CLOSED'}
                onClick={() => setSelectedStatus('CLOSED')}
              >
                <Column gap={8}>
                  <Text fontType="semibold18" color={color.gray900}>
                    클로즈
                  </Text>
                  <Text fontType="regular14" color={color.gray400}>
                    관리자를 제외하고 채팅방을 볼 수 없습니다.
                  </Text>
                </Column>
              </StyledOutlineButton>
            </Column>
          </Column>
          <Row gap={10}>
            <CancelButton onClick={handleOnClose}>
              <Text fontType="semibold16" color={color.white}>
                취소
              </Text>
            </CancelButton>
            <Button onClick={handleConfirm}>확인</Button>
          </Row>
        </Column>
      </StyledSelectBottomSheet>
    </BlurBackground>
  );
};

export default SelectBottomSheet;

const BlurBackground = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

const StyledSelectBottomSheet = styled.div`
  width: 100%;
  max-width: 400px;
  height: 394px;
  position: fixed;
  bottom: 0;
  background-color: ${color.white};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 32px 16px 66px;
`;

const CancelButton = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'center' })}
  width: 100%;
  max-width: 166.5px;
  height: 52px;
  background-color: ${color.gray100};
  border-radius: 12px;
`;

const StyledOutlineButton = styled.div<{ selected: boolean }>`
  ${flex({ alignItems: 'center', justifyContent: 'flex-start' })}
  padding: 20px;
  width: 100%;
  height: 80px;
  border-radius: 10.71px;
  background-color: ${({ selected }) => (selected ? color.blue100 : color.gray50)};
  border: 1px solid ${({ selected }) => (selected ? color.blue800 : color.gray100)};
  cursor: pointer;
`;
