import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={32}
      height={32}
      {...props}
    >
      <path fill="none" d="M0 0h256v256H0z" />
      <path
        fill="hsl(var(--primary))"
        d="M208 88H48a8 8 0 0 0-8 8v112a8 8 0 0 0 8 8h16v-24a8 8 0 0 1 8-8h104a8 8 0 0 1 8 8v24h16a8 8 0 0 0 8-8V96a8 8 0 0 0-8-8Z"
      />
      <path
        fill="hsl(var(--primary))"
        d="M192 40v32a8 8 0 0 1-8 8H72a8 8 0 0 1-8-8V40a8 8 0 0 1 8-8h112a8 8 0 0 1 8 8Z"
      />
    </svg>
  );
}
