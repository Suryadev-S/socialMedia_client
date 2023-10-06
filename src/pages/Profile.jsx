import React, {useState, useEffect} from 'react';


function Profile() {
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
        const response = await fetch('https://socialmedia-server-0df3.onrender.com/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ key: data })
        });

        if (response.ok) {
          const responseData = await response.json();
          const profileData = responseData.user;
          console.log('ProfileData', profileData);
          setData(profileData);
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
      { localStorageData ?
      <div className="card mb-3">
        <div className="card-body text-center">
          <h2 className="card-title">{data.username}</h2>
        </div>
      </div> :
      <div>
        maybe you are not logged in.
      </div>
      }
    </div>
  );
}

export default Profile;
