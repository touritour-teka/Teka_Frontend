import { useRef, useState } from 'react';
import getGoogleMapsLink from '@/apis/maps/getGoogleMapsLink';
import { usePostImageMutation, usePostMessageMutation } from '@/services/chat/mutations';
import { useAtomValue } from 'jotai';
import { chatroomUuidAtom } from '@/stores/chat';

export const useMessageInput = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showOptionsPanel, setShowOptionsPanel] = useState(false);
  const { postImageMutate } = usePostImageMutation();

  const handleFileOpen = () => {
    setShowOptionsPanel((prev) => !prev);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      postImageMutate(
        { file },
        {
          onSuccess: (imagePath) => {
            postMessageMutate({
              message: `${process.env.REACT_APP_BASE_URL}/${imagePath}`,
              type: 'IMAGE',
            });
            setShowOptionsPanel(false);
          },
        }
      );
    }
  };

  const handleSendLocation = () => {
    if (!navigator.geolocation) {
      alert('위치 정보를 지원하지 않는 브라우저입니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapsLink = getGoogleMapsLink(latitude, longitude);
        postMessageMutate({
          message: mapsLink,
          type: 'TEXT',
        });
      },
      () => {
        alert('위치 정보를 가져올 수 없습니다.');
      }
    );
  };

  const handleTakePhoto = () => {
    fileInputRef.current?.click();
  };

  const handleSelectPhoto = () => {
    fileInputRef.current?.click();
  };

  const [message, setMessage] = useState('');
  const chatroomUuid = useAtomValue(chatroomUuidAtom);
  const { postMessageMutate } = usePostMessageMutation(chatroomUuid!);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    postMessageMutate({
      message,
      type: 'TEXT',
    });
    setMessage('');
  };

  return {
    showOptionsPanel,
    fileInputRef,
    handleFileOpen,
    handleFileChange,
    handleSendLocation,
    handleTakePhoto,
    handleSelectPhoto,
    message,
    setMessage,
    handleSendMessage,
  };
};
