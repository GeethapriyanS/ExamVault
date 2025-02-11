const mongoose = require("mongoose");

const PdfSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
  examType: { type: String, required: true },
  pdf: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("PdfDetails", PdfSchema);
