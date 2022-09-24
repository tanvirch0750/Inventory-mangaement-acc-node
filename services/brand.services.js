const Brand = require('../models/Brand');

exports.createBrandService = async (data) => {
  const brand = await Brand.create(data);
  return brand;
};

exports.getBrandService = async () => {
  const brands = await Brand.find({}).select('-products -suppliers');

  const data = {
    foundProducts: brands.length,
    brands,
  };

  return data;
};

exports.getBrandByIdService = async (id) => {
  const brand = await Brand.findOne({ _id: id });
  return brand;
};

exports.updateBrandByIdService = async (id, data) => {
  const brand = await Brand.findById(id);
  const result = await brand.set(data).save();
  return result;
};

exports.deleteBrandByIdService = async (id) => {
  const result = await Brand.deleteOne({ _id: id });
  return result;
};
