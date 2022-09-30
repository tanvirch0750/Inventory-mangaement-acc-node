const express = require('express');
const {
  getSuppliers,
  createSupplier,
  getSupplierById,
  updateSupplierById,
  deleteSupplierById,
} = require('../controllers/supplier.controller');

const router = express.Router();

router.route('/').get(getSuppliers).post(createSupplier);
router
  .route('/:id')
  .get(getSupplierById)
  .patch(updateSupplierById)
  .delete(deleteSupplierById);

module.exports = router;
