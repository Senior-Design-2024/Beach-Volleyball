import React, { useState } from "react";

export default function ServeOrderForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    set_num: null,
    serve_order: [0, 0, 0, 0],
  });

  // handles submitting the form
  const handleSubmit = (event) => {
    event.preventDefault();

    const formDataJson = JSON.stringify(formData);

    console.log(formDataJson);

    onSubmit(formDataJson);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Update the serve_order array based on the input name and value
    if (name.startsWith('serve')) {
      const index = parseInt(name.replace('serve_', ''), 10);
      const newServeOrder = [...formData.serve_order];
      newServeOrder[index - 1] = parseInt(value, 10);
      setFormData((prevState) => ({
        ...prevState,
        serve_order: newServeOrder,
      }));
    } else {
      // Update set_num as an integer
      setFormData((prevState) => ({
        ...prevState,
        set_num: parseInt(value, 10),
      }));
    }
  };

  // Define options for the radio buttons
  const setOptions = [1, 2, 3];

  // HTML
  return (
    <div>
      <form id='newUserForm' onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor='set_num' style={{width: '80px'}}>Set #:</label>

                {/* Map over the options to generate radio buttons */}
                {setOptions.map((option, index) => (
                  <React.Fragment key={index}>
                    <input type="radio" name="set_num" id={`set${option}`} value={option} onChange={handleChange} />
                    <label htmlFor={`set${option}`}>{option}</label>
                  </React.Fragment>
                ))}
              </td>
            </tr>
            {formData.serve_order.map((serve, index) => (
              <tr key={index}>
                <td>
                  <input type='number' id={`serve_${index + 1}`} name={`serve_${index + 1}`} value={serve} onChange={handleChange}></input>
                </td>
              </tr>
            ))}
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