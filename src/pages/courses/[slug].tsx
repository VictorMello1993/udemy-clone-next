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
                description
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
                publishedAt
                slug
            }
          }
        }
      }
    `,
  });

  const {
    attributes: {
      description,
      publishedAt,
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
  } = result.data.courses.data[0];

  return {
    props: {
      image: `${process.env.URI_STRAPI}${imageUrl}`,
      publishedAt,
      description,
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

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};
