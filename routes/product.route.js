const express = require('express');
const {
  getProducts,
  createProduct,
  updateProduct,
  bulkUpdateProducts,
} = require('../controllers/product.controller');
const router = express.Router();

router.route('/').get(getProducts).post(createProduct);
router.route('/bulk-update').patch(bulkUpdateProducts);
router.route('/:id').patch(updateProduct);

module.exports = router;
