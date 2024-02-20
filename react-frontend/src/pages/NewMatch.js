import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import { useState } from 'react';
import '../App.css'

//////////////////
export default function NewMatch() {
  const [opponentTeam, setOpponentTeam] = useState('no opponent given');
  const handleClick = () =>{
    setOpponentTeam('changed!');
  }

  const navigate = useNavigate();
  const navigateMatches = () => navigate('/Matches');
  const navigateSetOverview = () => navigate('/SetOverview');

  /* need a comment on what this is doing */
  return (
    <div>
        <p>New match page</p>
        <BasicButton onClick={navigateMatches} buttonText='back to matches'></BasicButton>
        <BasicButton onClick={navigateSetOverview} buttonText='set overview'></BasicButton>
        <div>
          <p>opponent team: {opponentTeam}</p>
          <BasicButton onClick={handleClick} buttonText='set opponent team'></BasicButton>

            <form>
              <tr><label className='label' for='opponentOneName'>Opponent 1 Name:</label><input type='text' id='opponentOneName' name='opponentOneName'></input></tr><br/>
              <tr><label className='label' for='opponentTwoName'>Opponent 2 Name:</label><input type='text' id='opponentTwoName' name='opponentTwoName'></input></tr><br/>
              <tr><label className='label' for='opponentOneNumber'>Opponent 1 #:</label><input type='text' id='opponentOneNumber' name='opponentOneNumber'></input></tr><br/>
              <tr><label className='label' for='opponentTwoNumber'>Opponent 2 #:</label><input type='text' id='opponentTwoNumber' name='opponentTwoNumber'></input></tr><br/>
              <tr><label className='label' for='venue'>Venue:</label><input type='text' id='Venue' name='Venue'></input></tr><br/>
              <tr><label className='label' for='tournament'>Tournament:</label><input type='text' id='tournament' name='tournament'></input></tr><br/>
              <tr><label className='label' for='courtNumber'>Court Number:</label><input type='text' id='courtNumber' name='courtNumber'></input></tr><br/>
              <tr><label className='label' for='flightNumber'>Flight Number:</label><input type='text' id='flightNumber' name='flightNumber'></input></tr><br/>
              <tr><label className='label' for='conference'>Conference:</label><input type='text' id='conference' name='conference'></input></tr><br/>
              <tr><label className='label' for='location'>Location:</label><input type='text' id='location' name='location'></input></tr><br/>
              <tr><label className='label' for='date'>Match Date:</label><input type='text' id='date' name='date'></input></tr><br/>
              <tr><label className='label' for='scheduledStartTime'>Scheduled Start Time:</label><input type='text' id='scheduleStartTime' name='scheduledStartTime'></input></tr><br/>
              <tr><label className='label' for='strategy'>Strategy</label><input type='text' id='strategy' name='strategy'></input></tr><br/>
          </form>
        </div>
    </div>
  );
}