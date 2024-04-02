import React, { useState } from 'react';

export default function LoginForm({onSubmit}) { 
  const [loginData, setLoginData] = useState({
      username: '',
      password: '',
  });

  //handles submitting the form
  const handleSubmit = (event) => {
      event.preventDefault();

      const formDataJson = JSON.stringify(loginData);

      onSubmit(formDataJson);
  };

  const handleChange = (event) => {
      const { name, value } = event.target;
      // Update the state when form fields Change
      setLoginData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    };

  //html
  return(
    <div id='form-wrapper'>
      {/* form */}
      <form id='loginForm' onSubmit={handleSubmit} autoComplete='on'>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor='username' className='label'>Username:</label> 
                <input id='username' type='text' name='username' onChange={handleChange}/>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='password' className='label'>Password:</label>
                <input id='password' type='text' name='password' onChange={handleChange}/>
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