import React, { useState } from 'react';

const ImageUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const fileEvent = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUploadedFile(reader.result);
      setButtonDisabled(true);
    };

    if (file) {
      reader.readAsDataURL(file);
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
        />
        <label htmlFor="embedpollfileinput" className="ui huge button" style={buttonStyle} disabled={buttonDisabled}>
          <i className="ui upload icon"></i> 
          Upload image
        </label>
        {!uploadedFile && <div style={placeholderStyle}>Image will appear here</div>}
        {uploadedFile && <img src={uploadedFile} alt="Uploaded Preview" style={imageStyle} />}
      </div>
    </div>
  );
};

export default ImageUpload;
