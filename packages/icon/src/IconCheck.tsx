import React from 'react';

const IconCheck: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask
        id="mask0_773_2908"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="12"
        height="12"
      >
        <rect width="12" height="12" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_773_2908)">
        <path
          d="M3.8345 8.29025L9.9075 2.2075C10.0455 2.06917 10.221 2 10.434 2C10.6472 2 10.823 2.069 10.9615 2.207C11.0998 2.345 11.169 2.52058 11.169 2.73375C11.169 2.94708 11.0998 3.123 10.9615 3.2615L4.46725 9.746C4.28642 9.92683 4.0755 10.0173 3.8345 10.0173C3.5935 10.0173 3.38258 9.92683 3.20175 9.746L0.7075 7.2615C0.569167 7.1235 0.5 6.948 0.5 6.735C0.5 6.52183 0.569 6.346 0.707 6.2075C0.845 6.06917 1.02058 6 1.23375 6C1.44708 6 1.623 6.06917 1.7615 6.2075L3.8345 8.29025Z"
          fill="white"
        />
      </g>
    </svg>
  );
};

export default IconCheck;
