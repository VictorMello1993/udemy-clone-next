import React from "react";
import type { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { apolloClient, gql } from "../../../src/apolloClient";
import { CourseItemDetail, CourseItemDetailProps } from "../../components/CourseItemDetail";

export type CoursePageProps = CourseItemDetailProps;

export type CoursePageQuery = {
  slug: string;
};

export default function CoursePage(props: CourseItemDetailProps) {
  return <CourseItemDetail {...props} />;
}

export const getStaticProps: GetStaticProps<CourseItemDetailProps, CoursePageQuery> = async ({ params }) => {
  const result = await apolloClient.query({
    query: gql`
      query {
        courses(filters: { 
          slug: { 
            eq: "${params?.slug ?? ``}"
          } 
          }) {
          data {
            attributes {
              title
              price
              image {
                data {
                  attributes {
                    url
                  }
                }
              }
              ratingClassification
              instructorName
              totalRate
              publishDate
              slug
            }
          }
        }
      }
    `,
  });

  console.log("result", result);

  const {
    data: {
      attributes: {
        title,
        publishDate,
        ratingClassification,
        instructorName,
        price,
        totalRate,
        image: {
          data: {
            attributes: { url: imageUrl },
          },
        },
      },
    },
  } = result.data.courses;

  return {
    props: {
      image: `${process.env.URI_STRAPI}${imageUrl}`,
      publishDate,
      title,
      ratingClassification,
      instructorName,
      price,
      totalRate,
    },
  };
};

export const getStaticPaths: GetStaticPaths<CoursePageQuery> = async () => {
  const result = await apolloClient.query({
    query: gql`
      query {
        courses {
          data {
            attributes {
              slug
            }
          }
        }
      }
    `,
  });

  const {
    data: {
      courses: { data: coursesSlugs },
    },
  } = result;

  const slugs: string[] = coursesSlugs.map(({ attributes: { slug } }: any) => slug);

  console.log("slugs", slugs);

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};
