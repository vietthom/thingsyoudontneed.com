<<<<<<< HEAD
const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;11
=======
const {model,Schema}= require('mongoose');

const categorySchema = new Schema({
    name: {
        type: String,
        requried: true,
        trim: true
    }
});

module.exports = model('Category', categorySchema);
>>>>>>> 54e5c54089c3b5696317f308423ae7461fd9b04a
