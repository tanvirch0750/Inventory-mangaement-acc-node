const express = require('express');
const {
  getStocks,
  createStock,
  getStockById,
  updateStockById,
  deleteStockById,
} = require('../controllers/stock.controller');

// TODO: bulk update and delete

const router = express.Router();

router.route('/').get(getStocks).post(createStock);
router
  .route('/:id')
  .get(getStockById)
  .patch(updateStockById)
  .delete(deleteStockById);

module.exports = router;
