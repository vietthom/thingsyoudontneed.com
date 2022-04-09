const { model, Schema } = require('mongoose');

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
        required: true},
        token: {type: String}
});

module.exports = model('User', userSchema);