const Product = require('../models/Product');

exports.getProductsService = async (filters, queries) => {
  // const products = await Product.where('name')
  //   .equals(/\w/)
  //   .where('quantity')
  //   .gt(100)
  //   .lt(600)
  //   .limit(2)
  //   .sort({ quantity: -1 });
  //const product = await Product.findById('631c9f5b15301760d43a7e99');

  const products = await Product.find(filters)
    .select(queries.fields)
    .sort(queries.sortBy);

  const data = {
    length: products.length,
    products,
  };

  return data;
};

exports.createProductService = async (data) => {
  // save or create
  //save
  // const product = new Product(req.body);
  // if (product.quantity === 0) {
  //   product.status = 'out-of-stock';
  // }
  // const result = await product.save();

  // create
  const product = await Product.create(data);
  return product;
};

exports.updateProductByIdService = async (id, data) => {
  // 1st METHOD
  const product = await Product.findById(id);
  const result = await product.set(data).save();
  return result;

  // 2nd METHOD
  // updateOne- 1st parameter is what to update 2nd parameter is updated data, third is validator
  // const upadatedProduct = await Product.updateOne(
  //   { _id: id },
  //   { $set: data },
  //   { runValidators: true }
  // );

  // update Single Property - price will increment by 3
  // const upadatedProduct = await Product.updateOne(
  //   { _id: id },
  //   { $inc: data },
  //   { runValidators: true }
  // );
};

exports.bulkUpdateProductService = async (data) => {
  // const result = await Product.updateMany({ _id: data.ids }, data.data, {
  //   runValidators: true,
  // });
  // return result;

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
