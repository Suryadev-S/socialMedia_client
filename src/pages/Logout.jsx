import React, {useState} from 'react';

function Logout(){
    const [flag,setFlag] = useState(false);

    function handleClick(){
        localStorage.removeItem('token');
        setFlag(true);
    }
    return(
        <div className='container'>
            <h2>do you really want to logout?</h2>
            <p>this will erase all the data</p>
            <button className='btn btn-primary' onClick={handleClick}>Logout</button>
            {
                flag && <p>You have logged out</p>
            }
        </div>
    )
}

export default Logout;