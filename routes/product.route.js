const express = require('express');
const {
  getProducts,
  createProduct,
  bulkUpdateProducts,
  updateProductById,
  deleteProductById,
  bulkDeleteProducts,
} = require('../controllers/product.controller');
const router = express.Router();

router.route('/bulk-update').patch(bulkUpdateProducts);
router.route('/bulk-delete').delete(bulkDeleteProducts);

router.route('/').get(getProducts).post(createProduct);

router.route('/:id').patch(updateProductById).delete(deleteProductById);

module.exports = router;
