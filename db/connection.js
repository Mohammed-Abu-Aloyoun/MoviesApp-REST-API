const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const connect = ()=>{
        return mongoose.connect("mongodb://127.0.0.1:27017/movieSite")
        .then( (result)=>{
                console.log("connect data base");
        } )
        .catch( (error)=>{
                console.log(error);
        } )
};

module.exports = connect;
