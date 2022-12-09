import React from "react";

export type CheckedImageProps = {
  width?: string | number;
  height?: string | number;
  checked: boolean;
};

export function CheckedImage({ width, height, checked }: CheckedImageProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="#000000" viewBox="0 0 256 256">
      <rect width="256" height="256" fill="none"></rect>
      {checked ? (
        <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm-30.5,77.8-58.6,56a8.1,8.1,0,0,1-5.6,2.2,7.9,7.9,0,0,1-5.5-2.2l-29.3-28a8,8,0,1,1,11-11.6l23.8,22.7,53.2-50.7a8,8,0,0,1,11,11.6Z"></path>
      ) : null}
      <rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" strokeWidth="16"></rect>
    </svg>
  );
}
