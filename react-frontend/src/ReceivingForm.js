import React, { useState } from 'react';

export default function ReceivingForm({onSubmit}) { 
    const [formData, setFormData] = useState({
        serve_location: '',
        serve_type: '',
        pass_rating: '',
        receive_location: '',
        receiving_player: '',
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
            <form id='newUserForm' onSubmit={handleSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor='serve_location'>Serve Location:</label>

                      <input type="radio" name="serve_location" id="sLocation1" value="1" onChange={handleChange}/>
                      <label htmlFor="sLocation1">1</label>

                      <input type="radio" name="serve_location" id="sLocation2" value="2" onChange={handleChange}/>
                      <label htmlFor="sLocation2">2</label>

                      <input type="radio" name="serve_location" id="sLocation3" value="3" onChange={handleChange}/>
                      <label htmlFor="sLocation3">3</label>

                      <input type="radio" name="serve_location" id="sLocation4" value="4" onChange={handleChange}/>
                      <label htmlFor="sLocation4">4</label>

                      <input type="radio" name="serve_location" id="sLocation5" value="5" onChange={handleChange}/>
                      <label htmlFor="sLocation5">5</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor='serve_type'>Serve Type:</label>

                      <input type="radio" name="serve_type" id="top" value="top" onChange={handleChange}/>
                      <label htmlFor="top">Top</label>

                      <input type="radio" name="serve_type" id="float" value="float" onChange={handleChange}/>
                      <label htmlFor="float">Float</label>

                      <input type="radio" name="serve_type" id="german" value="german" onChange={handleChange}/>
                      <label htmlFor="german">German</label>

                      <input type="radio" name="serve_type" id="sidespin" value="sidespin" onChange={handleChange}/>
                      <label htmlFor="sidespin">Sidespin</label>

                      <input type="radio" name="serve_type" id="skyball" value="skyball" onChange={handleChange}/>
                      <label htmlFor="skyball">Skyball</label>

                      <input type="radio" name="serve_type" id="other" value="other" onChange={handleChange}/>
                      <label htmlFor="other">Other</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor='pass_rating'>Serve Rating:</label>

                      <input type="radio" name="pass_rating" id="passError" value="passError" onChange={handleChange}/>
                      <label htmlFor="passError">Pass Error</label>

                      <input type="radio" name="pass_rating" id="pRating1" value="1" onChange={handleChange}/>
                      <label htmlFor="pRating1">1</label>

                      <input type="radio" name="pass_rating" id="pRating2" value="2" onChange={handleChange}/>
                      <label htmlFor="pRating2">2</label>

                      <input type="radio" name="pass_rating" id="pRating3" value="3" onChange={handleChange}/>
                      <label htmlFor="pRating3">3</label>

                      <input type="radio" name="pass_rating" id="serveError" value="serveError" onChange={handleChange}/>
                      <label htmlFor="serveError">Serve Error</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor='receive_location'>Receive Location:</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="radio" name="receive_location" id="rLocation1" value="1" onChange={handleChange}/>
                      <label htmlFor="rLocation1">1</label>

                      <input type="radio" name="receive_location" id="rLocation2" value="2" onChange={handleChange}/>
                      <label htmlFor="rLocation2">2</label>

                      <input type="radio" name="receive_location" id="rLocation3" value="3" onChange={handleChange}/>
                      <label htmlFor="rLocation3">3</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="radio" name="receive_location" id="rLocation4" value="4" onChange={handleChange}/>
                      <label htmlFor="rLocation4">4</label>

                      <input type="radio" name="receive_location" id="rLocation5" value="5" onChange={handleChange}/>
                      <label htmlFor="rLocation5">5</label>

                      <input type="radio" name="receive_location" id="rLocation6" value="6" onChange={handleChange}/>
                      <label htmlFor="rLocation6">6</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="radio" name="receive_location" id="rLocation7" value="7" onChange={handleChange}/>
                      <label htmlFor="rLocation7">7</label>
                    
                      <input type="radio" name="receive_location" id="rLocation8" value="8" onChange={handleChange}/>
                      <label htmlFor="rLocation8">8</label>

                      <input type="radio" name="receive_location" id="rLocation9" value="9" onChange={handleChange}/>
                      <label htmlFor="rLocation9">9</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="radio" name="receiving_player" id="player1" value="player1" onChange={handleChange}/>
                      <label htmlFor="player1">Player 1</label>

                      <input type="radio" name="receiving_player" id="player2" value="player2" onChange={handleChange}/>
                      <label htmlFor="player2">Player 2</label>
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