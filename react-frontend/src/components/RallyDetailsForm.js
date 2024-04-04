import React, { useState } from 'react';

export default function RallyDetailsForm({onSubmit}) { 
    const [formData, setFormData] = useState({
      quality: null,
    });

    //handles submitting the form
    const handleSubmit = (event) => {
        const formDataJson = JSON.stringify(formData);
        
        console.log(formDataJson);

        onSubmit(formDataJson);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        // Update the state when form fields Change
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
        }));
      };

    //html
    return(
        <div>
            {/* form */}
            <form id='rallyDetailsForm' onSubmit={handleSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor='quality'>quality:</label> 

                      <input type="radio" name="quality" id="0" value="0" onChange={handleChange}/>
                      <label htmlFor="0" style={{width:'50px'}}>ERROR</label>

                      <input type="radio" name="quality" id="1" value="1" onChange={handleChange}/>
                      <label htmlFor="1" style={{width:'50px'}}>1</label>

                      <input type="radio" name="quality" id="2" value="2" onChange={handleChange}/>
                      <label htmlFor="2" style={{width:'50px'}}>2</label>

                      <input type="radio" name="quality" id="3" value="3" onChange={handleChange}/>
                      <label htmlFor="3" style={{width:'50px'}}>3</label>

                      <input type="radio" name="quality" id="4" value="4" onChange={handleChange}/>
                      <label htmlFor="4" style={{width:'50px'}}>KILL</label>
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