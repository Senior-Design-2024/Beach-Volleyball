import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import NewMatchForm from '../components/NewMatchForm';
import '../App.css'

//////////////////
export default function NewMatch() {
  //navigations to other pages
  const navigate = useNavigate();
  const navigateMatches = () => navigate('/Matches');
  const navigateSetOverview = () => navigate('/SetOverview');

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
  
      // ... rest of your logic
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error('Error submitting form data:', error.message);
    }
  };

  /* need a comment on what this is doing */
  return (
    <div>
        <p>New match page</p>
        <BasicButton onClick={navigateMatches} buttonText='back to matches'></BasicButton>
        <br/>
        <BasicButton onClick={navigateSetOverview} buttonText='set overview'></BasicButton>

        <div>
          <NewMatchForm onSubmit={handleFormSubmit} />
        </div>
    </div>
  );
}