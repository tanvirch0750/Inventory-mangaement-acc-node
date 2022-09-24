const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide a brand name'],
      maxLength: 100,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Brand description required'],
    },
    email: {
      type: String,
      validate: [validator.isEmail, 'Please provide valid email'],
      lowercase: true,
    },
    website: {
      type: String,
      validate: [validator.isURL, 'Please provide valid URL'],
    },
    status: {
      type: String,
      enum: {
        values: ['active', 'inactive'],
        message: `status value can't be {VALUE}, must be active or inactive`,
      },
      default: 'active',
    },
    location: String,
    products: [
      {
        type: ObjectId,
        ref: 'Product',
      },
    ],
    suppliers: [
      {
        name: String,
        contactNumber: String,
        id: {
          type: ObjectId,
          ref: 'Supplier',
        },
      },
    ],
  },
  { timestamps: true }
);

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
