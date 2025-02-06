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


// create a account 
app.post("/create-account", async (req, res) =>{
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
             return res.status(400).json({ error: true, message: "All fields are required" });
        }

    const isUser = await User.findOne({ email });

    if (isUser) {
              return res.status(400).json({ error: true, message: "User already exists" });
       }

      const hashedPassword= await bcrypt.hash(password,10);


      const user=new User({
        fullName,email,password:hashedPassword,
      });


      await user.save();

      const accessToken=jwt.sign({userId:user._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"72H"});

      return res.status(201).json({error: false,user: { fullName: user.fullName, email: user.email },accessToken, message: "Registration Successful"});


    });