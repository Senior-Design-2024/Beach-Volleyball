import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'

//////////////////
export default function MatchStats() {
  const navigate = useNavigate();
  const navigateMatches = () => navigate('/Matches');
  const navigateEditMatch = () => navigate('/EditMatch');

  /* need a comment on what this is doing */
  return (
    <div>
        <p>Match stats page</p>
        <BasicButton onClick={navigateMatches} buttonText='back to matches'></BasicButton>
        <BasicButton onClick={navigateEditMatch} buttonText='edit match'></BasicButton>
    </div>
  );
}