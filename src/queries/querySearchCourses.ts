import { gql } from "../apolloClient";

export const querySearchCourses = gql`
  query SearchCourses($searchInput: String!) {
    courses(filters: { or: [{ description: { containsi: $searchInput } }] }, sort: ["updatedAt"]) {
      data {
        attributes {
          description
          slug
        }
      }
    }
  }
`;
