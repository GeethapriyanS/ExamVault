const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/userModel");
const PdfSchema = require("./models/pdfDetails");

dotenv.config();

// Check if environment variables are loaded
if (!process.env.ACCESS_TOKEN_SECRET || !process.env.MONGODB_URL) {
  console.error("Missing environment variables. Check your .env file.");
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/files", express.static("files"));

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connection Successful"))
  .catch((e) => {
    console.error("MongoDB Connection Failed:", e);
    process.exit(1);
  });

// Create "files" directory if not exists
const uploadDir = path.join(__dirname, "files");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./files");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

/* ========== User Authentication ========== */

// Create Account (Signup)
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: true, message: "All fields are required" });
  }

  const isUser = await User.findOne({ email });

  if (isUser) {
    return res.status(400).json({ error: true, message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    fullName,
    email,
    password: hashedPassword,
  });

  await user.save();

  const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "72h" });

  return res.status(201).json({ error: false, user: { fullName: user.fullName, email: user.email }, accessToken, message: "Registration Successful" });
});


// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: true, message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: true, message: "Invalid password" });
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "72h" });

    return res.status(200).json({
      error: false,
      user: { fullName: user.fullName, email: user.email },
      accessToken,
      message: "Login Successful",
    });
  } catch (error) {
    console.error("Error in /login:", error);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

/* ========== PDF Upload & Management ========== */

// Upload PDF
app.post("/upload-files", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ status: "error", message: "File not uploaded" });
  }

  const { title, year, examType } = req.body;
  const fileName = req.file.filename;

  try {
    await PdfSchema.create({ title, year, examType, pdf: fileName });
    res.json({ status: "ok", message: "File uploaded successfully" });
  } catch (error) {
    console.error("Error in /upload-files:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Get all PDFs
app.get("/get-files", async (req, res) => {
  try {
    const files = await PdfSchema.find({});
    res.json({ status: "ok", data: files });
  } catch (error) {
    console.error("Error in /get-files:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Remove PDF
app.post("/remove-file", async (req, res) => {
  const { title, year, examType } = req.body;

  try {
    const pdf = await PdfSchema.findOneAndDelete({ title, year, examType });

    if (!pdf) {
      return res.status(404).json({ status: "error", message: "PDF not found" });
    }

    const filePath = path.join(__dirname, "files", pdf.pdf);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({ status: "ok", message: "PDF removed successfully" });
  } catch (error) {
    console.error("Error in /remove-file:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
