const { model, Schema } = require('mongoose');
const Order = require('./Order')

//Creates user schema in mongodb
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String, 
        required: true,
        trim: true
    },
    email: {
        type: String, 
        unique: true,
        require: true,
    },
    password: {
        type: String, 
        unique: true,
        required: true,
        token: {type: String}
    },
    orders: [Order.schema] 
});

module.exports = model('User', userSchema);