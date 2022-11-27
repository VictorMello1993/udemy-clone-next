import React from "react";
import { Layout } from "../layout/Layout";
import axios from "axios";
import type { GetServerSideProps } from "next";

const token = process.env.TOKEN_STRAPI;

export interface HomeProps {
  children: React.ReactNode;
  courses: Array<any>;
}

export default function Home({ children, courses }: HomeProps) {
  return <Layout items={courses}>{children}</Layout>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axios.get(process.env.ROUTE_STRAPI_COURSES as string, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });

  const courses = await data.data.map(({ attributes }: any) => attributes);

  return {
    props: {
      courses,
    },
  };
};
