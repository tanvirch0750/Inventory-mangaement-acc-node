const Product = require('../models/Product');
const {
  getProductsService,
  createProductService,
  bulkUpdateProductService,
  updateProductByIdService,
  deleteProductByIdService,
  bulkDeleteProductService,
} = require('../services/product.services');

exports.getProducts = async (req, res, next) => {
  try {
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    const filters = { ...req.query };
    excludeFields.forEach((field) => delete filters[field]);

    const queries = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      queries.sortBy = sortBy;
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      queries.fields = fields;
    }

    if (req.query.page) {
      const { page = 1, limit = 5 } = req.query;
      const skipValue = (parseInt(page) - 1) * parseInt(limit);
      queries.skip = skipValue;
      queries.limit = parseInt(limit);
    }

    // fileter with: gt, lt, gte,lte
    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    const newFilters = JSON.parse(filterString);

    const products = await getProductsService(newFilters, queries);

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

exports.updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductByIdService(id, req.body);

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

exports.bulkUpdateProducts = async (req, res, next) => {
  try {
    const result = await bulkUpdateProductService(req.body);
    res.status(200).json({
      status: 'success',
      message: 'Product bulk update successfull',
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Products bulk upadate failed',
      error: error.message,
    });
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteProductByIdService(id);

    // check give id is exist or not
    if (!result.deletedCount) {
      return res.status(400).json({
        status: 'failed',
        error: 'could not delete the product',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Product delete failed',
      error: error.message,
    });
  }
};

exports.bulkDeleteProducts = async (req, res, next) => {
  try {
    const result = await bulkDeleteProductService(req.body.ids);
    res.status(200).json({
      status: 'success',
      message: 'Product bulk delete successfull',
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Products bulk delete failed',
      error: error.message,
    });
  }
};

exports.fileUpload = async (req, res) => {
  try {
    //res.status(200).json(req.file);
    res.status(200).json(req.files); // for multiple files
  } catch (error) {}
};
