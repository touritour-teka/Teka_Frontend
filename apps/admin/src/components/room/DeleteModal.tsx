import { Text } from '@teka/ui';
import Modal from '../common/Modal/Modal';
import { color } from '@teka/design-system';
import { useDeleteChatRoomMutation } from '@/services/room/mutations';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  id: number;
}

const DeleteModal = ({ isOpen, onClose, onConfirm, id }: DeleteModalProps) => {
  const { deleteChatRoomMutate } = useDeleteChatRoomMutation();

  const handleOnClose = () => {
    onClose();
  };

  const handleOnConfirm = () => {
    deleteChatRoomMutate(id);
    onConfirm();
  };

  return (
    <Modal
      isOpen={isOpen}
      style={{ position: 'relative', overflow: 'hidden' }}
      title={`채팅방 삭제하기`}
      onClose={handleOnClose}
      onConfirm={handleOnConfirm}
    >
      <Text fontType="regular12" color={color.gray600}>
        인원 추가에 실패하였습니다.
        <br />
        채팅방 삭제 후 다시 시도해주세요.
      </Text>
    </Modal>
  );
};

export default DeleteModal;
