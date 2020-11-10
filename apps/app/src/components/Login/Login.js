import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../../utils/common';
import './login.scss'
 
export const Login = (props) => {
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
 
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
        
        <h1 className="form-title">Login</h1>
        
        <section className="input">
          <div className="input-container">
            {/* Email */}
            <input id="email" type="text" {...username} autoComplete="new-password" placeholder="Email" />
          </div>
          <div className="input-container">
            {/* Password */}
            <input id="password" type="password" {...password} autoComplete="new-password" placeholder="Password" />
          </div>
        </section>

        <section className="error">
          {error && <><div id="error" style={{ color: 'rgb(187, 63, 63)' }}>{error}</div></>}
        </section>

        <section className="submit">
          <input id="login-submit" type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
        </section>

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

