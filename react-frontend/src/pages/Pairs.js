import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'

//////////////////
export default function Pairs() {
  const navigate = useNavigate();
  const navigatePlayers = () => navigate('/Players');
  const navigateNewPair = () => navigate('/NewPair');

  /* need a comment on what this is doing */
  return (
    <div>
        <p>Pairs page</p>
        <BasicButton onClick={navigatePlayers} buttonText='back to players'></BasicButton>
        <BasicButton onClick={navigateNewPair} buttonText='new pair'></BasicButton>
    </div>
  );
}