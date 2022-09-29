const Store = require('../models/Store');

exports.createStoreService = async (data) => {
  const store = await Store.create(data);
  return store;
};

exports.getStoresService = async () => {
  const stores = await Store.find({});

  const data = {
    foundStores: stores.length,
    stores,
  };

  return data;
};

exports.getStoreByIdService = async (id) => {
  const store = await Store.findOne({ _id: id });
  return store;
};

exports.updateStoreByIdService = async (id, data) => {
  const store = await Store.findById(id);
  const result = await store.set(data).save();
  return result;
};

exports.deleteStoreByIdService = async (id) => {
  const result = await Store.deleteOne({ _id: id });
  return result;
};
