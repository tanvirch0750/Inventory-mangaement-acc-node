const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const stockSchema = mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: 'Product',
    },
    name: {
      type: String,
      required: [true, 'Product Name is required'],
      trim: true,
      unique: [true, 'This name alreay exist. Name must be unique'],
      minLength: [3, 'Name must be atlest 3 characters'],
      maxLength: [100, 'Name is too large'],
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Product description required'],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ['kg', 'litre', 'pcs', 'bag'],
        message: `Unit value can't be {VALUE}, must be kg/litre/pcs/bag`,
      },
    },
    imageUrls: [
      {
        type: String,
        required: true,
        validate: {
          validator: (value) => {
            if (!Array.isArray(value)) {
              return false;
            }
            let isValid = true;
            value.forEach((url) => {
              if (!validator.isURL(url)) {
                isValid = false;
              }
            });
            return isValid;
          },
          message: 'Please provide valid image urls',
        },
      },
    ],
    price: {
      type: Number,
      required: true,
      min: [0, 'Product Price cannot be negetive'],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, 'Product quantity cannot be negetive'],
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: 'Brand',
        required: true,
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ['in-stock, out-of-stock', 'discontinued'],
        message:
          'status cannot be {VALUE} must be in-stock/out-of-stock/discontinued',
      },
    },
    store: {
      name: {
        type: String,
        trim: true,
        required: [true, 'Please provide a store name'],
        lowercase: true,
        enum: {
          values: [
            'Dhaka',
            'Chattagram',
            'Khulna',
            'Barishal',
            'Sylhet',
            'Rajshahi',
            'Rangpur',
            'Mymensingh',
          ],
          message: '{VALUE} is not a valid name',
        },
      },
      id: {
        type: ObjectId,
        required: true,
        ref: 'Store',
      },
    },
    suppliedBy: {
      name: {
        type: String,
        trim: true,
        required: [true, 'Please provide a supplier name'],
      },
      id: {
        type: ObjectId,
        ref: 'Supplier',
      },
    },
  },
  { timestamps: true }
);

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
