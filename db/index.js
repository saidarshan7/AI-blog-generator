const dotenv = require('dotenv').config({path: './.env'}) //when i used ../.env  it didn't worked but when i used  cd .. and ./.env it worked why ?

const mongoose = require('mongoose');




mongoose.connect(process.env.MONGO_URI)
.then((d)=>{

console.log("connected")

})
.catch((error)=>{
    console.log(error)
})

const userSchema = new mongoose.Schema({
    username: String,
    password:String
})

const blogSchema = new mongoose.Schema({
    title : String ,
    blogs : String,
    author: { type: Schema.Types.ObjectId, ref: 'User' }  
})

const User = mongoose.model('User',userSchema);
const Blog = mongoose.model('Blog',blogSchema);

module.exports = {
    User,Blog,dotenv
}



// console.log(process.env.MONGO_URI)
// console.log(process.env.API_Key)