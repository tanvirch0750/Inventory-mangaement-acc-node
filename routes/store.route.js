const express = require('express');
const {
  getStores,
  createStore,
  getStoreById,
  updateStoreById,
  deleteStoreById,
} = require('../controllers/store.controller');

const router = express.Router();

router.route('/').get(getStores).post(createStore);
router
  .route('/:id')
  .get(getStoreById)
  .patch(updateStoreById)
  .delete(deleteStoreById);

module.exports = router;
