import React, { useState } from 'react';

export default function NewUserForm({onSubmit}) { 
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    //handles submitting the form
    const handleSubmit = (event) => {
        event.preventDefault();

        const formDataJson = JSON.stringify(formData);

        onSubmit(formDataJson);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        // Update the state when form fields change
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
        }));
      };

    //html
    return(
        <div>
            {/* form */}
            <form id='newUserForm' onSubmit={handleSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label className='label' htmlFor='username'>Username:</label><input type='text' id='username' name='username' onChange={handleChange}></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='email'>Email:</label><input type='text' id='email' name='email' onChange={handleChange}></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='password'>Password:</label><input type='text' id='password' name='password' onChange={handleChange}></input>
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