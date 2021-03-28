import React from 'react';
import {Button} from '@material-ui/core';
import './Login.css';
import {auth,provider} from './firebase';
import {actionTypes} from './reducer';
import {useStateValue} from './StateProvider';


function Login() {
     const [{}, dispatch] = useStateValue();
     const signIn = () => {
             auth
             .signInWithPopup(provider)
             .then((result) => {
                 dispatch({
                     type: actionTypes.SET_USER,
                     user: result.user
                 })
             } )
             .catch((error) => alert(error.message));
     };

    return (
        <div className="Login">
            <div className="Login-container">
                <img
                      src="https://www.brandcrowd.com/gallery/brands/pictures/picture12609019731388.jpg"
                      alt=""
                />
                <div className="Login-text">
                 <h1>Sign in to Chit-Chat</h1>
                </div> 
                <Button type="submit" onClick={signIn}>
                    Sign In With Google
                </Button>



            </div>
            
        </div>
    )
}

export default Login
