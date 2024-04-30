import React, { useContext, useEffect } from 'react';
import { UserContext } from './User';
import { getAndSetArr } from '../utils';

export default function Teams(props) { 
  const {userData, teams, setTeamData, setPlayers, setPairs, header, setHeader, setCurrentView} = useContext(UserContext)
  const backlink = () => props.dispTeams(userData.username)

  const selectTeam = (team) => {
    setTeamData(team)
    getAndSetArr('player', 'team_id', team.id, setPlayers)
    getAndSetArr('pair', 'team_id', team.id, setPairs)

    props.dispPlayers(team.name, backlink)
  }

  const handleNewTeam = () => {
    props.dispNewTeam(backlink)
  }

  return(
    <div id='teams'>
      <button onClick={handleNewTeam}>New Team</button>
      <div id='list-teams'>
        {teams.length ?
          teams.map(( (team) => (
            <div key={team.id} id='button-wrapper'>
              <br/>
              <button onClick={() => selectTeam(team)}>{team.name}</button>
            </div>
          )))
          :
          'no teams'
        }
      </div>
    </div>
  )
}