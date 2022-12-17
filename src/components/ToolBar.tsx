import React from "react";
import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";
import { MdNotificationsNone, MdOutlineShoppingCart, MdLogout, MdLogin } from "react-icons/md";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Avatar } from "./Avatar";

export function ToolBar() {
  const { status, data } = useSession();
  return (
    <ToolBarItems>
      <Link className="item" href="/">
        <AiOutlineHeart size="25px" />
      </Link>
      <Link className="item" href="/">
        <MdOutlineShoppingCart size="25px" />
      </Link>
      <Link className="item" href="/">
        <MdNotificationsNone size="25px" />
      </Link>
      {status === "authenticated" && (
        <>
          <a
            className="item"
            href="/api/auth/signout"
            title="Sair"
            onClick={(event) => {
              event.preventDefault();
              signOut();
            }}
          >
            <MdLogout aria-label="Sair" size="25px" />
          </a>
        </>
      )}
      {status === "unauthenticated" && (
        <a className="item" href="/api/auth/signin" aria-label="Efetuar login" title="Entrar">
          <MdLogin size="25px" aria-label="Entrar" />
        </a>
      )}
      <span className="item">
        <Link href={data?.user ? "/user/profile" : "/signup"}>
          <Avatar size={36} name={data?.user.fullname} src={data?.user.fullname ? undefined : "/avatar.jpeg"} alt="" />
        </Link>
      </span>
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
