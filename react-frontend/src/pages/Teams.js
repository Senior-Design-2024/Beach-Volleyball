import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import AppHeader from '../components/AppHeader';

export default function Teams() {
  //initialize
  const location = useLocation();

  const userId = location.state.userId;
  const [teams, setTeams] = useState([]);

  //navigate functions
  const navigate = useNavigate();
  const navigateHome = () => navigate('/');
  const navigateAddTeam = () => navigate('/AddTeam', {state: {userId: userId}});
  const navigatePlayers = (teamId) => navigate('/Players', {state: {teamId: teamId}});

  //GETs the teams and setTeams
  useEffect(() => {
    const getTeams = async () => {
      try{
        const queryParams = new URLSearchParams({table: 'team'});
        queryParams.append('user_id', userId);

        const response = await fetch(`/find?${queryParams}`, {
          method: 'GET',
        });

        //convert response to JSON
        const responseJson = await response.json();

        //check if responseJson array is not empty and contains the expected data structure
        if (responseJson) {
          setTeams(responseJson);
        } else {
          console.error('Invalid response data');
        }
      } catch (error) {
        console.error('Error with getTeams', error);
      }
    };

    getTeams();
  }, [userId]);

  //html
  return (
    <div id='page-wrapper' className='page-wrapper'>
      <AppHeader masthead={'Welcome!'}
        leftButtonNames={['']} 
        leftButtonFunctions={[]}
        rightButtonNames={['Logout']}
        rightButtonFunctions={[navigateHome]}
      />

      <div id='display-teams'>
        {teams.map(( (team) => (
          <div key={team.id} id='button-wrapper'>
            <br/>
            <BasicButton onClick={() => navigatePlayers(team.id)} buttonText={team.name}/>
          </div>
        )))}
      </div>

      <div>
        {teams.length === 0 && <p><br/>Please add a team</p>}
      </div>

      <br/>
      <BasicButton buttonText='Add Team' onClick={navigateAddTeam}/>
    </div>
  );
}