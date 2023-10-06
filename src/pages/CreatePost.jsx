import React, { useState } from 'react';
import axios from 'axios';


function CreatePost() {
  const [postText, setPostText] = useState('');
  const [file, setFile] = useState(null);
  const [mediaUrl, setMediaUrl] = useState(null);
  const cloudName = 'dnxpue9kq';

  const getDataFromLocalStorage = () => {
    const localStorageData = localStorage.getItem('token');
    return localStorageData ? localStorageData : null;
  };


  const handlePostTextChange = (e) => {
    setPostText(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append("upload_preset","media_preset");

      
      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${file.type.split('/')[0]}/upload`;

     
      const response = await axios.post(uploadUrl, formData);
      const uploadedMediaUrl = response.data.secure_url;
      const localStorageData = getDataFromLocalStorage();

      const postData = {
        content: postText,
        media: uploadedMediaUrl,
        key: localStorageData
      };

      
      const postResponse = await axios.post('https://socialmedia-server-0df3.onrender.com/media-post', postData,{ withCredentials: true });

      if (postResponse.data.message === 'post uploaded') {
        
        console.log('Post uploaded successfully');
      } else {
        
        console.error('Error uploading post:', postResponse.data.message);
      }

      console.log('Post Text:', postText);
      console.log('Media URL:', uploadedMediaUrl);


      
      setMediaUrl(uploadedMediaUrl);

      
      setPostText('');
      setFile(null);
  
    } catch (error) {
      console.error('Error uploading media to Cloudinary:', error);
    }
  };

  return (
    <div className="container">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="postText" className="form-label">
            Write about your post:
          </label>
          <textarea
            className="form-control"
            id="postText"
            rows="4"
            value={postText}
            onChange={handlePostTextChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="fileInput" className="form-label">
            Upload an image or video:
          </label>
          <input
            type="file"
            className="form-control"
            id="fileInput"
            accept={`${file ? file.type.split('/')[0] : ''}/*`}
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </form>
      {/* Display the uploaded media using an img or video element */}
      {mediaUrl && (
        <div className="uploaded-media">
          {file && file.type.startsWith('image') ? (
            <img src={mediaUrl} alt="Uploaded Media" />
          ) : file && file.type.startsWith('video') ? (
            <video controls width="300" height="200">
              <source src={mediaUrl} type={file.type} />
              Your browser does not support the video tag.
            </video>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default CreatePost;
