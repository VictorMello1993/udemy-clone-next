import React from "react";
import styled from "styled-components";

export function BannerMainContent() {
  return (
    <BannerElement>
      <div className="image-container">
        <div className="image">
          <img src="https://img-c.udemycdn.com/notices/featured_banner/image_udlite/1cd05c12-f169-45ae-a452-adb8c81739b4.jpg" alt="Banner" />
        </div>
        <div className="banner-description">
          <h1>Encontre o melhor para você</h1>
          <p>Muitos cursos oferecem prévias gratuitas para que você possa conferir o conteúdo e o estilo de ensino. Dê uma olhada.</p>
        </div>
      </div>
    </BannerElement>
  );
}

const BannerElement = styled.div`
  .image-container {
    height: 400px;
    margin: 0 auto;
    width: 89%;
  }

  .banner-description {
    background-color: #fff;
    max-width: 440px;
    height: 150px;
    margin: 24px 48px;
    padding: 24px;
    position: absolute;
    inset: 110px 110px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%);
  }

  img {
    width: 100%;
  }

  h1 {
    font-family: SuisseWorks, Georgia, Times, times new roman, serif, apple color emoji, segoe ui emoji, segoe ui symbol;
    font-size: 32px;
    font-weight: 700;
    line-height: 40px;
  }

  p {
    line-height: 22.4px;
    font-size: 16px;
    font-family: udemy sans, sf pro text, -apple-system, BlinkMacSystemFont, Roboto, segoe ui, Helvetica, Arial, sans-serif, apple color emoji, segoe ui emoji, segoe ui symbol;
  }

  @media (min-width: 500px) and (max-width: 650px) {
    .banner-description {
      left: 5px;
      top: 65px;
      height: 225px;
      max-width: 150px;

      h1 {
        font-size: 24px;
      }

      p {
        font-size: 12px;
      }
    }

    img {
      height: 300px;
    }
  }

  @media (min-width: 650px) and (max-width: 1530px) {
    .image-container {
      height: 290px;
    }

    .banner-description {
      height: 201px;
      top: 65px;
      left: 40px;
      max-width: 220px;
    }

    img {
      height: 274px;
      width: 100%;
    }

    h1 {
      font-size: 20px;
    }

    p {
      font-size: 14px;
    }
  }
`;
