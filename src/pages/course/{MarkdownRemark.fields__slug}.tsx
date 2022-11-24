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

import type { GetServerSideProps } from "next";

export type TesteProps = {
  items: string[];
};

export default function Course({ items }: TesteProps) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export const getServerSideProps: GetServerSideProps<TesteProps> = async () => {
  const items = Array.from({ length: 10 }, () => new Date().toLocaleTimeString());

  return {
    props: {
      items,
    },
  };
};
