import React, { useState } from 'react';
import './Login.css'
import axios from 'axios';
import { setUserSession } from '../utils/common';
 
export const Login = (props) => {
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
 
  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('http://api.react-docker-pupeteer.com/login', {
        email: username.value,
        password: password.value
      }, {
        'Access-Control-Allow-Origin': '*',
      }).then(response => {
        setLoading(false);
        console.log(response);
      setUserSession(response.data.token, response.data.user);
      props.history.push('/profile');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.server_error);
      else setError("Something went wrong. Please try again later.");
    });
  }
 
  return (
    <div className="form-container">
      <form action="">
        Login<br /><br />
        <div>
          Email<br />
          <input id="email" type="text" {...username} autoComplete="new-password" />
        </div>
        <div style={{ marginTop: 10 }}>
          Password<br />
          <input id="password" type="password" {...password} autoComplete="new-password" />
        </div>
        {error && <><div id="error" style={{ color: 'rgb(187, 63, 63)' }}>{error}</div><br /></>}<br />
        <input id="login-submit" type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
      </form>
    </div>
  );
}
 
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}











// import React from 'react';

// export const Login = () => {
//   return (
//     <div>
//       Login page
      
    
//       {/* TODO form component */}
//     </div>
//   )
// }