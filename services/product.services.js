const Brand = require('../models/Brand');
const Product = require('../models/Product');

exports.getProductsService = async (filters, queries) => {
  const products = await Product.find(filters)
    .populate('brand.id', 'status location email website -_id')
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const totalProducts = await Product.countDocuments(filters);
  const pageCount = Math.ceil(totalProducts / queries.limit);

  const data = {
    totalProducts,
    pageCount,
    foundProducts: products.length,
    products,
  };

  return data;
};

exports.createProductService = async (data) => {
  const product = await Product.create(data);

  // poppulate brand
  const updatedBrand = await Brand.updateOne(
    { name: product.brand.name },
    {
      $push: {
        products: product._id,
      },
    }
  );
  return product;
};

exports.updateProductByIdService = async (id, data) => {
  const product = await Product.findById(id);
  const result = await product.set(data).save();
  return result;
};

exports.bulkUpdateProductService = async (data) => {
  const products = [];
  data.ids.forEach((product) =>
    products.push(Product.updateOne({ _id: product.id }, product.data))
  );
  const result = await Promise.all(products);
  return result;
};

exports.deleteProductByIdService = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

exports.bulkDeleteProductService = async (ids) => {
  const result = await Product.deleteMany({ _id: ids });
  return result;
};
