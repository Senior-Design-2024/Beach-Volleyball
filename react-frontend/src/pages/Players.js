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

  //GETs the players and setTeamData
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


  //navigation
  const navigate = useNavigate();
  const navigateTeams = (userId) => navigate('/Teams', {state: {userId: userId}});
  const navigateEditTeam = () => navigate('/EditTeam');
  const navigatePlayerOverview = () => navigate('/PlayerOverview');
  const navigateAddPlayer = () => navigate('/AddPlayer');
  const navigatePairs = () => navigate('/Pairs');

  //html
  let display_players;

  //displays teams if there is at least one
  /*
  if(teamData.players.length === 0) {
    display_players = (
      <div id='dev-wrapper'>
        <p>Please add a player</p>
        <BasicButton onClick={navigatePlayerOverview} buttonText='dev button to player overview'></BasicButton>
      </div>
    );
  } else {
    display_players = (
      <div>
        {teamData.players.map(( (name) => (
          <div id='button-wrapper'>
            <br/>
            <BasicButton onClick={navigatePlayerOverview} buttonText={name}/>
          </div>
        )))}
        <p>
          *dev notes*<br/>
          these buttons have no functionality other than moving to the next page
        </p>
      </div>
    );
  }
  */
 display_players = (<></>);

  return (
    <div id='page-wrapper' className='page-wrapper'>
      <AppHeader masthead={teamData.name}
        leftButtonNames={['Pairs', 'Add player', 'Edit team']}
        leftButtonFunctions={[navigatePairs, navigateAddPlayer, navigateEditTeam]}
        rightButtonNames={['Back to teams']}
        rightButtonFunctions={[() => navigateTeams(teamData.user_id)]}
      />
      {display_players}
    </div>
  );
}