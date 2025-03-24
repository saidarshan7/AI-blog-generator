const mongoose = require('mongoose');

mongoose.connect('MOngoDB_Database Connect')
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
  blogs : String  
})

const User = mongoose.model('User',userSchema);
const Blog = mongoose.model('Blog',blogSchema);

module.exports = {
    User,Blog
}

