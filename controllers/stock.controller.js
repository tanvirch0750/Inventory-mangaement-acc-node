const {
  createStockService,
  getStocksService,
  getStockByIdService,
  updateStockByIdService,
  deleteStockByIdService,
} = require('../services/stock.services');

exports.createStock = async (req, res, next) => {
  try {
    const result = await createStockService(req.body);

    res.status(200).json({
      status: 'success',
      message: 'Stock created successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Stock creation failed',
      error: error.message,
    });
  }
};

exports.getStocks = async (req, res, next) => {
  try {
    const filters = { ...req.query };

    // sort, page, limit -> exclude
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((field) => delete filters[field]);

    // fileter with: gt, lt, gte,lte
    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    const newFilters = JSON.parse(filterString);

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
      const { page = 1, limit = 10 } = req.query;
      const skipValue = (parseInt(page) - 1) * parseInt(limit);
      queries.skip = skipValue;
      queries.limit = parseInt(limit);
    }

    const stocks = await getStocksService(newFilters, queries);

    res.status(200).json({
      status: 'success',
      message: 'Data loaded successfully',
      data: stocks,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Data load failed',
      error: error.message,
    });
  }
};

exports.getStockById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const stock = await getStockByIdService(id);

    if (!stock) {
      return res.status(400).json({
        status: 'failed',
        error: 'No stock found with this Id',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Data loaded successfully',
      data: stock,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Data load failed',
      error: error.message,
    });
  }
};

exports.updateStockById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateStockByIdService(id, req.body);

    res.status(200).json({
      status: 'success',
      message: 'Stock update successfull',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Stock upadate failed',
      error: error.message,
    });
  }
};

exports.deleteStockById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteStockByIdService(id);

    // check give id is exist or not
    if (!result.deletedCount) {
      return res.status(400).json({
        status: 'failed',
        error: 'could not delete the stock',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Stock deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Stock delete failed',
      error: error.message,
    });
  }
};
