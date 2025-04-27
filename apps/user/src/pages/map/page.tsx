import Header from '@/components/common/Header';
import MapContent from '@/components/map/MapContent/MapContent';
import { color } from '@teka/design-system';
import { flex } from '@teka/utils';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const MapPage = () => {
  const [searchParams] = useSearchParams();
  const lat = parseFloat(searchParams.get('lat') || '0');
  const lng = parseFloat(searchParams.get('lng') || '0');

  return (
    <StyledMapPage>
      <Header title="지도" />
      <MapContent lat={lat} lng={lng} />
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
