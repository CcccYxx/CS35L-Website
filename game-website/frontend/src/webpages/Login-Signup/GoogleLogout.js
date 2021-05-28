import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = '552235296803-iur0cl7t7j2l1868fe2sa5suekjvm57q.apps.googleusercontent.com';

function Logout() {
    const onSuccess = () => {
        alert('Logged out succesfully');
    };

    return(
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            ></GoogleLogout>
        </div>
    );
}

export default Logout; 