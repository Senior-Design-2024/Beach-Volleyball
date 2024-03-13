import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import AppHeader from '../components/AppHeader';
import LoginForm from '../components/LoginForm';

export default function Login() {
  //navigate buttons
  const navigate = useNavigate();
  const navigateTeams = () =>navigate('/Teams')

  //handles form submission
  const handleFormSubmit = (formDataJson) => {
    navigateTeams();
  };

  //html
  return (
    <div id='page-wrapper'>
      <AppHeader/>
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