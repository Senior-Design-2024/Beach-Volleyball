import React, { useState } from 'react';

export default function Login({onSubmit}) { 
  const [loginData, setLoginData] = useState({
      email: '',
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