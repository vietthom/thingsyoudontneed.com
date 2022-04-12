<<<<<<< HEAD
const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
=======
const { model, Schema } = require('mongoose');

const orderSchema = new Schema({
    purchaseDate: { 
        type:Date, 
        default: Date.now
    },
    products: [
        { 
            type: Schema.Types.ObjectId,
            ref: 'Products'
        }
    ]
});

module.exports = model('Order', orderSchema);
>>>>>>> 54e5c54089c3b5696317f308423ae7461fd9b04a
