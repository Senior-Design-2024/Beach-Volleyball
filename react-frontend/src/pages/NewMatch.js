import { useLocation, useNavigate } from 'react-router-dom';
import NewMatchForm from '../components/NewMatchForm';
import '../App.css'
import { useState, useEffect } from 'react';
import AppHeader from '../components/AppHeader';

export default function NewMatch() {
  const location = useLocation();

  const teamId = location.state.teamId;
  const pairId = location.state.pairId;

  const [players, setPlayers] = useState([]);

  const navigate = useNavigate();
  const navigateMatches = () => navigate('/Matches', {state: {teamId: teamId, pairId: pairId}});
  const navigateSetOverview = () => navigate('/SetOverview', {state: {teamId: teamId, pairId: pairId}});

  //GETs players
  useEffect(() => {
    const getPlayers = async () => {
      try{ 
        const queryParams = new URLSearchParams({table: 'player'});
        queryParams.append('pair_id', pairId);

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
  }, [pairId]);


  //takes the JSON from the form and sends it to the server
  const handleFormSubmit = async (formDataJson) => {
    try {
      const response = await fetch('/addmatch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: formDataJson,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
  
      // Handle the response data if needed
      console.log('Server response:', responseData);

      navigateSetOverview();

    } catch (error) {
      // Handle any errors that occurred during the request
      console.error('Error submitting form data:', error.message);
    }
  };

  //html
  return (
    <div id='page-wrapper' className='page-wrapper'>
        <AppHeader masthead='New Match'
          leftButtonNames={['']}
          leftButtonFunctions={[]}
          rightButtonNames={['back to matches']}
          rightButtonFunctions={[navigateMatches]}
        />

        <NewMatchForm onSubmit={handleFormSubmit} teamId={teamId} pairId={pairId} players={players}/>
    </div>

  );
}