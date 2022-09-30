const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const supplierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide a brand name'],
      minLength: [3, 'Name must be atleast three characters'],
      maxLength: [100, 'Name is too large'],
      unique: true,
      lowercase: true,
    },

    email: {
      type: String,
      validate: [validator.isEmail, 'Please provide valid email'],
      trim: true,
      lowercase: true,
      unique: true,
    },
    brand: {
      name: {
        type: String,
        required: true,
        lowercase: true,
      },
      id: {
        type: ObjectId,
        ref: 'Brand',
        required: true,
      },
    },
    contactNumber: [
      {
        type: String,
        required: [true, 'Please provide a contact number'],
        validator: {
          validator: (value) => {
            return validator.isMobilePhone(value);
          },
          message: 'Please provide a valid phone number',
        },
      },
    ],
    emergencyContactNumber: {
      type: String,
      required: [true, 'Please provide a contact number'],
      validator: {
        validator: (value) => {
          return validator.isMobilePhone(value);
        },
        message: 'Please provide a valid phone number',
      },
    },
    tradeLincenseNumber: {
      type: Number,
      required: [true, 'Please proveide your valid trade license number'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Please proveide your present address'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Please proveide your permanent address'],
    },
    location: {
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
    imageURL: {
      type: String,
      validate: [validator.isURL, 'Please provide a valid url'],
    },
    nationalIdImageURL: {
      type: String,
      required: true,
      validate: [validator.isURL, 'Please provide a valid url'],
    },
    status: {
      type: String,
      enum: {
        values: ['active', 'inactive'],
        message: `status value can't be {VALUE}, must be active or inactive`,
      },
      default: 'active',
    },
  },
  { timestamps: true }
);

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
