const {
  createStoreService,
  getStoresService,
  getStoreByIdService,
  updateStoreByIdService,
  deleteStoreByIdService,
} = require('../services/store.services');

exports.createStore = async (req, res, next) => {
  try {
    const result = await createStoreService(req.body);

    res.status(200).json({
      status: 'success',
      message: 'Store created successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Store creation failed',
      error: error.message,
    });
  }
};

exports.getStores = async (req, res, next) => {
  try {
    const stores = await getStoresService();

    res.status(200).json({
      status: 'success',
      message: 'Stores loaded successfully',
      data: stores,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Stores load failed',
      error: error.message,
    });
  }
};

exports.getStoreById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const store = await getStoreByIdService(id);

    if (!store) {
      return res.status(400).json({
        status: 'failed',
        error: 'No store found with this Id',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Data loaded successfully',
      data: store,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Data load failed',
      error: error.message,
    });
  }
};

exports.updateStoreById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateStoreByIdService(id, req.body);

    res.status(200).json({
      status: 'success',
      message: 'Store update successfull',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Store upadate failed',
      error: error.message,
    });
  }
};

exports.deleteStoreById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteStoreByIdService(id);

    // check give id is exist or not
    if (!result.deletedCount) {
      return res.status(400).json({
        status: 'failed',
        error: 'could not delete the store',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Store deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Store delete failed',
      error: error.message,
    });
  }
};
