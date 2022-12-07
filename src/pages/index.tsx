import React from "react";
import { Layout } from "../layout/Layout";
import type { GetStaticProps } from "next";
import { CourseItemCardProps } from "../components/Card";
import { apolloClient, gql } from "../../src/apolloClient";
import { queryCoursesPage } from "../queries/queryCoursesPage";
import { mapCoursesToCourseItemCard } from "../functions/mapCoursesToCourseItemCard";

export interface HomeProps {
  children: React.ReactNode;
  courses: CourseItemCardProps;
}

export default function Home({ courses, children }: HomeProps) {
  return <Layout items={courses}>{children}</Layout>;
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { data } = await apolloClient.query({
    query: queryCoursesPage,
  });

  const courses = mapCoursesToCourseItemCard(data);

  return {
    props: {
      courses,
      children: [],
    },
  };
};
