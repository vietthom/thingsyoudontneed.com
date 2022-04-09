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