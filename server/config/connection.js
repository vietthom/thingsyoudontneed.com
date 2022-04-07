const mongoose = require('mongoose');

//establish connection to mongodb
mongoose.connect('mongodb://localhost:27017/thingsYouDontNeed', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose.connection;