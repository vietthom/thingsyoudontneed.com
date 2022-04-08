const { model, Schema} = require('mongoose');

const productSchema = new Schema({
    productName: {type: String},
    description: {type: String},
    price: {type: Number},
    quantity: {type: Number}
});

module.exports = model('Products', productSchema);