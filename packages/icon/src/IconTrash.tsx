import React from 'react';

const IconTrash: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_389_4893"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_389_4893)">
        <path
          d="M7.30775 20.5C6.80908 20.5 6.38308 20.3234 6.02975 19.9702C5.67658 19.6169 5.5 19.1909 5.5 18.6922V5.99998H4.5V4.49998H9V3.61548H15V4.49998H19.5V5.99998H18.5V18.6922C18.5 19.1974 18.325 19.625 17.975 19.975C17.625 20.325 17.1974 20.5 16.6923 20.5H7.30775ZM17 5.99998H7V18.6922C7 18.7821 7.02883 18.8558 7.0865 18.9135C7.14417 18.9711 7.21792 19 7.30775 19H16.6923C16.7692 19 16.8398 18.9679 16.9038 18.9037C16.9679 18.8397 17 18.7692 17 18.6922V5.99998ZM9.404 17H10.9037V7.99998H9.404V17ZM13.0962 17H14.596V7.99998H13.0962V17Z"
          fill="#FF3232"
        />
      </g>
    </svg>
  );
};

export default IconTrash;
