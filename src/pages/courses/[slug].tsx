import React from "react";
import type { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { apolloClient, gql } from "../../../src/apolloClient";
import { CourseItemDetail, CourseItemDetailProps } from "../../components/CourseItemDetail";
import { queryCoursesPageBySlug } from "../../queries/queryCoursesPageBySlug";

export type CoursePageProps = CourseItemDetailProps;

export type CoursePageQuery = {
  slug: string;
};

export default function CoursePage(props: CourseItemDetailProps) {
  return <CourseItemDetail {...props} />;
}

export const getStaticProps: GetStaticProps<CourseItemDetailProps, CoursePageQuery> = async ({ params }) => {
  const result = await apolloClient.query({
    query: queryCoursesPageBySlug,
    variables: {
      slug: params?.slug,
    },
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
      image: `https://webservices.jumpingcrab.com${imageUrl}`,
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
