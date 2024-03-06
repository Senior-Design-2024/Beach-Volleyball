import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import ReceivingForm from '../ReceivingForm';

//////////////////
export default function Receiving() {
  const navigate = useNavigate();
  const navigateSetOverview = () => navigate('/NewMatch');
  const navigateRally = () => navigate('/Rally');

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
        <p>Receiving page</p>
        <BasicButton onClick={navigateSetOverview} buttonText='back to set overview'></BasicButton>
        <br/>
        <BasicButton onClick={navigateRally} buttonText='rally'></BasicButton>
        <br/>
        <ReceivingForm onSubmit={handleFormSubmit} />
    </div>
  );
}