import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import styled from "styled-components";

export function SearchBar() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <SearchBarElement>
      <div className="search-bar-input">
        <div className="icon">
          <MdSearch size="22px" />
        </div>
        <input placeholder="Pesquise por qualquer coisa" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />
      </div>

      <div className="search-bar-results">
        <SearchResults
          results={[
            { title: "teste1", link: "/teste" },
            { title: "teste2", link: "/teste" },
            { title: "teste3", link: "/teste" },
          ]}
          onClickResult={(result) => console.log(result)}
        />
      </div>
    </SearchBarElement>
  );
}

const SearchBarElement = styled.div`
  position: relative;

  .search-bar-input {
    z-index: 1002;
    position: relative;
    display: flex;
    padding: 6px 12px;
    border-radius: 30px;
    border: 1px solid #000;
    padding: 13px 0;
  }

  .icon {
    margin-left: 15px;
  }

  .result-item {
    padding: 12px;
    font-weight: 700;
    text-decoration: none;
  }

  .result-item:not(:last-child) {
    border-bottom: solid 1px #f0f0f0;
  }

  .result-item:hover {
    background-color: #f5eded;
  }

  .search-results {
    background-color: #fff;
    position: absolute;
    top: calc(100% -4px);
    padding-top: 4px;
    left: 0;
    width: 100%;
    z-index: 1001;
    border: solid 1px #f0f0f0;
  }

  .search-results,
  .result-item:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  input {
    border: 0;
    outline: none;
    width: 100%;
    background-color: transparent;
  }
`;

type SearchResult = {
  title: string;
  link: string;
};

type SearchResultsProps = {
  results: SearchResult[];
  onClickResult: (searchResult: SearchResult) => void;
};

function SearchResults({ results, onClickResult }: SearchResultsProps) {
  return (
    <div className="search-results">
      {results.map((result, index) => (
        <div className="result-item" key={index}>
          <a
            className="result-item"
            href={result.link}
            onClick={(event) => {
              event.preventDefault();
              onClickResult(result);
            }}
          >
            {result.title}
          </a>
        </div>
      ))}
    </div>
  );
}
