import React from "react";
import { Layout } from "../layout/Layout";
import axios from "axios";
import type { GetServerSideProps, GetStaticProps } from "next";
import { CourseItemCardProps } from "../components/Card";
import { apolloClient, gql } from "../../src/apolloClient";

export interface HomeProps {
  children: React.ReactNode;
  courses: CourseItemCardProps;
}

export default function Home({ courses, children }: HomeProps) {
  return <Layout items={courses}>{children}</Layout>;
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const { data } = await axios.get(process.env.ROUTE_STRAPI_COURSES as string);

//   const courses = await data.data.map(({ attributes }: any) => attributes);

//   return {
//     props: {
//       courses,
//     },
//   };
// };

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const result = await apolloClient.query({
    query: gql`
      query {
        courses {
          data {
            attributes {
              description
              instructorName
              price
              image {
                data {
                  attributes {
                    url
                  }
                }
              }
              ratingClassification
              totalRate
              createdAt
              updatedAt
              publishedAt
              slug
            }
          }
        }
      }
    `,
  });

  const courses: CourseItemCardProps = result.data.courses.data.map(
    ({
      attributes: {
        image: {
          data: {
            attributes: { url: image },
          },
        },
        description,
        instructorName,
        ratingClassification,
        totalRate,
        price,
        slug,
      },
    }: any) => ({
      image: `https://webservices.jumpingcrab.com${image}`,
      description,
      instructorName,
      ratingClassification,
      totalRate,
      price,
      link: `/courses/${slug}`,
    }),
  );

  return {
    props: {
      courses,
      children: [],
    },
  };
};
