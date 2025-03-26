const express = require('express')
const cors = require('cors');
const app = express()
const bodyParser = require('body-parser')
const mainRoute = require('./routes/route')
const PORT = 3000;





app.use(cors());
app.use(bodyParser.json());

app.use('/create',mainRoute);





app.listen(PORT,()=>{
    console.log(`listening on PORT ${PORT} `)
})





