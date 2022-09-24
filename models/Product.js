const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const productSchema = mongoose.Schema(
  {
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
      enum: {
        values: ['kg', 'litre', 'pcs', 'bag'],
        message: `Unit value can't be {VALUE}, must be kg/litre/pcs/bag`,
      },
      default: 'active',
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
  },
  {
    timestamps: true,
  }
);

// mongoose middlewares for saving data: pre / post
productSchema.pre('save', function (next) {
  if (this.quantity === 0) {
    this.status = 'out-of-stock';
  }
  next();
});
// productSchema.post('save', function (doc, next) {
//   console.log('After saving data');
//   next();
// });

// instance
productSchema.methods.logger = function () {
  console.log(`Data saved for ${this.name}`);
};

// Model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
