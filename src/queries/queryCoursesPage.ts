import { gql } from "../apolloClient";

export const queryCoursesPage = gql`
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
`;
