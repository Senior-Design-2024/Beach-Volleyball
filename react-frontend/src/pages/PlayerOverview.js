import { useNavigate, useLocation } from 'react-router-dom';
import AppHeader from '../components/AppHeader';

export default function PlayerOverview() {
const location = useLocation();
const teamId = location.teamId;

  const navigate = useNavigate();
  const navigatePlayers = () => navigate('/Players', {state: {teamId: teamId}});
  const navigateEditPlayer = () => navigate('/EditPlayer')

  //html
  return (
    <div id='page-wrapper' className='page-wrapper'>
      <AppHeader masthead={'pwayer name'}
        leftButtonNames={['Edit player']}
        leftButtonFunctions={[navigateEditPlayer]}
        rightButtonNames={['Back to players']}
        rightButtonFunctions={[navigatePlayers]}
      />
    </div>
  );
}