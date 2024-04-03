import React, { useState, useEffect } from 'react';

export default function AddPairForm({onSubmit, teamId, players}) { 
  const [pairData, setPairData] = useState({
    team_id: teamId,
    player1_id: 0,
    player2_id: 0,
  });
  
  // Update pairData when players prop changes
  useEffect(() => {
    setPairData(prevPairData => ({
      ...prevPairData,
      player1_id: players.length >= 1 ? players[0].id : 0,
      player2_id: players.length >= 1 ? players[0].id : 0,
    }));
  }, [players]);

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
                <label htmlFor='player1_id'>Player 1:</label> 
                <select id='player1_id' name='player1_id' onChange={handleChange} form='addPairForm'>
                  {players.map( (player) => (
                    <option key={player.id} id='player-option' value={player.id}>{player.name}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='player2_id'>Player 2:</label> 
                <select id='player2_id' name='player2_id' onChange={handleChange} form='addPairForm'>
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