import React, { useState } from 'react';

export default function AddPlayerForm({onSubmit, teamId}) { 
    const [playerData, setPlayerData] = useState({
      player_name: '',
      team_id: teamId,
      description: '',
    });

    //handles submitting the form
    const handleSubmit = (event) => {
      event.preventDefault();

      const formDataJson = JSON.stringify(playerData);

      onSubmit(formDataJson);
    };

    // Update the state when form fields change
    const handleChange = (event) => {
      const { name, value } = event.target;
        
      setPlayerData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    };

    //html
    return(
      <div id='form-wrapper'>
        {/* form */}
        <form id='addPlayerForm' onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor='player_name' className='label'>Player name:</label> 
                  <input id='player_name' type='text' name='player_name' onChange={handleChange}/>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor='description' className='label'>Player description:</label> 
                  <input id='description' type='text' name='description' onChange={handleChange}/>
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