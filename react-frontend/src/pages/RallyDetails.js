import { useNavigate, useLocation } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import RallyDetailsForm from '../components/RallyDetailsForm';

export default function RallyDetails() {
  const location = useLocation();

  const teamId = location.state.teamId;
  const pairId = location.state.pairId;

  const navigate = useNavigate();
  const navigateRally = () => navigate('/Rally', {state: {teamId: teamId, pairId: pairId}});

  //html
  return (
    <div>
      <p>Rally details</p>
      <RallyDetailsForm onSubmit={navigateRally}/>
    </div>
  );
}