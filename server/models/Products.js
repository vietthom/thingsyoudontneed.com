const { model, Schema} = require('mongoose');

const productSchema = new Schema({
    productName: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        min: 0.99
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

module.exports = model('Products', productSchema);