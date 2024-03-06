import React, { useState } from 'react';

export default function ServingForm({onSubmit}) { 
    const [formData, setFormData] = useState({
        serve_location: '',
        serve_type: '',
        serve_rating: '',
        receive_location: '',
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
                      <label htmlFor='serve_rating'>Serve Rating:</label>

                      <input type="radio" name="serve_rating" id="error" value="error" onChange={handleChange}/>
                      <label htmlFor="error">Error</label>

                      <input type="radio" name="serve_rating" id="sRating1" value="1" onChange={handleChange}/>
                      <label htmlFor="sRating1">1</label>

                      <input type="radio" name="serve_rating" id="sRating2" value="2" onChange={handleChange}/>
                      <label htmlFor="sRating2">2</label>

                      <input type="radio" name="serve_rating" id="sRating3" value="3" onChange={handleChange}/>
                      <label htmlFor="sRating3">3</label>

                      <input type="radio" name="serve_rating" id="ace" value="ace" onChange={handleChange}/>
                      <label htmlFor="ace">ACE</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor='receive_location'>Recieve Location:</label>
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
                    <input type="radio" name="receive_location" id="net" value="net" onChange={handleChange}/>
                      <label htmlFor="net">net</label>

                      <input type="radio" name="receive_location" id="wideRight" value="wideRight" onChange={handleChange}/>
                      <label htmlFor="wideRight">Wide Right</label>

                      <input type="radio" name="receive_location" id="wideLeft" value="wideLeft" onChange={handleChange}/>
                      <label htmlFor="wideLeft">Wide Left</label>

                      <input type="radio" name="receive_location" id="long" value="changevalue" onChange={handleChange}/>
                      <label htmlFor="long">Long</label>
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