import { useNavigate, useLocation } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import ServingForm from '../components/ServingForm';

export default function Serving() {
  const location = useLocation();

  const teamId = location.state.teamId;
  const pairId = location.state.pairId;

  const navigate = useNavigate();
  const navigateSetOverview = () => navigate('/SetOverview', {state: {teamId: teamId, pairId: pairId}});
  const navigateRally = () => navigate('/Rally', {state: {teamId: teamId, pairId: pairId}});

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
        <p>Serving page</p>
        <BasicButton onClick={navigateSetOverview} buttonText='back to set overview'></BasicButton>
        <br/>
        <BasicButton onClick={navigateRally} buttonText='rally'></BasicButton>
        <br/>
        <ServingForm onSubmit={handleFormSubmit} />
    </div>
  );
}