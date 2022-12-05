import React from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { apolloClient } from "../../../src/apolloClient";
import { CourseItemDetail, CourseItemDetailProps } from "../../components/CourseItemDetail";
import { queryCoursesPageBySlug } from "../../queries/queryCoursesPageBySlug";
import { queryCoursesSlugs } from "../../queries/queryCoursesSlugs";
import { decodeCourse } from "../../decoders/decodeCourse";

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

  const course = decodeCourse(result.data.courses.data[0]);

  return {
    props: {
      ...course,
    },
  };
};

export const getStaticPaths: GetStaticPaths<CoursePageQuery> = async () => {
  const result = await apolloClient.query({
    query: queryCoursesSlugs,
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
