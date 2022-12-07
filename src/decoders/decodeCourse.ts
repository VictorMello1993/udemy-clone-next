import { getImageUrl } from "../apolloClient";

export type CourseData = {
  description: string;
  publishedAt: string;
  ratingClassification: string;
  instructorName: string;
  price: Number;
  totalRate: Number;
  image: string;
  slug: string;
};

export function decodeCourse(data: any): CourseData {
  const baseData = data ? data.courses ?? data : undefined;
  const {
    attributes: { description = "", publishedAt = "", ratingClassification = "", instructorName = "", price = 0, totalRate = 0, image = "", slug = "" },
  } = data ?? { attributes: {} };

  const imageUrl = baseData && baseData.attributes.image ? getImageUrl(baseData.attributes.image.data.attributes.url) : "empty.jpg";

  return {
    description,
    publishedAt,
    ratingClassification,
    instructorName,
    price,
    totalRate,
    image: imageUrl,
    slug,
  };
}
