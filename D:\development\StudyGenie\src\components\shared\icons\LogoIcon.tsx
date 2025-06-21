
import type { SVGProps } from 'react';

export function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      <path d="M12 6v6l4 2" />
      <path d="M8 12h8" />
      <path d="M10 15l-2 2" />
      <path d="M14 15l2 2" />
      <path d="M12 18v-3" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}
