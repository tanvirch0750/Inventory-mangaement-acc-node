const express = require('express');
const {
  createCategory,
  getCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} = require('../controllers/category.controller');
const router = express.Router();

router.route('/').get(getCategory).post(createCategory);
router
  .route('/:id')
  .get(getCategoryById)
  .patch(updateCategoryById)
  .delete(deleteCategoryById);

module.exports = router;
