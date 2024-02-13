import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'

//////////////////
export default function Teams() {
  const navigate = useNavigate();
  const navigateLogin = () => navigate('/Login');
  const navigateEditTeam = () => navigate('/CreateTeam');
  const navigatePlayers = () => navigate('/Players');

  /* need a comment on what this is doing */
  return (
    <div>
        <p>Teams page</p>
        <BasicButton onClick={navigateLogin} buttonText='Back to login'></BasicButton>
        <BasicButton onClick={navigateEditTeam} buttonText='create team'></BasicButton>
        <BasicButton onClick={navigatePlayers} buttonText='select team (to players)'></BasicButton>
    </div>
  );
}