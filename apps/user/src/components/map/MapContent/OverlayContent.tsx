import { IconArrowForward } from '@teka/icon';
import { color } from '@teka/design-system';

interface OverlayContentProps {
  address: string;
}

const OverlayContent = ({ address }: OverlayContentProps) => {
  return (
    <div style={{ fontFamily: 'Pretendard', fontSize: '14px', fontWeight: 500 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '18px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>이 위치 보내기</div>
          <div
            style={{
              marginTop: '4px',
              fontSize: '12px',
              fontWeight: 400,
              lineHeight: '140%',
            }}
          >
            {address}
          </div>
        </div>
        <IconArrowForward width={24} height={24} color={color.gray900} />
      </div>
    </div>
  );
};

export default OverlayContent;
