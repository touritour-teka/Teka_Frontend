import styled from 'styled-components';
import { forwardRef } from 'react';

const MapContainer = forwardRef<HTMLDivElement>((_, ref) => {
  return <Container ref={ref} />;
});

export default MapContainer;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
