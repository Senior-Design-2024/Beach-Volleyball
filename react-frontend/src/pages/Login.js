import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import LoginForm from '../components/LoginForm';

export default function Login() {
  //navigate buttons
  const navigate = useNavigate();
  const navigateHome = () => navigate('/');
  const navigateLogin = () => navigate('/Login');
  const navigateTeams = () =>navigate('/Teams')

  //handles form submission
  const handleFormSubmit = async (formDataJson) => {
    console.log(formDataJson);
    var formData = JSON.parse(formDataJson);
    console.log(formData);

    try {
      const queryParams = new URLSearchParams({table: 'user'});
      queryParams.append('email', formData.username);

      const response = await fetch(`/find?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('raw response:', response);
      const responseJson = await response.json();
      console.log('json reponse:', responseJson);

      console.log('json[0]', responseJson[0].id);


    } catch (error) {
      console.error('Error with fetchUserId', error);
    }
    //navigateTeams();
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
          There is no functionality or security implemented for this form<br/>
          Clicking submit will progress you to the teams page as if the user successfully logged in
        </p>
    </div>
  );
}