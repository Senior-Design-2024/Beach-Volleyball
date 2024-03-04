import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'

//////////////////
export default function Pairs() {
  const navigate = useNavigate();
  const navigatePlayers = () => navigate('/Players');
  const navigateNewPair = () => navigate('/NewPair');
  const navigateMatches = () => navigate('/Matches');

  /* need a comment on what this is doing */
  return (
    <div>
        <p>Pairs page</p>
        <BasicButton onClick={navigatePlayers} buttonText='back to players'></BasicButton>
        <br/>
        <BasicButton onClick={navigateNewPair} buttonText='new pair'></BasicButton>
        <br/>
        <BasicButton onClick={navigateMatches} buttonText='matches'></BasicButton>
    </div>
  );
}