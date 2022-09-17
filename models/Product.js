const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product Name is required'],
      trim: true,
      unique: [true, 'This name alreay exist. Name must be unique'],
      minLength: [3, 'Name must be atlest 3 characters'],
      maxLength: [100, 'Name is too large'],
    },
    description: {
      type: String,
      required: [true, 'Product description required'],
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price can not be negetive'],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ['kg', 'litre', 'pcs'],
        message: `Unit value can't be {VALUE}, must be kg/litre/pcs`,
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, 'Quantity can not be negetive'],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: 'Qunatity must be an Integer',
    },
    status: {
      type: String,
      enum: {
        values: ['in-stock', 'out-of-stock', 'discontinued'],
        message: `Status value can't be {VALUE}, must be in-stock/out-of-stock/discontinued`,
      },
    },
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Supplier',
    // },
    // categories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
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
