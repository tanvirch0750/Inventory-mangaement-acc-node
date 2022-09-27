const Category = require('../models/Category');

exports.createCategoryService = async (data) => {
  const category = await Category.create(data);
  return category;
};

exports.getCategoryService = async () => {
  const categories = await Category.find({});

  const data = {
    foundCategories: categories.length,
    categories,
  };

  return data;
};

exports.getCategoryByIdService = async (id) => {
  const category = await Category.findOne({ _id: id });
  return category;
};

exports.updateCategoryByIdService = async (id, data) => {
  const category = await Category.findById(id);
  const result = await category.set(data).save();
  return result;
};

exports.deleteCategoryByIdService = async (id) => {
  const result = await Category.deleteOne({ _id: id });
  return result;
};
