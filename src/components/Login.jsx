import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/loginstyle.css'
import axios from 'axios';

const Login = () => {
  const [mobile, setMobile] = useState('');
  const [pin, setPin] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    if (e.target.name === 'mobile') {
      setMobile(e.target.value);
    } else if (e.target.name === 'pin') {
      setPin(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Client-side validation
    if (!/^\d{9,12}$/.test(mobile)) {
      setErrorMessage('Mobile number should be a number with a minimum length of 9 and a maximum length of 12.');
      return;
    }

    if (!/^\d{4}$/.test(pin)) {
      setErrorMessage('Login Pin should be a 4-digit number.');
      return;
    }

    // Send login request to the API
    const payload = {
      mobile: mobile,
      pin: pin,
      envinfo: 'Web',
      versioninfo: '1.0',
      otherinfo: '{}'
    };

    axios
      .post('http://172.105.42.161:3020/v1/user/validatePin', payload)
      .then((response) => {
        if (response.status === 200) {
          // Successful login, navigate to bank module
          navigate('/BankModule');
          console.log(response.data.data.token)
          const accessToken = response.data.data.token;
          localStorage.setItem('accessToken', accessToken);
        } else {
          setErrorMessage('Login failed. ' + response.data.message);
        }
      })
      .catch((error) => {
        setErrorMessage('Login request failed. Please try again later.');
        console.error(error);
      });
  };

  return (
    <div className='login_section'>
      <form onSubmit={handleSubmit} className='login_detail'>
        <label htmlFor='mobile'>Mobile No:</label>
        <input type='text' id='mobile' name='mobile' value={mobile} onChange={handleInputChange} minLength='9' maxLength='12' required /><br /><br />

        <label htmlFor='pin'>Login Pin:</label>
        <input type='password' id='pin' name='pin' value={pin} onChange={handleInputChange} minLength='4' maxLength='4' required /><br /><br />

        <input className='btn_login' type='submit' value='Login' />

        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
