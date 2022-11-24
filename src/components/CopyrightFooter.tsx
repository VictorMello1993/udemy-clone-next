import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { UdemyLogo } from "./UdemyLogo";

export function CopyrightFooter() {
  return (
    <CopyrightFooterElement>
      <UdemyLogo height="34px" fill="#fff" />
      <div className="footer-links">
        <Link href="/">
          <span>Home</span>
        </Link>
        <Link href="/">
          <span>Contato</span>
        </Link>
      </div>
      <div className="copyright-description">
        <span>© 2022 Udemy, Inc. por Victor Mello</span>
      </div>
    </CopyrightFooterElement>
  );
}

const CopyrightFooterElement = styled.div`
  padding: 12px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .footer-links a {
    text-decoration: none;
    color: #fff;
  }

  .footer-links > a {
    margin-right: 15px;
  }

  @media (min-width: 500px) and (max-width: 800px) {
    .copyright-description {
      width: 25vw;
    }
  }
`;
