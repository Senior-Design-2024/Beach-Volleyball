import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppHeader from '../components/AppHeader';
import AddPairForm from '../components/AddPairForm';

export default function NewPair() {
  const location = useLocation();

  const teamId = location.state.teamId;
  const [players, setPlayers] = useState([]);

  const navigate = useNavigate();
  const navigatePairs = () => navigate('/Pairs', {state: {teamId: teamId}});

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


  //handles form submission
  const handleFormSubmit = async (formDataJson) => {
    try {
      console.log(formDataJson);
      const response = await fetch('/addpair', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: formDataJson,
      });

      if(!response.ok) {
        throw new Error( `Http error! Status: ${response.status}`);
      }

      console.log(response);

    } catch (error) {
      console.error('Error submitting form data:', error.message);
    }

    navigatePairs();
  };

  //html
  return (
    <div id='page-wrapper' className='page-wrapper'>
        <AppHeader masthead='New pair'
          leftButtonNames={['']}
          leftButtonFunctions={[]}
          rightButtonNames={['back to pairs']}
          rightButtonFunctions={[navigatePairs]}
        />

        <AddPairForm onSubmit={handleFormSubmit} teamId={teamId} players={players}/>
    </div>
  );
}