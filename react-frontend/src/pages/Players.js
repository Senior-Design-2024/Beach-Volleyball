import { useNavigate, useLocation } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import { useState } from 'react';
import AppHeader from '../components/AppHeader';

export default function Players() {
  const location = useLocation();

  const userId = location.state.userId;

  const [teamData, setTeamData] = useState({
    name: 'default team name',
    players: [],
  });

  //navigation
  const navigate = useNavigate();
  const navigateTeams = () => navigate('/Teams', {state: {userId: userId}});
  const navigateEditTeam = () => navigate('/EditTeam');
  const navigatePlayerOverview = () => navigate('/PlayerOverview');
  const navigateAddPlayer = () => navigate('/AddPlayer');
  const navigatePairs = () => navigate('/Pairs');

  //html
  let display_players;

  //displays teams if there is at least one
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

  return (
    <div id='page-wrapper' className='page-wrapper'>
      <AppHeader masthead={teamData.name}
        leftButtonNames={['Pairs', 'Add player', 'Edit team']}
        leftButtonFunctions={[navigatePairs, navigateAddPlayer, navigateEditTeam]}
        rightButtonNames={['Back to teams']}
        rightButtonFunctions={[navigateTeams]}
      />
      {display_players}
    </div>
  );
}