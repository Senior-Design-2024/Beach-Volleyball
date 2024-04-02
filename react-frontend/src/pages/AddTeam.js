import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import AddTeamForm from '../components/AddTeamForm';

export default function AddTeam() {
  const location = useLocation();

  const userId = location.state.userId;

  //takes the JSON from the form and sends it to the server
  const handleFormSubmit = async (formDataJson) => {
    try {
      const response = await fetch('/addteam', {
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
  
      // ... rest of your logic
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error('Error submitting form data:', error.message);
    }
  };

  const navigate = useNavigate();
  const navigateTeams = (id) => navigate('/Teams', {state: { userId: userId}});

  //html
  return (
    <div id='page-wrapper' className='page-wrapper'>
      <AppHeader masthead={'Add Team'}
        leftButtonNames={['Teams']} 
        leftButtonFunctions={[navigateTeams]}
      />
      <AddTeamForm onSubmit={handleFormSubmit}/>
      <p>
        *dev notes*<br/>
        There is no functionality or security implemented for this form<br/>
        Clicking submit will progress you
      </p>
    </div>
  );
}