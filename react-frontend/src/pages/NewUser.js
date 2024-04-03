import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import NewUserForm from '../components/NewUserForm';

export default function NewUser() {
  const navigate = useNavigate();
  const navigateHome = () => navigate('/');
  const navigateNewUser = () => navigate('/NewUser');
  const navigateLogin = () => navigate('/Login');

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
          const responseData = await response.json();
          console.log(responseData);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const responseData = await response.json();
    
        // Handle the response data if needed
        console.log('Server response:', responseData);

        navigateLogin();
  
      } catch (error) {
        // Handle any errors that occurred during the request
        console.error('Error submitting form data:', error.message);
      }
    };

  //html
  return (
    <div id='page-wrapper' className='page-wrapper'>
      <AppHeader masthead={'Beach Volleyball Stats App'}
        leftButtonNames={['Home', 'Create Account']}
        leftButtonFunctions={[navigateHome, navigateNewUser]}
        rightButtonNames={['Login']}
        rightButtonFunctions={[navigateLogin]}/>

        <NewUserForm onSubmit={handleFormSubmit}/>
    </div>
  );
}