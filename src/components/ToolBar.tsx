import React from "react";
import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";
import { MdNotificationsNone, MdOutlineShoppingCart, MdLogout, MdLogin } from "react-icons/md";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export function ToolBar() {
  const { status } = useSession();
  return (
    <ToolBarItems>
      {status === "authenticated" && (
        <>
          <Link className="item" href="/">
            <AiOutlineHeart size="25px" />
          </Link>
          <Link className="item" href="/">
            <MdOutlineShoppingCart size="25px" />
          </Link>
          <Link className="item" href="/">
            <MdNotificationsNone size="25px" />
          </Link>
          <a
            className="item"
            href="/"
            title="Sair"
            onClick={(event) => {
              event.preventDefault();
              signOut();
            }}
          >
            <MdLogout aria-label="Sair" size="25px" />
          </a>
          <Link className="item" href="/">
            <img width={36} height={36} alt="" src="https://avatars.githubusercontent.com/u/35710766?v=4" style={{ borderRadius: "20px" }} />
          </Link>
        </>
      )}
      {status === "unauthenticated" && (
        <>
          <Link className="item" href="/">
            <AiOutlineHeart size="25px" />
          </Link>
          <Link className="item" href="/">
            <MdOutlineShoppingCart size="25px" />
          </Link>
          <Link className="item" href="/">
            <MdNotificationsNone size="25px" />
          </Link>
          <a className="item" href="/api/auth/signin" aria-label="Efetuar login" title="Entrar">
            <MdLogin size="25px" aria-label="Entrar" />
          </a>
          <Link className="item" href="/api/signup">
            <img width={36} height={36} alt="" src="https://avatars.githubusercontent.com/u/35710766?v=4" style={{ borderRadius: "20px" }} />
          </Link>
        </>
      )}
    </ToolBarItems>
  );
}

const ToolBarItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  a,
  a:active {
    text-decoration: none;
    color: #000;
  }

  a:hover {
    color: #5624d0;
  }

  .item {
    display: flex;
    align-items: center;
  }

  .item:not(:first-child) {
    margin-left: 22px;
  }
`;
