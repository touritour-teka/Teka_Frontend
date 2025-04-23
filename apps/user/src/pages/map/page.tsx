import Header from '@/components/common/Header';
import MapContent from '@/components/map/MapContent';
import { color } from '@teka/design-system';
import { flex } from '@teka/utils';
import styled from 'styled-components';

const MapPage = () => {
  return (
    <StyledMapPage>
      <Header title="지도" />
      <MapContent />
    </StyledMapPage>
  );
};

export default MapPage;

const StyledMapPage = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' })}
  width: 100%;
  height: 100vh;
  background-color: ${color.gray50};
`;
