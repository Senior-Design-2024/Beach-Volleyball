import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import { useState } from 'react';
import NewMatchForm from '../components/NewMatchForm';
import '../App.css'

//////////////////
export default function NewMatch() {
  //function for testing display changes with a button
  const [opponentTeam, setOpponentTeam] = useState('no opponent given');
  const handleClick = () => {
    setOpponentTeam('changed!');
  }

  //navigations to other pages
  const navigate = useNavigate();
  const navigateMatches = () => navigate('/Matches');
  const navigateSetOverview = () => navigate('/SetOverview');

  //takes the JSON from the form and sends it to the server
  const handleFormSubmit = async (formDataJson) => {
    try {
      const response = await fetch('/addmatch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData: formDataJson }),
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

  /* need a comment on what this is doing */
  return (
    <div>
        <p>New match page</p>
        <BasicButton onClick={navigateMatches} buttonText='back to matches'></BasicButton>
        <BasicButton onClick={navigateSetOverview} buttonText='set overview'></BasicButton>

        <div>
          <p>opponent team: {opponentTeam}</p>
          <BasicButton onClick={handleClick} buttonText='set opponent team'></BasicButton>

          <NewMatchForm onSubmit={handleFormSubmit} />
        </div>
    </div>
  );
}