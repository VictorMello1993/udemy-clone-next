import React from "react";
import styled from "styled-components";

export type AvatarProps = {} & { src: string };

export function Avatar({ ...data }: AvatarProps) {
  return <AvatarElement>{"src" in data && <img src={data.src} />}</AvatarElement>;
}

const AvatarElement = styled.div`
  width: 35px;
  height: 35px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
`;
