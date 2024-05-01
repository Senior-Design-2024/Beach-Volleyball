import React, { useContext } from 'react';
import { UserContext } from './User';
import { postRequest } from '../utils';

export default function NewMatch(props) { 
  const {teamData, matchData, setMatchData} = useContext(UserContext)

  //handles submitting the form
  const handleSubmit = async (event) => {
    event.preventDefault();
    const {id, ...cleanedMatch} = matchData
    const match_id = await postRequest({...cleanedMatch, team_id:teamData.id}, 'add/match')
    
    props.navigateMatch(match_id)
  };

  const handleChange = (event) => {
      const { name, value } = event.target;
      setMatchData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    };

  //html
  return(
      <div id='new-match'>
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

                    <input type="radio" name="conference" id="conference" value="conference" onChange={handleChange}/>
                    <label htmlFor="conference">Conference</label>

                    <input type="radio" name="conference" id="non-conference" value="non-conference" onChange={handleChange}/>
                    <label htmlFor="non-conference">Non-Conference</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className='label' htmlFor='location'>Location:</label>

                    <input type="radio" name="location" id="home" value="home" onChange={handleChange}/>
                    <label htmlFor="home">Home</label>

                    <input type="radio" name="location" id="away" value="away" onChange={handleChange}/>
                    <label htmlFor="away">Away</label>

                    <input type="radio" name="location" id="neutral" value="neutral" onChange={handleChange}/>
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

                    <input className='inputRadio' type="radio" name="strategy" id="blocker/defender" value="blocker/defender" onChange={handleChange}/>
                    <label htmlFor="blocker/defender">Blocker/Defender</label>

                    <input className='inputRadio' type="radio" name="strategy" id="split" value="split" onChange={handleChange}/>
                    <label htmlFor="split">Split</label>

                    <input className='inputRadio' type="radio" name="strategy" id="unknown" value="unknown" onChange={handleChange}/>
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