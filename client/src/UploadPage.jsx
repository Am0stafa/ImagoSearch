import React,{ useState, useRef } from 'react'
import './UploadPage.css'

export const UploadPage = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState([]);
  const fileInputRef = useRef(null);

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = e.dataTransfer.files;
    handleFiles(droppedFiles);
  };

  const handleFiles = (uploadedFiles) => {
    const fileList = Array.from(uploadedFiles);

    fileList.forEach((file) => {
      parseFile(file);
      uploadFile(file);
    });

    setFiles(fileList.map((file) => URL.createObjectURL(file)));
  };

  const onFileChange = (e) => {
    const selectedFiles = e.target.files;
    handleFiles(selectedFiles);
  };

  const parseFile = (file) => {
    if (!file) return;

    const isGood = /\.(?=gif|jpg|png|jpeg)/gi.test(file.name);
    if (isGood) {
      setMessages((prevMessages) => [...prevMessages, file.name]);
    } else {
      setMessages((prevMessages) => [...prevMessages, "Please upload an image file."]);
    }
  };

  const uploadFile = (file) => {
    // Simulate file upload here
    // Implement actual file upload logic
    console.log("Uploading file", file);
  };

  return (
    <div>
      <h2>File Upload & Image Preview</h2>
      <p className="lead">
        No Plugins <b>Just Javascript</b>
      </p>

      <form className="uploader">
        <input
          id="file-upload"
          type="file"
          name="fileUpload"
          accept="image/*"
          ref={fileInputRef}
          onChange={onFileChange}
          multiple
        />
        <label
          htmlFor="file-upload"
          id="file-drag"
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <div id="start">
            <i className="fa fa-download" aria-hidden="true"></i>
            <div>Select files or drag here</div>
            <button
              type="button"
              id="file-upload-btn"
              className="btn btn-primary"
              onClick={() => fileInputRef.current.click()}
            >
              Select files
            </button>
          </div>
          {files.length > 0 && (
            <div id="response">
              <div id="messages">
                {messages.map((message, index) => (
                  <div key={index}>{message}</div>
                ))}
              </div>
              <progress
                className="progress"
                id="file-progress"
                value={progress}
                max="100"
              >
                {progress}%
              </progress>
            </div>
          )}
        </label>
      </form>
      <div className="image-preview">
        {files.map((file, index) => (
          <img key={index} id={`file-image-${index}`} src={file} alt="Preview" width="100" />
        ))}
      </div>
    </div>
  );
};