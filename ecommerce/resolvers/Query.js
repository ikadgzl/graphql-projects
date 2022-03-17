export const Query = {
  products: (parent, { filter }, { products, reviews }) => {
    let filteredProducts = products;

    if (filter) {
      if (filter.onSale) {
        filteredProducts = products.filter((product) => product.onSale);
      }

      if (filter.avgRating > 0 && filter.avgRating < 6) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0;
          let numOfReviews = 0;

          reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              numOfReviews++;
            }
          });

          const avgProductRating = sumRating / numOfReviews;

          return avgProductRating >= filter.avgRating;
        });
      }
    }

    return filteredProducts;
  },
  product: (parent, { id: productId }, { products }) => {
    const product = products.find((product) => product.id === productId);

    if (!product) return null;

    return product;
  },
  categories: (parent, args, { categories }) => categories,
  category: (parent, { id: categoryId }, { categories }) => {
    const category = categories.find((category) => category.id === categoryId);

    if (!category) return null;

    return category;
  },
};
