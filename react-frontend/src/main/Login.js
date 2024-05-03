import React, { useState } from 'react';
import { findRequest } from '../utils';

export default function Login({onSubmit, navigateUser}) { 
  const [loginInfo, setLoginInfo] = useState({
      email: '',
  });

  const handleChange = (event) => {
    const {name, value} = event.target;

    setLoginInfo(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    findRequest('user', 'email', loginInfo.email).then(
      (userArray) => {
        navigateUser(userArray[0]);
      }).catch(
        (error) => {
          console.error('Error:', error);
        }
    )
  }

  //html
  return(
    <div id='login'>
      <form id='loginForm' onSubmit={handleSubmit} autoComplete='on'>
        <table className='login-table'>
          <tbody>
            <tr>
              <td>
                <label htmlFor='email' className='label'>Email:</label> 
                <input id='email' type='text' name='email' onChange={handleChange}/>
              </td>
            </tr>
            {/*
            <tr>
              <td>
                <label htmlFor='password' className='label'>Password:</label>
                <input id='password' type='password' name='password'></input>
              </td>
            </tr>
            */}
            <tr>
              <td>
                <input type="submit"></input>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}