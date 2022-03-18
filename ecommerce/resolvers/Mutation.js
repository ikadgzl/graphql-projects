import { v4 as uuid } from 'uuid';

export const Mutation = {
  addCategory: (parent, { input: { name } }, { db }) => {
    const newCategory = {
      id: uuid(),
      name,
    };

    db.categories.push(newCategory);

    return newCategory;
  },

  addProduct: (
    parent,
    {
      input: { name, description, quantity, price, image, onSale, categoryId },
    },
    { db }
  ) => {
    const newProduct = {
      id: uuid(),
      name,
      description,
      quantity,
      price,
      image,
      onSale,
      categoryId,
    };

    db.products.push(newProduct);

    return newProduct;
  },

  addReview: (
    parent,
    { input: { title, comment, rating, date, productId } },
    { db }
  ) => {
    const newReview = {
      id: uuid(),
      title,
      comment,
      rating,
      date,
      productId,
    };

    db.reviews.push(newReview);

    return newReview;
  },

  deleteCategory: (parent, { id }, { db }) => {
    db.categories = db.categories.filter((category) => category.id !== id);
    db.products = db.products.map((product) => {
      if (product.categoryId === id) {
        product.categoryId = null;
      }

      return product;
    });

    return true;
  },

  deleteProduct: (parent, { id }, { db }) => {
    db.products = db.products.filter((products) => products.id !== id);
    db.reviews = db.reviews.filter((review) => review.productId !== id);

    return true;
  },

  deleteReview: (parent, { id }, { db }) => {
    db.reviews = db.reviews.filter((review) => review.id !== id);

    return true;
  },

  updateCategory: (parent, { id, input }, { db }) => {
    const index = db.categories.findIndex((category) => category.id === id);

    db.categories[index] = {
      ...db.categories[index],
      ...input,
    };

    return db.categories[index];
  },

  updateProduct: (parent, { id, input }, { db }) => {
    const index = db.products.findIndex((product) => product.id === id);

    db.products[index] = {
      ...db.products[index],
      ...input,
    };

    return db.products[index];
  },

  updateReview: (parent, { id, input }, { db }) => {
    const index = db.reviews.findIndex((review) => review.id === id);

    db.reviews[index] = {
      ...db.reviews[index],
      ...input,
    };

    return db.reviews[index];
  },
};
