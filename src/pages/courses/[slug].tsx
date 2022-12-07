import React from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { apolloClient } from "../../../src/apolloClient";
import { CourseItemDetail, CourseItemDetailProps } from "../../components/CourseItemDetail";
import { queryCoursesPageBySlug } from "../../queries/queryCoursesPageBySlug";
import { queryCoursesSlugs } from "../../queries/queryCoursesSlugs";
import { decodeCourse } from "../../decoders/decodeCourse";
import { decodeCourses } from "../../decoders/decodeCourses";

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
  const { data } = await apolloClient.query({
    query: queryCoursesSlugs,
  });

  const { courses } = decodeCourses(data);

  const slugs = courses.map((course) => course.slug);
  const paths = slugs.map((slug) => ({ params: { slug } }));

  console.log("paths", paths);

  return {
    paths,
    fallback: false,
  };
};
