import "./Admin.css";
import { useState } from "react";

const Admin = () => {
  const [upload, setUpload] = useState(true);
  const [remove, setRemove] = useState(false);
  setTimeout(() => {
    document.querySelector(".fa-solid").classList.add("hidden");
    document.querySelector(".fa-regular").classList.remove("hidden");
}, 2000);

const handleSuccess = (e) => {
  e.preventDefault(); 

  var notification = document.querySelector(".upload_successfully");
      notification.classList.add("successfully");

      setTimeout(() => {
          notification.classList.remove("successfully");
      }, 4000);
};

  const handleUpload = () => {
    setUpload(true);
    setRemove(false);
    var upload = document.getElementById("upload-btn");
    upload.style.background = "linear-gradient( #52057B, #BC6FF1)";
    upload.style.color = "white";

    var remove = document.getElementById("remove-btn");
    remove.style.background = "white";
    remove.style.color = "black";
  };
  const handleRemove = () => {
    setUpload(false);
    setRemove(true);
    var upload = document.getElementById("upload-btn");
    upload.style.background = "white";
    upload.style.color = "black";
    var remove = document.getElementById("remove-btn");

    remove.style.background = "linear-gradient( #52057B, #BC6FF1)";
    remove.style.color = "white";
  };
  return (
    <div className="admin_body">
      <div className="admin_container">
        <div className="uploaded_buttons">
          <button
            className="uploaded_button upload-btn"
            id="upload-btn"
            onClick={handleUpload}
          >
            Upload
          </button>
          <button
            className="uploaded_button remove-btn"
            id="remove-btn"
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
        {upload && (
          <form action="" className="uploaded_form" onSubmit={handleSuccess}>
            <h3>Upload PDF</h3>
            <div className="user_upload_inputs">
              <label htmlFor="" className="user_upload_labels">
                Title
              </label>
              <input type="text" className="user_upload_input" />
            </div>
            <div className="user_upload_inputs">
              <label htmlFor="" className="user_upload_labels">
                Year
              </label>
              <input type="text" className="user_upload_input" />
            </div>
            <div className="user_upload_inputs">
              <label htmlFor="" className="user_upload_labels">
                Select Exam Type
              </label>
              <select name="" id="" className="user_upload_input">
                <option value=""></option>
                <option value="CIA-1">CIA-1</option>
                <option value="CIA-2">CIA-2</option>
                <option value="CIA-3">CIA-3</option>
                <option value="SEM">SEM</option>
              </select>
            </div>
            <div className="user_upload_inputs">
              <label htmlFor="" className="user_upload_labels">
                Upload PDF
              </label>
              <input type="file" className="user_upload_input" />
            </div>
            <button type="submit">Upload</button>
          </form>
        )}

        {remove && (
          <form action="" className="remove_form">
            <h3>Remove PDF</h3>
            <div className="user_remove_inputs">
              <label htmlFor="" className="user_remove_labels">
                Title
              </label>
              <input type="text" className="user_remove_input" />
            </div>
            <div className="user_remove_inputs">
              <label htmlFor="" className="user_remove_labels">
                Year
              </label>
              <input type="text" className="user_remove_input" />
            </div>
            <div className="user_remove_inputs">
              <label htmlFor="" className="user_remove_labels">
                Select Exam Type
              </label>
              <select name="" id="" className="user_remove_input">
                <option value=""></option>
                <option value="CIA-1">CIA-1</option>
                <option value="CIA-2">CIA-2</option>
                <option value="CIA-3">CIA-3</option>
                <option value="SEM">SEM</option>
              </select>
            </div>
            <button>Remove</button>
          </form>
        )}
      </div>
      <div className="upload_successfully" id="upload_successfully">
        <div className="loading">
        <i className="fa-solid fa-circle-notch animated-icon"></i>
        <i className="fa-regular fa-circle-check hidden"></i>
        </div>
        <h3>Successfully Completed</h3>

      </div>
    </div>
  );
};
export default Admin;
