import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import AppHeader from '../components/AppHeader';

export default function Teams() {
  const [teams, setTeams] = useState({
    names: ['test1', 'test2'],
  });

  //navigate functions
  const navigate = useNavigate();
  const navigateHome = () => navigate('/');
  const navigateAddTeam = () => navigate('/AddTeam');
  const navigatePlayers = () => navigate('/Players');

  //html
  let display_teams;

  //displays teams if there is at least one
  if(teams.names.length === 0) {
    display_teams = (
      <div id='dev-wrapper'>
        <p>Please add a team</p>
        <BasicButton onClick={navigatePlayers} buttonText="dev button to team's players"></BasicButton>
      </div>
    );
  } else {
    display_teams = (
      <div>
        {teams.names.map(( (name) => (
          <div id='button-wrapper'>
            <br/>
            <BasicButton onClick={navigatePlayers} buttonText={name}/>
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
      <AppHeader masthead={'Welcome!'}
        leftButtonNames={['Create Team']} 
        leftButtonFunctions={[navigateAddTeam]}
        rightButtonNames={['Logout']}
        rightButtonFunctions={[navigateHome]}
      />
      {display_teams}
    </div>
  );
}