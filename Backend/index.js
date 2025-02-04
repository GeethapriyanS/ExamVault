const express=require("express");
const mdb=require('mongoose');
const dotenv=require("dotenv");
const cors=require('cors');
const jwt =require('jsonwebtoken');
const bcrypt=require('bcrypt');
const axios=require('axios');
const app=express();

dotenv.config();
app.use(cors());

mdb.connect(process.env.MONGODB_URL).then(()=>{
    console.log("MongoDB Connection Sucessful")
}).catch((e)=>{
    console.log("MongoDB Connection Not Sucessful",e);
})

app.listen(3001,()=>{
    console.log("Server Started");
});