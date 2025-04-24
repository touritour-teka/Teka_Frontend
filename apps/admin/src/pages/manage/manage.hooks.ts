import { ROUTES } from '@/constants/constant';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useCTAButton = () => {
  const navigate = useNavigate();

  const handleMoveRoomCreate = () => {
    navigate(ROUTES.CREATE);
  };

  return { handleMoveRoomCreate };
};
