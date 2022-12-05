export function decodeCourse(data: any) {
  const {
    attributes: {
      description,
      publishedAt,
      ratingClassification,
      instructorName,
      price,
      totalRate,
      image: {
        data: {
          attributes: { url: imageUrl },
        },
      },
    },
  } = data;

  return {
    description,
    publishedAt,
    ratingClassification,
    instructorName,
    price,
    totalRate,
    image: `https://webservices.jumpingcrab.com${imageUrl}`,
  };
}
