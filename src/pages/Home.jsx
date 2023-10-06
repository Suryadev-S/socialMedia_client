import React, { useEffect, useState } from 'react';

export default function Home() {
  
  const [data, setData] = useState([]);
  const getDataFromLocalStorage = () => {
    const localStorageData = localStorage.getItem('token');
    return localStorageData ? localStorageData : null;
  };

  useEffect(() => {
    const localStorageData = getDataFromLocalStorage();
    setData(localStorageData);

    const postDataToServer = async (data) => {
      try {
        console.log('Posting data to server:', data);
        const response = await fetch('https://socialmedia-server-0df3.onrender.com/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ key: data })
        });

        if (response.ok) {
          const responseData = await response.json();
          const posts = responseData.post;
          console.log('Posts:', posts);
          setData(posts);
        } else {
          console.error('Failed to post data to server.');
        }
      } catch (error) {
        console.error('Error posting data to server:', error);
      }
    };

    postDataToServer(localStorageData);
  }, []);

  return (
    <div className="container">
      {Array.isArray(data) ? (
        data.map((post, index) => (
          <div className="card mb-3" key={index}>
            <img src={post.media[0]} className="card-img-top" alt={post.content} />
            <div className="card-body">
              <p className="card-text">{post.content}</p>
              <p className="card-text">
                <small className="text-body-secondary">
                  {post.liked ? 'Liked' : 'Not liked'}
                </small>
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
