import React from "react";
import { MdSearch } from "react-icons/md";
import styled from "styled-components";

export function SearchBar() {
  return (
    <SearchBarElement>
      <div className="icon">
        <MdSearch size="22px" />
      </div>
      <input placeholder="Pesquise por qualquer coisa" />
    </SearchBarElement>
  );
}

const SearchBarElement = styled.div`
  display: flex;
  padding: 6px 12px;
  border-radius: 30px;
  border: 1px solid #000;
  padding: 13px 0;

  .icon {
    margin-left: 15px;
  }

  input {
    border: 0;
    outline: none;
    width: 100%;
    background-color: transparent;
  }
`;
