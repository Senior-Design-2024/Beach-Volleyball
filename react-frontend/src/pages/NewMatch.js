import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import { useState } from 'react';
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

  //page state
  /*
  const [opponentOneName, setOpponentOneName] = useState('');
  const onChangeOON = (event) => {
    setOpponentOneName(event.target.value);
  }
  */

  function handleNewMatchFormSubmit(event) {
    event.preventDefault();
    
    convertToJson();
  }

  function convertToJson() {
    // Get form element
    var form = document.getElementById('newMatchForm');

    // Create FormData object to easily access form data
    var formData = new FormData(form);

    // Convert FormData to JSON
    var jsonData = {};
    formData.forEach(function(value, key){
        jsonData[key] = value;
    });

    // Log the resulting JSON object
    console.log(jsonData);

    // Optionally, you can perform further actions with the JSON data, such as sending it to a server using AJAX.
    return(formData);
}

  /* need a comment on what this is doing */
  return (
    <div>
        <p>New match page</p>
        <BasicButton onClick={navigateMatches} buttonText='back to matches'></BasicButton>
        <BasicButton onClick={navigateSetOverview} buttonText='set overview'></BasicButton>

        <div>
          <p>opponent team: {opponentTeam}</p>
          <BasicButton onClick={handleClick} buttonText='set opponent team'></BasicButton>

            {/* form */}
            <form id='newMatchForm' onSubmit={handleNewMatchFormSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label className='label' htmlFor='opponentOneName'>Opponent 1 Name:</label><input type='text' id='opponentOneName' name='opponentOneName'></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='opponentTwoName'>Opponent 2 Name:</label><input type='text' id='opponentTwoName' name='opponentTwoName'></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='opponentOneNumber'>Opponent 1 #:</label><input type='text' id='opponentOneNumber' name='opponentOneNumber'></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='opponentTwoNumber'>Opponent 2 #:</label><input type='text' id='opponentTwoNumber' name='opponentTwoNumber'></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='venue'>Venue:</label><input type='text' id='venue' name='venue'></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='tournament'>Tournament:</label><input type='text' id='tournament' name='tournament'></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='courtNumber'>Court Number:</label><input type='text' id='courtNumber' name='courtNumber'></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='flightNumber'>Flight Number:</label><input type='text' id='flightNumber' name='flightNumber'></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='conference'>Conference:</label>

                      <input type="radio" name="conferenceList" id="conference" value="1"/>
                      <label htmlFor="conference">Conference</label>

                      <input type="radio" name="conferenceList" id="non-conference" value="2"/>
                      <label htmlFor="non-conference">Non-Conference</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='location'>Location:</label>

                      <input type="radio" name="locationList" id="home" value="1"/>
                      <label htmlFor="home">Home</label>

                      <input type="radio" name="locationList" id="away" value="2"/>
                      <label htmlFor="away">Away</label>

                      <input type="radio" name="locationList" id="neutral" value="3"/>
                      <label htmlFor="neutral">Neutral</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='date'>Match Date:</label><input type='date' id='date' name='date'></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='scheduledStartTime'>Scheduled Start Time:</label><input type='time' id='scheduleStartTime' name='scheduledStartTime'></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='strategy'>Strategy:</label>

                      <input className='inputRadio' type="radio" name="strategyList" id="blocker/defender" value="1"/>
                      <label htmlFor="blocker/defender">Blocker/Defender</label>

                      <input className='inputRadio' type="radio" name="strategyList" id="split" value="2"/>
                      <label htmlFor="split">Split</label>

                      <input className='inputRadio' type="radio" name="strategyList" id="unknown" value="3"/>
                      <label htmlFor="unknown">Unknown</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="submit"></input>
                    </td>
                  </tr>
                </tbody>
              </table>



              {/*
              <tr><label className='label' for='opponentOneName'>Opponent 1 Name:</label><input type='text' id='opponentOneName' name='opponentOneName'></input></tr><br/>
              <tr><label className='label' for='opponentTwoName'>Opponent 2 Name:</label><input type='text' id='opponentTwoName' name='opponentTwoName'></input></tr><br/>
              <tr><label className='label' for='opponentOneNumber'>Opponent 1 #:</label><input type='text' id='opponentOneNumber' name='opponentOneNumber'></input></tr><br/>
              <tr><label className='label' for='opponentTwoNumber'>Opponent 2 #:</label><input type='text' id='opponentTwoNumber' name='opponentTwoNumber'></input></tr><br/>
              <tr><label className='label' for='venue'>Venue:</label><input type='text' id='Venue' name='Venue'></input></tr><br/>
              <tr><label className='label' for='tournament'>Tournament:</label><input type='text' id='tournament' name='tournament'></input></tr><br/>
              <tr><label className='label' for='courtNumber'>Court Number:</label><input type='text' id='courtNumber' name='courtNumber'></input></tr><br/>
              <tr><label className='label' for='flightNumber'>Flight Number:</label><input type='text' id='flightNumber' name='flightNumber'></input></tr><br/>
              <tr>
                <label className='label' for='conference'>Conference:</label>
                <input type="radio" name="conferenceList" id="conference" value="conference"/>
                <label for="conference">Conference</label>

                <input type="radio" name="conferenceList" id="non-conference" value="non-conference"/>
                <label for="non-conference">Non-Conference</label>
              </tr><br/>
              <tr>
                <label className='label' for='location'>Location:</label>
                <input type="radio" name="locationList" id="home" value="home"/>
                <label for="home">Home</label>

                <input type="radio" name="locationList" id="away" value="away"/>
                <label for="away">Away</label>

                <input type="radio" name="locationList" id="neutral" value="neutral"/>
                <label for="neutral">Neutral</label>
              </tr><br/>
              <tr><label className='label' for='date'>Match Date:</label><input type='date' id='date' name='date'></input></tr><br/>
              <tr><label className='label' for='scheduledStartTime'>Scheduled Start Time:</label><input type='time' id='scheduleStartTime' name='scheduledStartTime'></input></tr><br/>
              <tr>
                <label className='label' for='strategy'>Strategy:</label>
                <input className='inputRadio' type="radio" name="strategyList" id="blocker/defender" value="blocker/defender"/>
                <label for="blocker/defender">Blocker/Defender</label>

                <input className='inputRadio' type="radio" name="strategyList" id="split" value="split"/>
                <label for="split">Split</label>

                <input className='inputRadio' type="radio" name="strategyList" id="unknown" value="unknown"/>
                <label for="unknown">Unknown</label>
              </tr><br/>
              <input type="submit"></input>
  */}
          </form>
        </div>
    </div>
  );
}