import { useRef, useState } from 'react';
import getGoogleMapsLink from '@/apis/maps/getGoogleMapsLink';

export const useMessageInput = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showOptionsPanel, setShowOptionsPanel] = useState(false);

  const handleFileOpen = () => {
    setShowOptionsPanel((prev) => !prev);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('첨부 파일:', file);
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
        console.log('📍 위치 링크:', mapsLink);
      },
      (error) => {
        console.error(error);
        alert('위치 정보를 가져올 수 없습니다.');
      }
    );
  };

  const handleTakePhoto = () => {
    console.log('카메라 촬영 클릭');
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
