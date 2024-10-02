import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [uploadedFilePath, setUploadedFilePath] = useState(''); 

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://file-upload-cz4k.onrender.com/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setUploadedFilePath(response.data.file.filePath); 
      setPreview('');
      setFile(null);
      alert("file uploaded successfully")
    } catch (error) {
      if (error.response) {
        console.error('Server responded with:', error.response.data);
      } else if (error.request) {
        console.error('No response from server:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    }
  };

  return (
    <div className="file-upload-container">
      <h2>Upload Your File</h2>
      <div className="file-upload-input">
        <input type="file" onChange={handleFileChange} />
      </div>

      {preview && (
        <div className="preview-container">
          <h3>Preview:</h3>
          {file.type.startsWith('image/') && <img src={preview} alt="Preview" />}
          {file.type.startsWith('audio/') && <audio controls src={preview} />}
          {file.type.startsWith('video/') && <video controls src={preview} />}
          {file.type === 'application/pdf' && (
            <iframe src={preview} title="PDF Preview" style={{ width: '100%', height: '300px' }} />
          )}
        </div>
      )}

      <button className="upload-button" onClick={handleUpload}>Upload</button>

      {uploadedFilePath && (
        <div className="uploaded-file-container">
          <h3>Uploaded File:</h3>
          {file && file.type.startsWith('image/') && (
            <img src={`https://file-upload-cz4k.onrender.com/${uploadedFilePath}`} alt="Uploaded" style={{ width: '150px', height: '150px' }} />
          )}
          {file && file.type.startsWith('audio/') && (
            <audio controls src={`https://file-upload-cz4k.onrender.com/${uploadedFilePath}`} style={{ width: '150px' }} />
          )}
          {file && file.type.startsWith('video/') && (
            <video controls src={`https://file-upload-cz4k.onrender.com/${uploadedFilePath}`} style={{ width: '150px', height: '150px' }} />
          )}
          {file && file.type === 'application/pdf' && (
            <iframe src={`https://file-upload-cz4k.onrender.com/${uploadedFilePath}`} title="PDF" style={{ width: '150px', height: '150px' }} />
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
