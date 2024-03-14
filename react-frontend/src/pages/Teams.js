import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import UserHeader from '../components/UserHeader';

export default function Teams() {
  const navigate = useNavigate();
  const navigateLogin = () => navigate('/Login');
  const navigateEditTeam = () => navigate('/CreateTeam');
  const navigatePlayers = () => navigate('/Players');

  //html
  return (
    <div id='page-wrapper' className='wrapper'>
      <UserHeader/>
      <h1>Hi!</h1>
      <BasicButton onClick={navigateLogin} buttonText='Back to login'></BasicButton>
      <br/>
      <BasicButton onClick={navigateEditTeam} buttonText='create team'></BasicButton>
      <br/>
      <BasicButton onClick={navigatePlayers} buttonText='select team (to players)'></BasicButton>
    </div>
  );
}