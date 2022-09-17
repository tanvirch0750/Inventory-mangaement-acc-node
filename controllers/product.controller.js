const Product = require('../models/Product');
const {
  getProductsService,
  createProductService,
  updateProductService,
} = require('../services/product.services');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await getProductsService();

    res.status(200).json({
      status: 'success',
      message: 'Data loaded successfully',
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Data load failed',
      error: error.message,
    });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const result = await createProductService(req.body);

    // instance method call
    result.logger();

    res.status(200).json({
      status: 'success',
      message: 'Product inserted successfull',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Product inserted failed',
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductService(id, req.body);

    res.status(200).json({
      status: 'success',
      message: 'Product update successfull',
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Product upadate failed',
      error: error.message,
    });
  }
};
