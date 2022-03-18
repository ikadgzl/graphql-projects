export const Category = {
  products: ({ id: categoryId }, { filter }, { db }) => {
    let productsOfCategory = db.products.filter(
      (product) => product.categoryId === categoryId
    );

    if (filter) {
      if (filter.onSale) {
        productsOfCategory = productsOfCategory.filter(
          (product) => product.onSale
        );
      }
    }

    if (!productsOfCategory) return null;

    return productsOfCategory;
  },
};
