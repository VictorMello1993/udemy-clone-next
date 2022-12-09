import React from "react";

export type CheckedImageProps = {
  width?: string | number;
  height?: string | number;
  fill?: string;
  checked: boolean;
};

export function CheckedImage({ width, height, fill, checked }: CheckedImageProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ width, height }} fill="#000000" viewBox="0 0 256 256">
      <rect width="256" height="256" fill="none"></rect>
      {checked ? <polyline points="172 104 113.3 160 84 132" fill="none" stroke="#000000" stroke-linecap="round" strokeLinejoin="round" stroke-width="16"></polyline> : null}
      <rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="#000000" stroke-linecap="round" strokeLinejoin="round" stroke-width="16"></rect>
    </svg>
  );
}
