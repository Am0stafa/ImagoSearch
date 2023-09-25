import React, { useState } from 'react';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImageUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const fileEvent = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUploadedFile(reader.result);
      setButtonDisabled(true);
      uploadImage(file); // Call the upload function once the image is loaded
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      // Upload image to server
      const response = await axios.post('http://localhost:8000/upload-similar', formData);
      console.log(response.data);
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5013,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      // Search will start
      try {
        const searchResponse = await axios.get('http://localhost:8000/analyze-similar');
        console.log(searchResponse.data);
        
      } catch (error) {
        console.log("Error searching for similar images:", error)
      }


    } catch (error) {
      toast.error('Error uploading the image. Please refresh the page and try again.', {
        position: "top-center",
        autoClose: 5013,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.error("Error uploading the image:", error);
    }
  };

  const centerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const buttonStyle = {
    backgroundColor: buttonDisabled ? 'gray' : 'blue',
    color: 'white',
    width: '150px',
    height: '60px',
    borderRadius: '45px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const imageStyle = {
    marginLeft: '23px',
    height: '295px',
    width: '175px'
  };

  const placeholderStyle = {
    marginLeft: '23px',
    height: '295px',
    width: '175px',
    backgroundColor: '#eee',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#aaa'
  };

  return (
    <div className="ui middle aligned center aligned grid container" style={centerStyle}>
      <div className="ui fluid segment" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <input 
        type="file" 
        onChange={fileEvent} 
        className="inputfile" 
        id="embedpollfileinput" 
        style={{ display: 'none' }}
        disabled={buttonDisabled}
        accept="image/*"
      />
        <label htmlFor="embedpollfileinput" className="ui huge button" style={buttonStyle} disabled={buttonDisabled}>
          <i className="ui upload icon"></i> 
          Upload image
        </label>
        {!uploadedFile && <div style={placeholderStyle}>Image will appear here</div>}
        {uploadedFile && <img src={uploadedFile} alt="Uploaded Preview" style={imageStyle} />}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ImageUpload;
