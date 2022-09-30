const express = require('express');
const {
  getProducts,
  createProduct,
  bulkUpdateProducts,
  updateProductById,
  deleteProductById,
  bulkDeleteProducts,
  fileUpload,
} = require('../controllers/product.controller');
const uploader = require('../middlewares/uploader.middleware');
const router = express.Router();

// uploader.single = single image
// uplader.arry = multiple image
/**
 * client side
 * <input type="file" name="image"/>
 * or -> const formData = new FormData()
 * formData.append("image", formData)
 */
//router.post('/file-upload', uploader.single('image'), fileUpload);
router.post('/file-upload', uploader.array('image'), fileUpload);

router.route('/bulk-update').patch(bulkUpdateProducts);
router.route('/bulk-delete').delete(bulkDeleteProducts);

router.route('/').get(getProducts).post(createProduct);

router.route('/:id').patch(updateProductById).delete(deleteProductById);

module.exports = router;
