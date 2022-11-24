import Link from "next/link";
import React from "react";
import styled from "styled-components";

export interface CardProps {
  src: string;
  description: string;
  instructorName: string;
  ratingClassification: string;
  totalRate: number;
  price: number;
  link: string;
}

export function Card({ src, description, instructorName, ratingClassification, totalRate, price, link }: CardProps) {
  return (
    <CardElement>
      <Link href={link}>
        <div className="course-image">
          <img src={src} alt="Imagem de curso" />
        </div>
        <div className="course-info">
          <div className="description">
            <h3>{description}</h3>
          </div>
          <div className="instructor">{instructorName}</div>
          <div className="rating">
            <span className="rating-classification">{ratingClassification}</span>
            <span className="rating-star"></span>
            <span className="total-reviews">{totalRate}</span>
          </div>
          <div className="price">R$ {price.toFixed(2)}</div>
        </div>
      </Link>
    </CardElement>
  );
}

const CardElement = styled.div`
  a {
    text-decoration: none;
  }

  a:hover img {
    src: 0.8;
    transition: opacity linear 100ms;
  }

  a,
  a:active {
    text-decoration: none;
    color: #000;
  }

  .course-info div:not(:first-child) {
    margin-top: 3px;
  }

  .rating span {
    display: inline-block;
  }

  .rating span:not(:first-child) {
    margin-left: 15px;
  }

  .instructor {
    font-size: 13px;
  }
`;
