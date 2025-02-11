import "../Boopathi/Admin.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Admin1 = () => {
  const [upload, setUpload] = useState(true);
  const [remove, setRemove] = useState(false);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [examType, setExamType] = useState("");
  const [file, setFile] = useState(null);
  const [allPdfs, setAllPdfs] = useState([]);

  useEffect(() => {
    getPdfs();
  }, []);

  // Fetch PDFs
  const getPdfs = async () => {
    try {
      const result = await axios.get("http://localhost:5000/get-files");
      setAllPdfs(result.data.data);
    } catch (error) {
      console.error("Error fetching PDFs:", error.message);
    }
  };

  // Handle Upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !year || !examType || !file) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("year", year);
    formData.append("examType", examType);
    formData.append("file", file);

    try {
      const result = await axios.post("http://localhost:5000/upload-files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (result.data.status === "ok") {
        alert("PDF uploaded successfully!");
        getPdfs();
        setTitle("");
        setYear("");
        setExamType("");
        setFile(null);
      } else {
        alert("Upload failed: " + result.data.message);
      }
    } catch (error) {
      console.error("Upload error:", error.message);
      alert("Upload failed. Please try again.");
    }
  };

  // Handle Remove
  const handleRemove = async (e) => {
    e.preventDefault();
    if (!title || !year || !examType) {
      alert("Please enter the details to remove a PDF.");
      return;
    }

    try {
      const result = await axios.post("http://localhost:5000/remove-file", {
        title,
        year,
        examType,
      });

      if (result.data.status === "ok") {
        alert("PDF removed successfully!");
        getPdfs();
        setTitle("");
        setYear("");
        setExamType("");
      } else {
        alert("Remove failed: " + result.data.message);
      }
    } catch (error) {
      console.error("Remove error:", error.message);
      alert("Failed to remove. Try again.");
    }
  };

  // Handle UI Tabs
  const toggleUpload = () => {
    setUpload(true);
    setRemove(false);
  };

  const toggleRemove = () => {
    setUpload(false);
    setRemove(true);
  };

  return (
    <div className="admin_body">
      <div className="admin_container">
        <div className="uploaded_buttons">
          <button className={`uploaded_button ${upload ? "active" : ""}`} onClick={toggleUpload}>
            Upload
          </button>
          <button className={`uploaded_button ${remove ? "active" : ""}`} onClick={toggleRemove}>
            Remove
          </button>
        </div>

        {upload && (
          <form onSubmit={handleUpload} className="uploaded_form">
            <h3>Upload PDF</h3>
            <div className="user_upload_inputs">
              <label className="user_upload_labels">Title</label>
              <input type="text" className="user_upload_input" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="user_upload_inputs">
              <label className="user_upload_labels">Year</label>
              <input type="text" className="user_upload_input" value={year} onChange={(e) => setYear(e.target.value)} required />
            </div>
            <div className="user_upload_inputs">
              <label className="user_upload_labels">Select Exam Type</label>
              <select className="user_upload_input" value={examType} onChange={(e) => setExamType(e.target.value)} required>
                <option value="">-- Select --</option>
                <option value="CIA-1">CIA-1</option>
                <option value="CIA-2">CIA-2</option>
                <option value="CIA-3">CIA-3</option>
                <option value="SEM">SEM</option>
              </select>
            </div>
            <div className="user_upload_inputs">
              <label className="user_upload_labels">Upload PDF</label>
              <input type="file" className="user_upload_input" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} required />
            </div>
            <button type="submit">Upload</button>
          </form>
        )}

        {remove && (
          <form onSubmit={handleRemove} className="remove_form">
            <h3>Remove PDF</h3>
            <div className="user_remove_inputs">
              <label className="user_remove_labels">Title</label>
              <input type="text" className="user_remove_input" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="user_remove_inputs">
              <label className="user_remove_labels">Year</label>
              <input type="text" className="user_remove_input" value={year} onChange={(e) => setYear(e.target.value)} required />
            </div>
            <div className="user_remove_inputs">
              <label className="user_remove_labels">Select Exam Type</label>
              <select className="user_remove_input" value={examType} onChange={(e) => setExamType(e.target.value)} required>
                <option value="">-- Select --</option>
                <option value="CIA-1">CIA-1</option>
                <option value="CIA-2">CIA-2</option>
                <option value="CIA-3">CIA-3</option>
                <option value="SEM">SEM</option>
              </select>
            </div>
            <button type="submit">Remove</button>
          </form>
        )}

        <div className="uploaded_pdfs">
          <h4>Available PDFs:</h4>
          <ul>
            {allPdfs.length === 0 ? <p>No PDFs available.</p> : allPdfs.map((pdf, index) => <li key={index}>{pdf.title} ({pdf.year} - {pdf.examType})</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin1;
