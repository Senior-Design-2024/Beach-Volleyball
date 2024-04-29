import React, { useContext } from 'react';
import { UserContext } from './User';

export default function Teams(props) { 
  const {userData, setTeamData} = useContext(UserContext)

  const selectTeam = (team_id, team_name) => {
    console.log('run selectTeam')
    setTeamData(prevState => ({
      ...prevState,
      team_id: team_id,
      team_name: team_name,
    }))

    props.dispPlayers()
  }
  
  return(
    <div id='teams'>
      <button onClick={props.dispNewTeam}>New Team</button>

      <div id='list-teams'>
        {userData.teams.map(( (team) => (
          <div key={team.id} id='button-wrapper'>
            <br/>
            <button onClick={() => selectTeam(team.id, team.name)}>{team.name}</button>
          </div>
        )))}
      </div>
    </div>
  )
}