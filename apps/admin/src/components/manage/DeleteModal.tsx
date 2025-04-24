import { Text } from '@teka/ui';
import Modal from '../common/Modal/Modal';
import { color } from '@teka/design-system';
import { useDeleteChatRoomMutation } from '@/services/room/mutations';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  count: number;
  selectedIds: number[];
}

const DeleteModal = ({
  isOpen,
  onClose,
  count,
  onConfirm,
  selectedIds,
}: DeleteModalProps) => {
  const { deleteChatRoomMutate } = useDeleteChatRoomMutation();

  const handleOnClose = () => {
    onClose();
  };

  const handleOnConfirm = () => {
    selectedIds.forEach((id) => deleteChatRoomMutate(id));
    onConfirm();
  };

  return (
    <Modal
      isOpen={isOpen}
      style={{ position: 'relative', overflow: 'hidden' }}
      title={`채팅방 ${count}개 삭제하기`}
      onClose={handleOnClose}
      onConfirm={handleOnConfirm}
    >
      <Text fontType="regular12" color={color.gray600}>
        채팅방 삭제 시 채팅방 복구가 불가합니다.
        <br />
        채팅방을 나가시겠습니까?
      </Text>
    </Modal>
  );
};

export default DeleteModal;
