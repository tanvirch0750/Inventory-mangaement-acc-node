const Supplier = require('../models/Supplier');

exports.createSupplierService = async (data) => {
  const supplier = await Supplier.create(data);
  return supplier;
};

exports.getSuppliersService = async () => {
  const suppliers = await Supplier.find({});

  const data = {
    foundProducts: suppliers.length,
    suppliers,
  };

  return data;
};

exports.getSupplierByIdService = async (id) => {
  const supplier = await Supplier.findOne({ _id: id });
  return supplier;
};

exports.updateSupplierByIdService = async (id, data) => {
  const supplier = await Supplier.findById(id);
  const result = await supplier.set(data).save();
  return result;
};

exports.deleteSupplierByIdService = async (id) => {
  const result = await Supplier.deleteOne({ _id: id });
  return result;
};
