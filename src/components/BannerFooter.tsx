import React from "react";
import styled from "styled-components";

export function BannerFooter() {
  return (
    <BannerFooterElement>
      <div className="teacher-section-description">
        <div className="teacher-section-heading">
          <div className="share-knowledge">Compartilhe seu conhecimento</div>
          <div className="create-course-in-video">Crie um curso em vídeo online, atraia alunos do mundo todo e ganhe dinheiro</div>
        </div>
        <div className="teacher-section-button">
          <a className="teach-at-udemy" href="/">
            <span>Ensine na Udemy</span>
          </a>
        </div>
      </div>
    </BannerFooterElement>
  );
}

const BannerFooterElement = styled.div`
  padding: 12px 48px;
  border-bottom: solid 1px #3e4143;

  .teacher-section-description {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .share-knowledge {
    line-height: 22px;
    font-weight: 700;
    font-size: 19px;
    font-family: udemy sans, -apple-system, BlinkMacSystemFont, Roboto, segoe ui, Helvetica, Arial, sans-serif, apple color emoji, segoe ui emoji, segoe ui symbol;
  }

  .create-course-in-video {
    padding-top: 8px;
  }

  .create-course-in-video {
    font-weight: 400;
    line-height: 22px;
    font-size: 16px;
    font-family: udemy sans, sf pro text, -apple-system, BlinkMacSystemFont, Roboto, segoe ui, Helvetica, Arial, sans-serif, apple color emoji, segoe ui emoji, segoe ui symbol;
  }

  .teach-at-udemy {
    text-decoration: none;
    color: #fff;
    font-weight: 700;
  }

  .teacher-section-button {
    border: 1px solid #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 150px;
  }

  .teacher-section-button:hover {
    background-color: #2b2e2f;
  }

  @media (min-width: 500px) and (max-width: 800px) {
    .teacher-section-button {
      width: 145px;
    }
    .teach-at-udemy {
      line-height: 35px;
      font-size: 14px;
    }

    .create-course-in-video {
      width: 110px;
    }
  }
`;
