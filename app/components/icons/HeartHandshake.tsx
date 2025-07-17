// components/icons/HeartHandshake.tsx
import * as React from 'react';

export const HeartHandshake = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.3 4.3a5.09 5.09 0 0 0-7.2 0L12 5.4l-1.1-1.1a5.09 5.09 0 1 0-7.2 7.2L12 21l8.3-8.3a5.09 5.09 0 0 0 0-7.2Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 14l3-3m0 0 2 2 3-3m-5 1.5L10 11m0 0L8.5 9.5"
    />
  </svg>
);