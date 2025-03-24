const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mainRoute = require('./routes/route')
const PORT = 3000;






app.use(bodyParser.json());

app.use('/create',mainRoute);





app.listen(PORT,()=>{
    console.log(`listening on PORT ${PORT} `)
})





