import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import AppHeader from '../components/AppHeader';

//////////////////
export default function Login() {
  //navigate buttons
  const navigate = useNavigate();
  const navigateTeams = () =>navigate('/Teams')

  //html
  return (
    <div id='page-wrapper'>
      <AppHeader/>
        <h1>login page</h1>
        <BasicButton onClick={navigateTeams} buttonText='Go to teams'></BasicButton>
    </div>
  );
}