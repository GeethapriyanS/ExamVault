import { useEffect, useState } from "react";
import axios from "axios";
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp";
import "./pdf.css";
import "./pdf.worker.min.mjs";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

function Pdf() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [allPdfs, setAllPdfs] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    getPdfs();
  }, []);

  const getPdfs = async () => {
    try {
      const result = await axios.get("http://localhost:5000/get-files");
      console.log("Fetched PDFs:", result.data.data);
      setAllPdfs(result.data.data);
    } catch (error) {
      console.error("Error fetching PDFs:", error.message);
    }
  };

  const submitPdf = async (e) => {
    e.preventDefault();
    if (!title || !file) {
      alert("Please provide a title and a file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const result = await axios.post("http://localhost:5000/upload-files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Upload Response:", result.data);

      if (result.data.status === "ok") {
        alert("Uploaded Successfully!");
        getPdfs();
        setTitle("");
        setFile(null);
      } else {
        alert("Upload failed: " + result.data.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error.message);
      alert("Upload failed. Please try again.");
    }
  };

  // Display PDF
  const showPdf = (pdf) => {
    const pdfUrl = `http://localhost:5000/files/${pdf}`;
    console.log("Opening PDF:", pdfUrl);
    setPdfFile(pdfUrl);
  };

  return (
    <div className="App">
      <form className="formStyle" onSubmit={submitPdf}>
        <h4>Upload PDF in React</h4>
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type="file"
          className="form-control"
          accept="application/pdf"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>

      <div className="uploaded">
        <h4>Uploaded PDFs:</h4>
        <div className="output-div">
          {allPdfs.length === 0 ? (
            <p>No PDFs available.</p>
          ) : (
            allPdfs.map((data, index) => (
              <div className="inner-div" key={index}>
                <h6>Title: {data.title}</h6>
                <button className="btn btn-primary" onClick={() => showPdf(data.pdf)}>
                  Show PDF
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <PdfComp pdfFile={pdfFile} />
    </div>
  );
}

export default Pdf;
