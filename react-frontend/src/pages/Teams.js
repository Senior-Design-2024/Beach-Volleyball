import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import AppHeader from '../components/AppHeader';

export default function Teams() {
  const navigate = useNavigate();
  const navigateHome = () => navigate('/');
  const navigateCreateTeam = () => navigate('/CreateTeam');
  const navigatePlayers = () => navigate('/Players');

  //html
  return (
    <div id='page-wrapper' className='wrapper'>
      <AppHeader masthead={'Welcome!'}
        leftButtonNames={['Create Team']} 
        leftButtonFunctions={[navigateCreateTeam]}
        rightButtonNames={['Logout']}
        rightButtonFunctions={[navigateHome]}/>
      <BasicButton onClick={navigatePlayers} buttonText='select teams (to players)'></BasicButton>
    </div>
  );
}