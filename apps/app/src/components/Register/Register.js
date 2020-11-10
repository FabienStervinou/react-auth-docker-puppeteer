
import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../../utils/common';
import './register.scss'

export const Register = (props) => {
  const username = useFormInput('');
  const password = useFormInput('');
  const password_repeat = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = () => { 
    setError(null);
    setLoading(true);
    axios.post('http://api.react-docker-pupeteer.com/register', {
      email: username.value,
      password: password.value,
      repeat_password: password_repeat.value
    }, {
      'Access-Control-Allow-Origin': '*',
    }).then(response => {
      setLoading(false);
      // console.log(response);
      props.history.push('/login');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.server_error);
      else setError("Something went wrong. Please try again later.");
    });
  }


  return (
    <div className="form-container">
      <form action="">
        
        <h1 className="form-title">Register</h1>
        
        <section className="input">
          <div className="input-container">
            {/* Email */}
            <input id="email" type="text" {...username} autoComplete="new-password" placeholder="Email" />
          </div>
          <div className="input-container">
            {/* Password */}
            <input id="password" type="password" {...password} autoComplete="new-password" placeholder="Password" />
          </div>
          <div className="input-container">
            {/* Password-repeat */}
            <input id="password_repeat" type="password" {...password_repeat} autoComplete="new-password" placeholder="Password confirm" />
          </div>
        </section>

        <section className="error">
          {error && <><div id="error" style={{ color: 'rgb(187, 63, 63)' }}>{error}</div></>}
        </section>

        <section className="submit">
          <input id="register-submit" type="submit" value={loading ? 'Loading...' : 'Register'} onClick={handleRegister} disabled={loading} /><br />
        </section>

      </form>
    </div>
  )
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