import { useNavigate, useLocation } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import AddPlayerForm from '../components/AddPlayerForm';

export default function AddPlayer() {
  const location = useLocation();

  const teamId = location.state.teamId;
  //navigation
  const navigate = useNavigate();
  const navigatePlayers = () => navigate('/Players', {state: {teamId: teamId}});

  //handles form submission
  const handleFormSubmit = async (formDataJson) => {
    try {
      const response = await fetch('/addplayer', {
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

    navigatePlayers();
  };

  //html
  return (
    <div id='page-wrapper' className='page-wrapper'>
      <AppHeader masthead='Add Player'
        leftButtonNames={['']}
        leftButtonFunctions={[]}
        rightButtonNames={['Back to players']}
        rightButtonFunctions={[navigatePlayers]}
      />
      <AddPlayerForm onSubmit={handleFormSubmit} teamId={teamId}/>
      {/*
      <p>
        *dev notes*<br/>
        There is no functionality or security implemented for this form<br/>
        Clicking submit will progress you
      </p>
  */}
    </div>
  );
}