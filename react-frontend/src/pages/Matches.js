import { useLocation, useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import { useState, useEffect } from 'react';
import AppHeader from '../components/AppHeader';

export default function Matches() {
  const location = useLocation();

  const teamId = location.state.teamId;
  const pairId = location.state.pairId;
  const [matches, setMatches] = useState([]);

  const navigate = useNavigate();
  const navigatePairs = () => navigate('/Pairs', {state: {teamId: teamId}});
  const navigateEditPair = () => navigate('/EditPair');
  const navigateMatchStats = (id) => navigate('/MatchStats', {state: {matchId: id}});
  const navigateNewMatch = () => navigate('/NewMatch', {state: {teamId: teamId, pairId: pairId}});

   //GETs players
   useEffect(() => {
    const getMatches = async () => {
      try{ 
        const queryParams = new URLSearchParams({table: 'match'});
        queryParams.append('pair_id', pairId);

        const response = await fetch(`/find?${queryParams}`, {
          method: 'GET',
        });

        const responseJson = await response.json();

        if(responseJson) {
          setMatches(responseJson);
        } else {
          console.error('Invalid response data');
        }

      } catch (error) {
        console.error('Error with getMatches', error);
      } 
    }

    getMatches();
  }, [pairId]); 

  //html
  return (
    <div id='page-wrapper' className='page-wrapper'>
      <AppHeader masthead='Matches'
        leftButtonNames={['']}
        leftButtonFunctions={[]}
        rightButtonNames={['back to pairs']}
        rightButtonFunctions={[navigatePairs]}
      />

      <div id='display-matches'>
        {matches.map( (match) => (
          <div key={match.id} id='match-wrapper'>
            <br/>
            <BasicButton onClick={() => navigateMatchStats(match.id)} buttonText={match.id}/>
          </div>
        ))}
        </div>

        <br/>
        <BasicButton onClick={navigateNewMatch} buttonText='new match'></BasicButton>
    </div>
  );
}