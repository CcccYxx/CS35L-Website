import React from 'react';
import './Profile.css';

const Profile = () =>{
    return(
        <div>
            <div>
                <div>
                    <img style= {{width:"160px",height:"160px",borderRadius:"80px"}}
                        src="https://images.unsplash.com/photo-1484611941511-3628849e90f7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHBlb3BsZXxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                    />
                </div>
            </div>
            <h1> This is Profile Page </h1>
        </div>
    );  
};

export default Profile;