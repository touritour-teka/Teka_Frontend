import { useRef, useState } from 'react';
import getGoogleMapsLink from '@/apis/maps/getGoogleMapsLink';
import {
  useUploadImageMutation,
  useSendMessageMutation,
} from '@/services/chat/mutations';

export const useMessageInput = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showOptionsPanel, setShowOptionsPanel] = useState(false);
  const { mutate: uploadImage } = useUploadImageMutation();

  const handleFileOpen = () => {
    setShowOptionsPanel((prev) => !prev);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImage(file);
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
        console.log('Google Maps 링크:', mapsLink);
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

  return {
    showOptionsPanel,
    fileInputRef,
    handleFileOpen,
    handleFileChange,
    handleSendLocation,
    handleTakePhoto,
    handleSelectPhoto,
  };
};
