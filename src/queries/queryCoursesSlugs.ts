import { gql } from "../apolloClient";

export const queryCoursesSlugs = gql`
  query {
    courses {
      data {
        attributes {
          slug
        }
      }
    }
  }
`;
