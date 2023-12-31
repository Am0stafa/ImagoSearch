import React,{ useState, useRef } from 'react';
import axios from 'axios';
import './UploadPage.css';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from 'react-loading';

export const UploadPage = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState([]);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

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
  
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('images', file);
    });
  
    axios.post('http://localhost:8000/upload', formData)
      .then(async (res) => {
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 5013,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.log(res.data.message)
        setProgress(100);
        // await analyzeImages();
      })
      .catch((err) => {
        toast.error('Error uploading files.');
        console.error(err);
      });
  };

  const analyzeImages = async () => {
    setLoading(true);

    try {
      await axios.get('http://localhost:3000/analyze');
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
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
      {loading && (
        <div className="loading">
          <Loading type="spin" color="#000" height={50} width={50} />
          <p>Labeling images...</p>
        </div>
      )}
      <h2>File Upload & Image Preview</h2>
      <div>  
        <p>Upload multiple files with the file dialog or by dragging and dropping images onto the dashed region</p>
      </div>
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
      <ToastContainer />
    </div>
  );
};