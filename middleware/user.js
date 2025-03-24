const jwt = require('jsonwebtoken');
const zod = require('zod')
const JWT_key= "my_secret_key";

const zodSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6)
})


function checkUser(req,res,next){
     
   
    const t = zodSchema.safeParse({

        username : req.body.username,
        password: req.body.password
    })
    console.log(req.body.username)
    console.log(t)

    if (t.success){
        next();
    } else{
        res.status(400).json({
            msg: "enter correct email or password "
        })
    }

    
}

function verifyToken(req,res,next){
  
    



    try {
        const token = req.headers.authorization.split(" ");
        
        let newToken = token[1]
        // t console.log(token)oken = token.split(" ");
        console.log(newToken)
       
        const decode = jwt.verify(newToken,JWT_key)

        if (decode){
            next();
        }
        
    } catch (error) {
        
        res.status(403).json({
            msg: "you must login first!!!!"
        })
    }



}








module.exports ={
    checkUser, verifyToken
}







// try {
//     const log =jwt.verify("8eyJhbGciOiJIUzI1NiJ9.c2FpZGFyc2hhbg.BfvDGjO6CTQB2pxw2MyCUHJT_QSGo4rQbS22JJo4zto",JWT_key)
//     if (log){
//         console.log("true")
//     }
// } catch (error) {
//     console.log("false") 
// }


    

