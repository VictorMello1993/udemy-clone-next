import { getImageUrl } from "../apolloClient";
import { CourseItemCardProps } from "../components/Card";

export function mapCoursesToCourseItemCard(data: any): CourseItemCardProps {
  return data.courses.data.map(
    ({
      attributes: {
        image: {
          data: {
            attributes: { url: imageUrl },
          },
        },
        description,
        instructorName,
        ratingClassification,
        totalRate,
        price,
        slug,
      },
    }: any) => ({
      image: getImageUrl(imageUrl),
      description,
      instructorName,
      ratingClassification,
      totalRate,
      price,
      link: `/courses/${slug}`,
    }),
  );
}
