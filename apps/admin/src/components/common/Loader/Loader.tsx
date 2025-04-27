import React from 'react';
import Lottie from 'lottie-react';
import animationData from './Loader.json';

interface LoaderProps {
  width?: number;
  height?: number;
  loop?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({
  width = 100,
  height = 100,
  loop = true,
}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Lottie animationData={animationData} loop={loop} style={{ width, height }} />
    </div>
  );
};

export default Loader;
