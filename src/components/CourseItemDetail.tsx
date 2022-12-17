import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import styled from "styled-components";

export type CourseItemDetailProps = {
  description: string;
  instructorName: string;
  publishedAt: string;
  ratingClassification: string;
  totalRate: Number;
  price: Number;
  image: string;
};

export function CourseItemDetail({ description, publishedAt, instructorName, ratingClassification, totalRate, price, image }: CourseItemDetailProps) {
  return (
    <CourseItemDetailTopContainer>
      <div className="course-detail">
        <div className="course-detail image">{image && <img alt="" src={image} />}</div>
        <div className="course-detail text">
          <div className="course-detail title">
            <h2>{description}</h2>
          </div>
          <div className="course-detail description">{description}</div>
          <div className="course-detail info">
            <div className="rating">{ratingClassification}</div>
            <div className="rating-count">{Number(totalRate)}</div>
            <div className="students-subscribed">22934</div>
          </div>
          <div className="course-detail created-by">{instructorName}</div>
          <div className="course-detail last-info">
            <div className="course-detail last-update">
              <time dateTime={new Date(publishedAt).toJSON()}>{new Date(publishedAt).toLocaleDateString("pt-br")}</time>
            </div>
            <div className="course-detail language">Português</div>
          </div>
          <div className="course-detail price">R$ {Number(price).toFixed(2)}</div>
        </div>
      </div>
      <div className="purchase-button">
        <div className="purchase-icon">
          <MdOutlineShoppingCart size="25px" color="#fff" />
        </div>
        <div className="purchase-link">
          <a href="/">Comprar</a>
        </div>
      </div>
    </CourseItemDetailTopContainer>
  );
}

const CourseItemDetailTopContainer = styled.div`
  background-color: #1c1d1f;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .course-detail img {
    max-width: 100%;
  }

  .course-detail:not(:first-child) {
    margin-top: 15px;
  }

  .course-detail .text {
    color: #fff;
    margin-top: 15px;
  }

  .course-detail .info {
    display: flex;
    gap: 10px;
  }

  .course-detail .info,
  .course-detail .created-by,
  .course-detail .last-info,
  .course-detail .price {
    font-weight: 500;
  }

  .course-detail .image img {
    width: 480px;
  }

  .purchase-button {
    background-color: #a435f0;
    padding: 12px 12px;
    text-align: center;
    cursor: pointer;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .purchase-icon {
    margin-right: 15px;
  }

  .purchase-button:hover {
    background-color: #8315cd;
  }

  .course-detail .price {
    font-size: 30px;
  }

  .purchase-button a {
    color: #fff;
    text-decoration: none;
    font-weight: 700;
  }

  @media (min-width: 600px) {
    .course-detail {
      width: 75%;
    }
  }

  @media (max-width: 600px) {
    .course-detail .trial-free-button {
      margin-top: 15vh;
    }
    .course-detail {
      width: 100%;
    }
  }
`;
