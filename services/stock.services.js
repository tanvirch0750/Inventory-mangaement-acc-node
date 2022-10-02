const Stock = require('../models/Stock');

exports.createStockService = async (data) => {
  const stock = await Stock.create(data);
  return stock;
};

exports.getStocksService = async (filters, queries) => {
  const stocks = await Stock.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const totalStocks = await Stock.countDocuments(filters);
  const pageCount = Math.ceil(totalStocks / queries.limit);

  const data = {
    totalStocks,
    pageCount,
    foundStocks: stocks.length,
    stocks,
  };

  return data;
};

exports.getStockByIdService = async (id) => {
  const stock = await Stock.findOne({ _id: id });
  return stock;
};

exports.updateStockByIdService = async (id, data) => {
  const stock = await Stock.findById(id);
  const result = await stock.set(data).save();
  return result;
};

exports.deleteStockByIdService = async (id) => {
  const result = await Stock.deleteOne({ _id: id });
  return result;
};
