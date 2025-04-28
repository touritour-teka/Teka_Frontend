import React from 'react';

const IconArrowForward: React.FC<React.SVGProps<SVGSVGElement>> = ({
  color = '#009FFD',
  ...props
}) => {
  return (
    <svg viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask
        id="mask0_748_2490"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="18"
        height="19"
      >
        <rect y="0.90918" width="18" height="18" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_748_2490)">
        <path
          d="M6.0117 17.1494L4.94727 16.085L11.1231 9.90914L4.94727 3.73326L6.0117 2.66882L13.252 9.90914L6.0117 17.1494Z"
          fill={color}
        />
      </g>
    </svg>
  );
};

export default IconArrowForward;
