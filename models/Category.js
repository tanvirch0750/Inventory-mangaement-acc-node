const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide a category name'],
      maxLength: 100,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Category description required'],
    },
    imageUrl: {
      type: String,
      validate: [validator.isURL, 'Please provide valid URL'],
    },
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
