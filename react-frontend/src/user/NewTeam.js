import React, {useContext} from 'react';
import { UserContext } from './User';
import { postRequest } from '../utils';

export default function NewTeam(props) {
  const {user_id, getTeams, teamData, setTeamData} = useContext(UserContext)

  //handles submitting the form
  const handleSubmit = (event) => {
    event.preventDefault()

    const formDataJson = JSON.stringify({'user_id': user_id, 'team_id': teamData.team_name})
    console.log(formDataJson)

    postRequest({'user_id': user_id, 'team_name': teamData.team_name}, 'addteam')
    getTeams();

    props.dispTeams()
  };

  // Update the state when form fields change
  const handleChange = (event) => {
    const { name, value } = event.target
      
    setTeamData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  return(
    <div id='new-team'>
      <form id='new-player-form' onSubmit={handleSubmit}>
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
                <input type="submit"></input>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}