import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import LoginForm from '../components/LoginForm';

export default function Login() {
  //navigate buttons
  const navigate = useNavigate();
  const navigateHome = () => navigate('/');
  const navigateLogin = () => navigate('/Login');
  const navigateTeams = (id) => navigate('/Teams', {state: { userId: id}});

  //handles form submission
  const handleFormSubmit = async (formDataJson) => {
    try {
      //construct params for GET request
      var formData = JSON.parse(formDataJson);
      
      const queryParams = new URLSearchParams({table: 'user'});
      queryParams.append('email', formData.username);

      //GET request /find API call
      const response = await fetch(`/find?${queryParams}`, {
        method: 'GET',
      });

      //convert response to JSON
      const responseJson = await response.json();

      //check if responseJson array is not empty and contains the expected data structure
      if (responseJson && responseJson.length > 0 && responseJson[0].id) {
        console.log('json[0].id', responseJson[0].id);

        //navigate to Teams passing userId
        navigateTeams(responseJson[0].id);
      } else {
        console.error('Invalid or empty response data');
      }

    } catch (error) {
      console.error('Error with fetchUserId', error);
    }
  };


  //html
  return (
    <div id='page-wrapper' className='page-wrapper'>
      <AppHeader masthead={'Beach Volleyball Stats App'}
        leftButtonNames={['Home']} 
        leftButtonFunctions={[navigateHome]}
        rightButtonNames={['Login']}
        rightButtonFunctions={[navigateLogin]}/>

        <h1>login page</h1>
        <LoginForm onSubmit={handleFormSubmit}/>
        <p>
          *dev notes*<br/>
          There is no security implemented for this form<br/>
          Just enter your email into the username section<br/>
          Clicking submit will progress you to the teams page as if the user successfully logged in
        </p>
    </div>
  );
}