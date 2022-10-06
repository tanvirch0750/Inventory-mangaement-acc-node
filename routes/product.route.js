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
const authMiddleware = require('../middlewares/auth.middleware');
const uploader = require('../middlewares/uploader.middleware');
const verifyTokenMiddleware = require('../middlewares/verifyToken.middleware');
const router = express.Router();

// if we need verify token in every router
//router.use(verifyTokenMiddleware);

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

router
  .route('/')
  .get(getProducts)
  .post(
    verifyTokenMiddleware,
    authMiddleware('admin', 'store-manager'),
    createProduct
  );

router
  .route('/:id')
  .patch(updateProductById)
  .delete(verifyTokenMiddleware, authMiddleware('admin'), deleteProductById);

module.exports = router;
