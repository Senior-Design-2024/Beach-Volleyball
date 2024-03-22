import React, { useState } from 'react';

export default function AddTeamForm({onSubmit}) { 
    const [teamData, setTeamData] = useState({
      team_name: '',
      email: '',
    });

    //handles submitting the form
    const handleSubmit = (event) => {
      event.preventDefault();

      const formDataJson = JSON.stringify(teamData);

      onSubmit(formDataJson);
    };

    // Update the state when form fields change
    const handleChange = (event) => {
      const { name, value } = event.target;
        
      setTeamData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    };

    //html
    return(
      <div id='form-wrapper'>
        {/* form */}
        <form id='addTeamForm' onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor='team_name' className='label'>Team name:</label> 
                  <input id='team_name' type='text' name='team_name' onChange={handleChange}/>
                </td>
              </tr>
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