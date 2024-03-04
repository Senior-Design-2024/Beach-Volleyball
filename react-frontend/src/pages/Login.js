import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'

//////////////////
export default function Login() {
  const navigate = useNavigate();
  const navigateHome = () => navigate('/')
  const navigateTeams = () =>navigate('/Teams')

  /* need a comment on what this is doing */
  return (
    <div>
        <p>Login page</p>
        <BasicButton onClick={navigateHome} buttonText='Back to app home'></BasicButton>
        <br/>
        <BasicButton onClick={navigateTeams} buttonText='Go to teams'></BasicButton>
    </div>
  );
}