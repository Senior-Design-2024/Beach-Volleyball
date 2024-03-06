import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import NewUserForm from '../components/NewUserForm';

//////////////////
export default function NewUser() {
  const navigate = useNavigate();
  const navigateHome = () => navigate('/');

    //takes the JSON from the form and sends it to the server
    const handleFormSubmit = async (formDataJson) => {
      try {
        const response = await fetch('/adduser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: formDataJson,
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
        <p>New user page</p>
        <BasicButton onClick={navigateHome} buttonText='back to app home'></BasicButton>

        <br/>
        <NewUserForm onSubmit={handleFormSubmit}/>
    </div>
  );
}