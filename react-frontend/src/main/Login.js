import React, { useState } from 'react';
import { getRequest } from '../utils';

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

    getRequest('user', 'email', loginInfo.email).then(
      (userArray) => {
        navigateUser(userArray[0].id);
      }).catch(
        (error) => {
          console.error('Error:', error);
        }
    );
    //navigateUser( getRequest('user', 'email', loginInfo.email)[0].id );
  }

  //html
  return(
    <div id='login'>
      <form id='loginForm' onSubmit={handleSubmit} autoComplete='on'>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor='email' className='label'>Email:</label> 
                <input id='email' type='text' name='email' onChange={handleChange}/>
              </td>
            </tr>
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