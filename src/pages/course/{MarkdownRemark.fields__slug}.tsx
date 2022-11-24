// import { AppProps } from "next/app";
// import React from "react";
// import { CourseItemDetailContent } from "../../layout/CourseItemDetailContent";
// import { Footer } from "../../layout/Footer";
// import { Header } from "../../layout/Header";

// export default function Post({ Component, pageProps }: AppProps) {
//   const { frontmatter } = (data as any).markdownRemark;

//   return (
//     <div className="layout">
//       <Header />
//       <CourseItemDetailContent data={frontmatter} />
//       <Footer />
//     </div>
//   );
// }

// export const pageQuery = graphql`
//   query GetPostBySlug($id: String!) {
//     markdownRemark(id: { eq: $id }) {
//       fields {
//         slug
//       }
//       frontmatter {
//         author
//         title
//         date
//         description
//         instructorName
//         price
//         ratingClassification
//         totalRate
//         image {
//           childImageSharp {
//             gatsbyImageData(width: 480, height: 270, layout: CONSTRAINED, formats: [WEBP, JPG], quality: 70)
//           }
//         }
//       }
//     }
//   }
// `;
