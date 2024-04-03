import React, { useState } from 'react';

export default function AddPairForm({onSubmit, teamId, players}) { 
    const [pairData, setPairData] = useState({
      team_id: teamId,
      player1: 0,
      player2: 0,
    });

    //handles submitting the form
    const handleSubmit = (event) => {
      event.preventDefault();

      const formDataJson = JSON.stringify(pairData);

      onSubmit(formDataJson);
    };

    // Update the state when form fields change
    const handleChange = (event) => {
      const { name, value } = event.target;
        
      setPairData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    };

    //html
    return(
      <div id='form-wrapper'>
        <form id='addPairForm' onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor='player1' className='label'>Player 1:</label> 
                  <select id='player1' name='player1' onChange={handleChange} form='addPairForm'>
                    {players.map( (player) => (
                      <option key={player.id} id='player-option' value={player.id}>{player.name}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor='player2' className='label'>Player 2:</label> 
                  <select id='player2' name='player2' onChange={handleChange} form='addPairForm'>
                    {players.map( (player) => (
                        <option key={player.id} id='player-option' value={player.id}>{player.name}</option>
                      ))}
                  </select>
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