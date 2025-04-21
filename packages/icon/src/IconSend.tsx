import React from 'react';

const IconSend: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect y="0.90918" width="36" height="36" rx="18" fill="#009FFD" />
      <mask
        id="mask0_253_3818"
        maskUnits="userSpaceOnUse"
        x="5"
        y="6"
        width="26"
        height="26"
      >
        <rect x="5.40039" y="6.3092" width="25.2" height="25.2" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_253_3818)">
        <path
          d="M9.00391 26.9342V21.0784L16.2731 19.3217L9.00391 17.5651V11.7092L27.076 19.3217L9.00391 26.9342Z"
          fill="#FBFDFF"
        />
      </g>
    </svg>
  );
};

export default IconSend;
