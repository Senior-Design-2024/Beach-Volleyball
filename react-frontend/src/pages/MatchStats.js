import { useNavigate, useLocation } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import MatchStatsTable from '../components/MatchStatsTable';
import AppHeader from '../components/AppHeader';

export default function MatchStats() {
  const location = useLocation();

  const teamId = location.state.teamId;
  const pairId = location.state.pairId;
  const matchId = location.state.matchId;

  const navigate = useNavigate();
  const navigateMatches = () => navigate('/Matches', {state: {teamId: teamId, pairId: pairId}});
  const navigateEditMatch = () => navigate('/EditMatch');

  //html
  return (
    <div id='page-wrapper' className='page-wrapper'>
      <AppHeader masthead='Match stats'
        leftButtonNames={['Edit match']}
        leftButtonFunctions={[navigateEditMatch]}
        rightButtonNames={['back to matches']}
        rightButtonFunctions={[navigateMatches]}
      />
    </div>
  );
}