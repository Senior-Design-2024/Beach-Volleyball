import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'

//////////////////
export default function CreatePlayer() {
  const navigate = useNavigate();
  const navigatePlayers = () => navigate('/Players');

  /* need a comment on what this is doing */
  return (
    <div>
        <p>Create player page</p>
        <BasicButton onClick={navigatePlayers} buttonText='back to players'></BasicButton>
    </div>
  );
}