const {
  createSupplierService,
  getSuppliersService,
  getSupplierByIdService,
  updateSupplierByIdService,
  deleteSupplierByIdService,
} = require('../services/supplier.services');

exports.createSupplier = async (req, res, next) => {
  try {
    const result = await createSupplierService(req.body);

    res.status(200).json({
      status: 'success',
      message: 'Supplier added successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Supplier added failed',
      error: error.message,
    });
  }
};

exports.getSuppliers = async (req, res, next) => {
  try {
    const suppliers = await getSuppliersService();

    res.status(200).json({
      status: 'success',
      message: 'Data loaded successfully',
      data: suppliers,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Data load failed',
      error: error.message,
    });
  }
};

exports.getSupplierById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const supplier = await getSupplierByIdService(id);

    if (!supplier) {
      return res.status(400).json({
        status: 'failed',
        error: 'No supplier found with this Id',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Data loaded successfully',
      data: supplier,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Data load failed',
      error: error.message,
    });
  }
};

exports.updateSupplierById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateSupplierByIdService(id, req.body);

    res.status(200).json({
      status: 'success',
      message: 'Supplier update successfull',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Supplier upadate failed',
      error: error.message,
    });
  }
};

exports.deleteSupplierById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteSupplierByIdService(id);

    // check give id is exist or not
    if (!result.deletedCount) {
      return res.status(400).json({
        status: 'failed',
        error: 'could not delete the supplier',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Supplier deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Supplier delete failed',
      error: error.message,
    });
  }
};
