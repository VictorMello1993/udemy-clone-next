import React from "react";
import styled from "styled-components";

export function NoticeFooter() {
  return (
    <NoticeFooterElement>
      <div className="notice-text">
        <span>As melhores empresas escolhem a Udemy Business para desenvolver as habilidades de carreira necessárias.</span>
      </div>
      <div className="notice-logos">
        <img src="https://s.udemycdn.com/partner-logos/v4/nasdaq-light.svg" height="44" width="115" alt="Nasdaq" />
        <img src="https://s.udemycdn.com/partner-logos/v4/volkswagen-light.svg" height="44" width="44" alt="Volkswagen" />
        <img src="https://s.udemycdn.com/partner-logos/v4/box-light.svg" height="44" width="67" alt="Box Light" />
        <img src="https://s.udemycdn.com/partner-logos/v4/netapp-light.svg" height="44" width="115" alt="Net App" />
        <img src="https://s.udemycdn.com/partner-logos/v4/eventbrite-light.svg" height="44" width="115" alt="Eventbrite" />
      </div>
    </NoticeFooterElement>
  );
}

const NoticeFooterElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px #3e4143;

  .notice-text {
    width: 730px;
    padding: 12px 48px;
    font-weight: 700;
    font-size: 19px;
    line-height: 22.8px;
    text-size-adjust: 100%;
    letter-spacing: -0.2px;
    font-family: udemy sans, -apple-system, BlinkMacSystemFont, Roboto, segoe ui, Helvetica, Arial, sans-serif, apple color emoji, segoe ui emoji, segoe ui symbol;
  }

  .notice-logos {
    width: 700px;
    /* height: 68px; */
  }

  img {
    margin: 12px 24px;
  }
`;
