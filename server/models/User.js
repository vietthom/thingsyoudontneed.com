const { model, Schema } = require('mongoose');

//Creates user schema in mongodb
const userSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String, unique: true},
    password: {type: String, unique: true},
    token: {type: String}
});

module.exports = model('User', userSchema);