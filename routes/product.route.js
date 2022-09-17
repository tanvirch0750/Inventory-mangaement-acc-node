const express = require('express');
const {
  getProducts,
  createProduct,
  updateProduct,
} = require('../controllers/product.controller');
const router = express.Router();

router.route('/').get(getProducts).post(createProduct);
router.route('/:id').patch(updateProduct);

module.exports = router;
