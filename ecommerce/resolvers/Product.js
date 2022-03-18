export const Product = {
  category: ({ categoryId }, args, { db }) => {
    const category = db.categories.find(
      (category) => category.id === categoryId
    );

    if (!category) return null;

    return category;
  },

  review: ({ id }, args, { db }) => {
    const reviewOfProducts = db.reviews.filter(
      (review) => id === review.productId
    );

    if (!reviewOfProducts) return null;

    return reviewOfProducts;
  },
};
