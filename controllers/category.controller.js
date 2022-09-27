const {
  createCategoryService,
  getCategoryService,
  getCategoryByIdService,
  updateCategoryByIdService,
  deleteCategoryByIdService,
} = require('../services/category.services');

exports.createCategory = async (req, res, next) => {
  try {
    const result = await createCategoryService(req.body);

    res.status(200).json({
      status: 'success',
      message: 'Category created successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Category creation failed',
      error: error.message,
    });
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const category = await getCategoryService();

    res.status(200).json({
      status: 'success',
      message: 'Categories loaded successfully',
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Categories load failed load failed',
      error: error.message,
    });
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await getCategoryByIdService(id);

    if (!category) {
      return res.status(400).json({
        status: 'failed',
        error: 'No category found with this Id',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Data loaded successfully',
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Data load failed',
      error: error.message,
    });
  }
};

exports.updateCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateCategoryByIdService(id, req.body);

    res.status(200).json({
      status: 'success',
      message: 'Category update successfull',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Category upadate failed',
      error: error.message,
    });
  }
};

exports.deleteCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteCategoryByIdService(id);

    // check give id is exist or not
    if (!result.deletedCount) {
      return res.status(400).json({
        status: 'failed',
        error: 'could not delete the Category',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Category deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Category delete failed',
      error: error.message,
    });
  }
};
