import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'

//////////////////
export default function PlayerOverview() {
  const navigate = useNavigate();
  const navigatePlayers = () => navigate('/Players');
  const navigateEditPlayer = () => navigate('/EditPlayer')

  /* need a comment on what this is doing */
  return (
    <div>
        <p>Player overview page</p>
        <BasicButton onClick={navigatePlayers} buttonText='back to players'></BasicButton>
        <BasicButton onClick={navigateEditPlayer} buttonText='edit player'></BasicButton>
    </div>
  );
}