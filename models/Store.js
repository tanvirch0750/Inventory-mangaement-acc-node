const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const storeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide a store name'],
      lowercase: true,
      enum: {
        values: [
          'dhaka',
          'chattagram',
          'khulna',
          'barishal',
          'sylhet',
          'rajshahi',
          'rangpur',
          'mymensingh',
        ],
        message: '{VALUE} is not a valid name',
      },
    },
    description: {
      type: String,
      required: [true, 'Brand description required'],
    },
    status: {
      type: String,
      enum: {
        values: ['active', 'inactive'],
        message: `status value can't be {VALUE}, must be active or inactive`,
      },
      default: 'active',
    },
    manager: {
      name: String,
      contactNumber: String,
      id: {
        type: ObjectId,
        ref: 'User',
      },
    },
  },
  { timestamps: true }
);

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
