import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import ServeOrderForm from '../components/ServeOrderForm';

//////////////////
export default function SetOverview() {
  const navigate = useNavigate();
  const navigateNewMatch = () => navigate('/NewMatch');
  const navigateServing = () => navigate('/Serving');
  const navigateReceiving = () => navigate('/Receiving');

  //takes the JSON from the form and sends it to the server
  const handleFormSubmit = async (formDataJson) => {
    try {
      const response = await fetch('/addmatch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataJson),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
  
      // Handle the response data if needed
      console.log('Server response:', responseData);
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error('Error submitting form data:', error.message);
    }
  };

  /* need a comment on what this is doing */
  return (
    <div>
        <p>Set overview page</p>
        <BasicButton onClick={navigateNewMatch} buttonText='back to new match'></BasicButton>
        <br/>
        <BasicButton onClick={navigateServing} buttonText='serving'></BasicButton>
        <br/>
        <BasicButton onClick={navigateReceiving} buttonText='receiving'></BasicButton>
        <br />

        <div>
          Serve Order:
          <ServeOrderForm onSubmit={handleFormSubmit} />
        </div>
    </div>
  );
}