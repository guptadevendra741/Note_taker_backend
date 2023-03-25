const mongoose = require('mongoose');
mongoose.set("strictQuery",false)
const db=()=>{
    mongoose.connect("mongodb+srv://guptadevendra7432:hxkASEIazMWXvIBJ@cluster0.iewvz0j.mongodb.net/?retryWrites=true&w=majority").then(()=>{
        console.log("database connected!!");
    });
}

module.exports = db;




