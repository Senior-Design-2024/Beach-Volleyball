import React, { useState } from 'react';

export default function ServeOrderForm({onSubmit}) { 
    const [formData, setFormData] = useState({
        set_number: '',
        serve_first: 0,
        serve_second: 0,
        serve_third: 0,
        serve_fourth: 0,
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
                      <label htmlFor='set_number'>Set #:</label>

                      <input type="radio" name="set_number" id="set1" value="set1" onChange={handleChange}/>
                      <label htmlFor="set1">1</label>

                      <input type="radio" name="set_number" id="set2" value="set2" onChange={handleChange}/>
                      <label htmlFor="set2">2</label>

                      <input type="radio" name="set_number" id="set3" value="set3" onChange={handleChange}/>
                      <label htmlFor="set3">3</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type='number' id='serve_first' name='serve_first' onChange={handleChange}></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                    <input type='number' id='serve_second' name='serve_second' onChange={handleChange}></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                    <input type='number' id='serve_third' name='serve_third' onChange={handleChange}></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                    <input type='number' id='serve_fourth' name='serve_fourth' onChange={handleChange}></input>
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