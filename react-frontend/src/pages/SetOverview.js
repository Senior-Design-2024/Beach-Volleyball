import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'

//////////////////
export default function SetOverview() {
  const navigate = useNavigate();
  const navigateNewMatch = () => navigate('/NewMatch');
  const navigateServing = () => navigate('/Serving');
  const navigateReceiving = () => navigate('/Receiving');

  /* need a comment on what this is doing */
  return (
    <div>
        <p>Set overview page</p>
        <BasicButton onClick={navigateNewMatch} buttonText='back to new match'></BasicButton>
        <BasicButton onClick={navigateServing} buttonText='serving'></BasicButton>
        <BasicButton onClick={navigateReceiving} buttonText='receiving'></BasicButton>
    </div>
  );
}