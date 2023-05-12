const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
        img : String,
        title : String,
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user"
        }
});

const movieModel = mongoose.model('movie',movieSchema);

module.exports = movieModel;
