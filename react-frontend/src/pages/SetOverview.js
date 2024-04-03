import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import ServeOrderForm from '../components/ServeOrderForm';

export default function SetOverview() {
  const navigate = useNavigate();
  const navigateNewMatch = () => navigate('/NewMatch');
  const navigateServing = () => navigate('/Serving');
  const navigateReceiving = () => navigate('/Receiving');
  const navigateMatchStats = () => navigate('/MatchStats');

  //html
  return (
    <div>
        <p>Set overview page</p>
        <BasicButton onClick={navigateNewMatch} buttonText='back to new match'></BasicButton>
        <br/>
        <BasicButton onClick={navigateMatchStats} buttonText='Match stats' />
        <br/>
        <BasicButton onClick={navigateServing} buttonText='serving'></BasicButton>
        <br/>
        <BasicButton onClick={navigateReceiving} buttonText='receiving'></BasicButton>
        <br />

        <div>
          Serve Order:
          <ServeOrderForm onSubmit={navigateServing} />
        </div>
    </div>
  );
}