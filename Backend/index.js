const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const PdfSchema = require("./models/pdfDetails");
const path = require("path");
const fs = require("fs");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use("/files", express.static("files"));

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connection Successful"))
  .catch((e) => console.log("MongoDB Connection Not Successful", e));

const uploadDir = path.join(__dirname, "files");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload-files", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ status: "error", message: "File not uploaded" });
  }

  const { title } = req.body;
  const fileName = req.file.filename;

  try {
    await PdfSchema.create({ title, pdf: fileName });
    res.json({ status: "ok", message: "File uploaded successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.get("/get-files", async (req, res) => {
  try {
    const files = await PdfSchema.find({});
    res.json({ status: "ok", data: files });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server Started on port 5000");
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