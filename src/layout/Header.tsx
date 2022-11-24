import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { SearchBar } from "../components/SearchBar";
import { ToolBar } from "../components/ToolBar";
import { UdemyLogo } from "../components/UdemyLogo";

export function Header() {
  return (
    <HeaderApp>
      <HeaderAppContent>
        <div className="row">
          <Link href="/">
            <UdemyLogo height="34px" fill="#000" />
          </Link>
        </div>
        <div className="row">
          <SearchBar />
        </div>
        <div className="row">
          <ToolBar />
        </div>
      </HeaderAppContent>
    </HeaderApp>
  );
}

const HeaderApp = styled.header`
  background-color: #fff;
  border-bottom: 1px solid #ccc;
`;

const HeaderAppContent = styled.div`
  display: flex;
  align-items: center;
  height: 74px;
  padding: 0 24px;

  .row {
    flex: 1;
  }
`;
