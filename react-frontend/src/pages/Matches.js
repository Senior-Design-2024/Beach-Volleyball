import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import { useState } from 'react';

//////////////////
export default function Matches() {
  //TESTING WORK FOR FLASK BACKEND, THIS WILL BE USELESS LATER//
  const [addUserData, setAddUser] = useState({
    username : "test_user",
    email: "test@gmail.com",
  });

  const [addTeamData, setAddTeam] = useState({
    team_name: "test_team",
    email: "test@gmail.com",
  });

  const [addPlayer1Data, setAddPlayer1] = useState({
    player_name: "test_player1",
    team_id: 1,
    description: "test description",
  });

  const [addPlayer2Data, setAddPlayer2] = useState({
    player_name: "test_player2",
    team_id: 1,
    description: "test description",
  })

  const handleAddUser = async () => {
    try {
      const response = await fetch('/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addUserData),
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

  const handleAddTeam = async () => {
    try {
      const response = await fetch('/addteam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addTeamData),
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

  const handleAddPlayer1 = async () => {
    try {
      const response = await fetch('/addplayer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addPlayer1Data),
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

  const handleAddPlayer2 = async () => {
    try {
      const response = await fetch('/addplayer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addPlayer2Data),
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
///////////////////////////////////////////////

  const navigate = useNavigate();
  const navigatePairs = () => navigate('/Pairs');
  const navigateEditPair = () => navigate('/EditPair');
  const navigateMatchStats = () => navigate('/MatchStats');
  const navigateNewMatch = () => navigate('/NewMatch');

  /* need a comment on what this is doing */
  return (
    <div>
        <p>Matches page</p>
        <BasicButton onClick={navigatePairs} buttonText='back to pairs'></BasicButton>
        <br/>
        <BasicButton onClick={navigateEditPair} buttonText='edit pair'></BasicButton>
        <br/>
        <BasicButton onClick={navigateMatchStats} buttonText='match stats'></BasicButton>
        <br/>
        <BasicButton onClick={navigateNewMatch} buttonText='new match'></BasicButton>

        <br/>
        <button onClick={handleAddUser}>adduser</button><br/>
        <button onClick={handleAddTeam}>addteam</button><br/>
        <button onClick={handleAddPlayer1}>addplayer1</button><br/>
        <button onClick={handleAddPlayer2}>addplayer2</button><br/>
    </div>
  );
}