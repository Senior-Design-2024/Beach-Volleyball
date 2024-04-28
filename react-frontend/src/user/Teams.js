import React, { useContext } from 'react';
import { UserContext } from './User';

export default function Teams(props) { 
  const {user_id} = useContext(UserContext)

  return(
    <div id='teams'>
      <button onClick={props.dispNewTeam}>New Team</button>
    </div>
  )
}