const {model,Schema}= require('mongoose');

const categorySchema = new Schema({
    name: {
        type: String,
        requried: true,
        trim: true
    }
});

module.exports = model('Category', categorySchema);
