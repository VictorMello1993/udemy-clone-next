import { gql } from "../apolloClient";

export const queryCoursesPageBySlug = gql`
  query CoursesBySlug($slug: String!) {
    courses(filters: { slug: { eq: $slug } }) {
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
`;
