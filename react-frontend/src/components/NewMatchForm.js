import React, { useState } from 'react';

export default function NewMatchForm({onSubmit}) { 
    const [formData, setFormData] = useState({
        opponentOneName: '',
        opponentTwoName: '',
        opponentOneNumber: '',
        opponentTwoNumber: '',
        venue: '',
        tournament: '',
        courtNumber: '',
        flightNumber: '',
        conference: '0',
        location: '0',
        matchDate: '',
        scheduledStartDate: '',
        strategy: '0',
    });

    //handles submitting the form
    const handleSubmit = (event) => {
        event.preventDefault();

        const formDataJson = JSON.stringify(formData);
        
        console.log(formDataJson);

        onSubmit(formDataJson);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        // Update the state when form fields change
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
        }));
      };

    //html
    return(
        <div>
            {/* form */}
            <form id='newMatchForm' onSubmit={handleSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label className='label' htmlFor='opponentOneName'>Opponent 1 Name:</label><input type='text' id='opponentOneName' name='opponentOneName' onChange={handleChange}></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='opponentTwoName'>Opponent 2 Name:</label><input type='text' id='opponentTwoName' name='opponentTwoName' onChange={handleChange}></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='opponentOneNumber'>Opponent 1 #:</label><input type='text' id='opponentOneNumber' name='opponentOneNumber' onChange={handleChange}></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='opponentTwoNumber'>Opponent 2 #:</label><input type='text' id='opponentTwoNumber' name='opponentTwoNumber' onChange={handleChange}></input>
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
                      <label className='label' htmlFor='courtNumber'>Court Number:</label><input type='text' id='courtNumber' name='courtNumber' onChange={handleChange}></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='flightNumber'>Flight Number:</label><input type='text' id='flightNumber' name='flightNumber' onChange={handleChange}></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='conference'>Conference:</label>

                      <input type="radio" name="conferenceList" id="conference" value="1" onChange={handleChange}/>
                      <label htmlFor="conference">Conference</label>

                      <input type="radio" name="conferenceList" id="non-conference" value="2" onChange={handleChange}/>
                      <label htmlFor="non-conference">Non-Conference</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='location'>Location:</label>

                      <input type="radio" name="locationList" id="home" value="1" onChange={handleChange}/>
                      <label htmlFor="home">Home</label>

                      <input type="radio" name="locationList" id="away" value="2" onChange={handleChange}/>
                      <label htmlFor="away">Away</label>

                      <input type="radio" name="locationList" id="neutral" value="3" onChange={handleChange}/>
                      <label htmlFor="neutral">Neutral</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='date'>Match Date:</label><input type='date' id='date' name='date' onChange={handleChange}></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='scheduledStartTime'>Scheduled Start Time:</label><input type='time' id='scheduleStartTime' name='scheduledStartTime' onChange={handleChange}></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className='label' htmlFor='strategy'>Strategy:</label>

                      <input className='inputRadio' type="radio" name="strategyList" id="blocker/defender" value="1" onChange={handleChange}/>
                      <label htmlFor="blocker/defender">Blocker/Defender</label>

                      <input className='inputRadio' type="radio" name="strategyList" id="split" value="2" onChange={handleChange}/>
                      <label htmlFor="split">Split</label>

                      <input className='inputRadio' type="radio" name="strategyList" id="unknown" value="3" onChange={handleChange}/>
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