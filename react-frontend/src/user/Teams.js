import React, { useContext } from 'react';
import { UserContext } from './User';

export default function Teams(props) { 
  const {teams} = useContext(UserContext)
  
  return(
    <div id='teams'>
      <button onClick={props.dispNewTeam}>New Team</button>
      
      <div id='list-teams'>
        {teams.map(( (team) => (
          <div key={team.id} id='button-wrapper'>
            <br/>
            <button>{team.name}</button>
          </div>
        )))}
      </div>
    </div>
  )
}