import React, {useContext} from 'react';
import { UserContext } from './User';
import { getAndSetArr, postRequest } from '../utils';

export default function NewTeam(props) {
  const {userData, setTeams, teamData, setTeamData} = useContext(UserContext)

  //handles submitting the form
  const handleSubmit = async (event) => {
    event.preventDefault()

    await postRequest({'user_id': userData.id, 'team_name': teamData.name}, 'add/team')
    await getAndSetArr('team', 'user_id', userData.id, setTeams)
    
    props.dispTeams(userData.username)
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
                <label htmlFor='name' className='label'>Team name:</label> 
                <input id='name' type='text' name='name' onChange={handleChange}/>
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