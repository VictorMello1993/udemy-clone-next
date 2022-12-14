import React from "react";
import styled from "styled-components";
import { BannerMainContent } from "../components/BannerMainContent";
import { Card, CourseItemCardProps } from "../components/Card";
import { ContactForm } from "../components/ContactForm";

export type MainContentProps = {
  children: React.ReactNode;
  items: any;
};

export function MainContent(props: MainContentProps) {
  const { items } = props;
  const jsonItems = items || null;

  return (
    <MainContentElement>
      <BannerMainContent />
      <CoursesContainer>
        <CourseItem>
          <div className="course-item-wrapper">
            <div className="title-container">
              <div className="title">
                <h2>Recomendado para você</h2>
              </div>
            </div>
            <div className="card-container">
              {jsonItems
                ? jsonItems.map((item: CourseItemCardProps, key: number) => {
                  return (
                    <Card
                      description={item.description}
                      instructorName={item.instructorName}
                      price={item.price}
                      ratingClassification={item.ratingClassification}
                      image={item.image}
                      totalRate={item.totalRate}
                      key={key}
                      link={item.link}
                    />
                  );
                })
                : null}
            </div>
          </div>
        </CourseItem>
      </CoursesContainer>
      <ContactForm />
    </MainContentElement>
  );
}

export const MainContentElement = styled.main`
  margin-bottom: 50px;

  @media (min-width: 530px) {
    width: 100%;
  }
`;

const CoursesContainer = styled.div`
  margin: 48px auto;
  height: 100vh;
`;

const CourseItem = styled.div`
  height: 290px;

  .course-item-wrapper {
    margin: 48px auto;
    width: 85%;
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .title-container {
    margin-bottom: 16px;
  }

  .card-container {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 16px;
  }
`;
