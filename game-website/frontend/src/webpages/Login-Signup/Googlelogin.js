import { GoogleLogin } from 'react-google-login';
import React from 'react';

const clientId = '552235296803-iur0cl7t7j2l1868fe2sa5suekjvm57q.apps.googleusercontent.com';

function Google() {
    const onSucces = (res) => {
        console.log('[Login Successful]');
    };

    const onFailure = (res) => {
        console.log('[Login failed]');
    };

    return(
        <div>
            <GoogleLogin
                clientId={clientId}
                render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        Google Login
                    </button> 
                )}
                buttonText="Google Login"
                onSucces={onSucces}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    );
}

export default Google;