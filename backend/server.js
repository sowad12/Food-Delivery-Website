const express=require('express');
var cookieParser = require('cookie-parser');
const dotenv=require('dotenv');
//import db
require('./db/conn')
//import route
const routes=require('./routes/route')
//import dotenv
dotenv.config({ path: './config/hidden.env' });

const app=express();
//middlewares
app.use(cookieParser())
app.use(express.json());
app.use(routes);

app.get('/',(req,res)=>{
res.send('lol');
});


const port=process.env.port;
app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
})





