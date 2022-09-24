const {
  createBrandService,
  getBrandService,
  getBrandByIdService,
  updateBrandByIdService,
  deleteBrandByIdService,
} = require('../services/brand.services');

exports.createBrand = async (req, res, next) => {
  try {
    const result = await createBrandService(req.body);

    res.status(200).json({
      status: 'success',
      message: 'Brand inserted successfull',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Brand inserted failed',
      error: error.message,
    });
  }
};

exports.getBrands = async (req, res, next) => {
  try {
    const brands = await getBrandService();

    res.status(200).json({
      status: 'success',
      message: 'Data loaded successfully',
      data: brands,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Data load failed',
      error: error.message,
    });
  }
};

exports.getBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await getBrandByIdService(id);

    if (!brand) {
      return res.status(400).json({
        status: 'failed',
        error: 'No brand found with this Id',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Data loaded successfully',
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Data load failed',
      error: error.message,
    });
  }
};

exports.updateBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateBrandByIdService(id, req.body);

    res.status(200).json({
      status: 'success',
      message: 'Brand update successfull',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Brand upadate failed',
      error: error.message,
    });
  }
};

exports.deleteBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteBrandByIdService(id);

    // check give id is exist or not
    if (!result.deletedCount) {
      return res.status(400).json({
        status: 'failed',
        error: 'could not delete the product',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Brand deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Brand delete failed',
      error: error.message,
    });
  }
};
