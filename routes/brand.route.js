const express = require('express');
const {
  createBrand,
  getBrands,
  getBrandById,
  updateBrandById,
  deleteBrandById,
} = require('../controllers/brand.controller');
const router = express.Router();

router.route('/').get(getBrands).post(createBrand);
router
  .route('/:id')
  .get(getBrandById)
  .patch(updateBrandById)
  .delete(deleteBrandById);

module.exports = router;
