export const Product = {
  category: ({ categoryId }, args, { categories }) => {
    const category = categories.find((category) => category.id === categoryId);

    if (!category) return null;

    return category;
  },

  review: ({ id }, args, { reviews }) => {
    const reviewOfProducts = reviews.filter(
      (review) => id === review.productId
    );

    if (!reviewOfProducts) return null;

    return reviewOfProducts;
  },
};
