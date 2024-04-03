import { useNavigate, useLocation } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import { useState, useEffect } from 'react';
import AppHeader from '../components/AppHeader';

export default function Players() {
  const location = useLocation();

  const teamId = location.state.teamId;

  const [teamData, setTeamData] = useState({
    id: 0,
    user_id: 0,
    name: 'default_team_name',
  });

  const [players, setPlayers] = useState([]);

  //GETs teamData
  useEffect(() => {
    const getTeam = async () => {
      try{
        const queryParams = new URLSearchParams({table: 'team'});
        queryParams.append('id', teamId);

        const response = await fetch(`find?${queryParams}`, {
          method: 'GET',
        });

        const responseJson = await response.json();

        if(responseJson && responseJson.length === 1){
          setTeamData(responseJson[0]);
        } else {
          console.error('Invalid or empty response data');
        }
      } catch (error) {
        console.error('Error with getTeam', error);
      }
    }

    getTeam();
  }, [teamId]);


  //GETs players
  useEffect(() => {
    const getPlayers = async () => {
      try{ 
        const queryParams = new URLSearchParams({table: 'player'});
        queryParams.append('team_id', teamId);

        const response = await fetch(`/find?${queryParams}`, {
          method: 'GET',
        });

        const responseJson = await response.json();

        if(responseJson) {
          setPlayers(responseJson);
        } else {
          console.error('Invalid response data');
        }

      } catch (error) {
        console.error('Error with getPlayers', error);
      } 
    }

    getPlayers();
  }, [teamId]);


  //navigation
  const navigate = useNavigate();
  const navigateTeams = (userId) => navigate('/Teams', {state: {userId: userId}});
  const navigateEditTeam = () => navigate('/EditTeam');
  const navigatePlayerOverview = () => navigate('/PlayerOverview', {state: {teamdId: teamId}});
  const navigateAddPlayer = () => navigate('/AddPlayer', {state: {teamId: teamId}});
  const navigatePairs = () => navigate('/Pairs', {state: {teamId: teamId}});

  //html
  return (
    <div id='page-wrapper' className='page-wrapper'>
      <AppHeader masthead={teamData.name}
        leftButtonNames={['Edit team']}
        leftButtonFunctions={[navigateEditTeam]}
        rightButtonNames={['Back to teams']}
        rightButtonFunctions={[() => navigateTeams(teamData.user_id)]}
      />
      
      <div>
        {players.length < 2 && <p><br/>Please add a player</p>}
        {players.length >= 2 && <BasicButton buttonText='Pairs' onClick={navigatePairs}/>}
      </div>

      <div id='display-players'>
        {players.map( (player) => (
          <div key={player.id} id='button-wrapper'>
            <br/>
            <BasicButton onClick={navigatePlayerOverview} buttonText={player.name}/>
          </div>
        ))}
      </div>
      
      <br/>
      <BasicButton buttonText='Add Player' onClick={navigateAddPlayer}/>    
    </div>
  );
}