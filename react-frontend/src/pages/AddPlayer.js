import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'

export default function AddPlayer() {
  const navigate = useNavigate();
  const navigatePlayers = () => navigate('/Players');

  //html
  return (
    <div>
        <p>Create player page</p>
        <BasicButton onClick={navigatePlayers} buttonText='back to players'></BasicButton>
    </div>
  );
}