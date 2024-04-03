import { useLocation, useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import { useState, useEffect } from 'react';
import AppHeader from '../components/AppHeader';

export default function Pairs() {
  const location = useLocation();

  const teamId = location.state.teamId;

  const [pairs, setPairs] = useState([]);

  const navigate = useNavigate();
  const navigatePlayers = () => navigate('/Players', {state: {teamId: teamId}});
  const navigateNewPair = () => navigate('/NewPair', {state: {teamId: teamId}});
  const navigateMatches = (id) => navigate('/Matches', {state: {teamId: teamId, pairId: id}});

   //GETs players
   useEffect(() => {
    const getPairs = async () => {
      try{ 
        const queryParams = new URLSearchParams({table: 'pair'});
        queryParams.append('team_id', teamId);

        const response = await fetch(`/find?${queryParams}`, {
          method: 'GET',
        });

        const responseJson = await response.json();

        if(responseJson) {
          setPairs(responseJson);
        } else {
          console.error('Invalid response data');
        }

      } catch (error) {
        console.error('Error with getPairs', error);
      } 
    }

    getPairs();
  }, [teamId]); 

  //html
  return (
    <div id='page-wrapper' className='page-wrapper'>
      <AppHeader masthead='Pairs'
        leftButtonNames={['']}
        leftButtonFunctions={[]}
        rightButtonNames={['back to players']}
        rightButtonFunctions={[navigatePlayers]}
      />

      <div id='display-pairs'>
        {pairs.map( (pair) => (
          <div key={pair.id} id='pair-wrapper'>
            <br/>
            <BasicButton onClick={() => navigateMatches(pair.id)} buttonText={pair.id}/>
          </div>
        ))}
        </div>

        <br/>
        <BasicButton onClick={navigateNewPair} buttonText='new pair'></BasicButton>
    </div>
  );
}