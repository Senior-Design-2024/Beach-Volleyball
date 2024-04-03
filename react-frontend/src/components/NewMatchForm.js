import React, { useState, useEffect } from 'react';

export default function NewMatchForm({onSubmit, teamId, pairId, players}) { 
    const [matchData, setMatchData] = useState({
        team_id: teamId,
        player1_id: 0,
        player2_id: 0,
        pair_id: pairId,

        opponent1_name: '',
        opponent2_name: '',
        opponent1_number: 0,
        opponent2_number: 0,
        venue: '',
        tournament: '',
        court_number: 0,
        flight_number: 0,
        conference: 'unset',
        location: 'unset',
        match_date: '',
        sched_start_time: '',
        strategy: 'unset',
    });

  // Update matchData when players prop changes
  useEffect(() => {
    setMatchData(prevMatchData => ({
      ...prevMatchData,
      player1_id: players.length >= 1 ? players[0].id : 0,
      player2_id: players.length >= 1 ? players[0].id : 0,
    }));
  }, [players]);

    //handles submitting the form
    const handleSubmit = (event) => {
        event.preventDefault();

        const formDataJson = JSON.stringify(matchData);
        
        console.log(formDataJson);

        onSubmit(formDataJson);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        // Update the state when form fields change
        setMatchData(prevState => ({
          ...prevState,
          [name]: value,
        }));
      };

    //html
    return(
        <div>
            <form id='newMatchForm' onSubmit={handleSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label className='label' htmlFor='opponent1_name'>Opponent 1 Name:</label><input type='text' id='opponent1_name' name='opponent1_name' onChange={handleChange}></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='opponent2_name'>Opponent 2 Name:</label><input type='text' id='opponent2_name' name='opponent2_name' onChange={handleChange}></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='opponent1_number'>Opponent 1 #:</label><input type='number' id='opponent1_number' name='opponent1_number' onChange={handleChange}></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='opponent2_number'>Opponent 2 #:</label><input type='number' id='opponent2_number' name='opponent2_number' onChange={handleChange}></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='venue'>Venue:</label><input type='text' id='venue' name='venue' onChange={handleChange}></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='tournament'>Tournament:</label><input type='text' id='tournament' name='tournament' onChange={handleChange}></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='court_number'>Court #:</label><input type='number' id='court_number' name='court_number' onChange={handleChange}></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='flight_number'>Flight #:</label><input type='number' id='flight_number' name='flight_number' onChange={handleChange}></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='conference'>Conference:</label>

                      <input type="radio" name="conferenceList" id="conference" value="conference" onChange={handleChange}/>
                      <label htmlFor="conference">Conference</label>

                      <input type="radio" name="conferenceList" id="non-conference" value="non-conference" onChange={handleChange}/>
                      <label htmlFor="non-conference">Non-Conference</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='location'>Location:</label>

                      <input type="radio" name="locationList" id="home" value="home" onChange={handleChange}/>
                      <label htmlFor="home">Home</label>

                      <input type="radio" name="locationList" id="away" value="away" onChange={handleChange}/>
                      <label htmlFor="away">Away</label>

                      <input type="radio" name="locationList" id="neutral" value="neutral" onChange={handleChange}/>
                      <label htmlFor="neutral">Neutral</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='match_date'>Match Date:</label><input type='date' id='match_date' name='match_date' onChange={handleChange}></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='sched_start_time'>Scheduled Start Time:</label><input type='time' id='sched_start_time' name='sched_start_time' onChange={handleChange}></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='strategy'>Strategy:</label>

                      <input className='inputRadio' type="radio" name="strategyList" id="blocker/defender" value="blocker/defender" onChange={handleChange}/>
                      <label htmlFor="blocker/defender">Blocker/Defender</label>

                      <input className='inputRadio' type="radio" name="strategyList" id="split" value="split" onChange={handleChange}/>
                      <label htmlFor="split">Split</label>

                      <input className='inputRadio' type="radio" name="strategyList" id="unknown" value="unknown" onChange={handleChange}/>
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
          </form>
        </div>
    )
}