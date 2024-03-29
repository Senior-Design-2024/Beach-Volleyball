import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';

export default function EditTeam() {
  const navigate = useNavigate();
  const navigatePlayers = () => navigate('/Players')

  //html
  return (
    <div id='page-wrapper' className='page-wrapper'>
      <AppHeader masthead='Edit default team name'
        rightButtonNames={['Back to players']}
        rightButtonFunctions={[navigatePlayers]}
      />
      <p>thinking about just generalizing add team and edit team page</p>
    </div>
  );
}