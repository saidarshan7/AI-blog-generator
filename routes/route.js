// const dotenv = require('dotenv').config({path: '../.env'})
const {Router} = require('express');
const route = Router();
const {User,Blog} =  require('../db/index')
const {checkUser,verifyToken} = require('../middleware/user')
const jwt = require('jsonwebtoken')
const JWT_key= "my_secret_key";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_Key);





route.post('/signup',checkUser, async(req,res)=>{
const username = req.body.username;
const password= req.body.password;

const response= await User.create({
    username,
    password
})

res.status(200).json({
    msg: "registered Succsessfull!!"
})


})

route.post('/signin',checkUser, async(req,res)=>{
   const username = req.body.username;
   const password = req.body.password;


   const exist = User.findOne({
username : username,
password: password
    })

    console.log(exist)

    if(exist){
const token = jwt.sign(username,JWT_key)
     res.json({
        msg: token
        // userId:
     })
    } else {
        res.status(403).json({
            msg: "Your not Signed in "
        })
        
    }

})


route.get('/blog',verifyToken,async (req,res)=>{
   // const input = req.body.input;



   const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const topic = {
    audience: "adults", // e.g., adults, aged people, teens
    tone: "informative", // e.g., funny, informative, seriousness
    description: "a detailed guide to planning a Wayanad trip"
  };
  
  const prompt = `Generate a high SEO-optimized blog for ${topic.audience} in a ${topic.tone} tone. The blog should be ${topic.description}. Include relevant keywords, proper subheadings (H1, H2, H3), and a word count of approximately 800-1000 words to boost search engine ranking. Ensure the content is engaging, well-structured, and provides value to the reader.`;
  
  const result = await model.generateContent(prompt)
  const resp =   result.response.text()

  res.json({
            title : topic.description,
            body : resp
        })



})

route.get('/myblogs/:id', verifyToken,async (req,res) =>{

    userId = req.params.id;
    try {
        const r = await  Blog.find({ author: userId }).select('title body author ').populate('author','name'); // populate means it will link the author table from blogs to user table and brings all the information about users now here i said bring only name from the user table [populate('author','name')] slect is same as sql query
   
        console.log(r)
        res.json({

        })

    } catch (error) {
        console.log ("some error occured while fetching the result ")
    }

   
     

})

route.post('/add/:id',verifyToken,(req,res)=>{
   
 const userId = req.params.id;

    Blog.create({
        title :topic.description,
        body: resp,
        author: userId
    })
    .then(()=>{
        res.json({
            msg: "Blog Added Succesfuly "
        })
    })


})

module.exports= route








