import { useNavigate, useLocation } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import RallyForm from '../components/RallyForm';

export default function Rally() {
  const location = useLocation();

  const teamId = location.state.teamId;
  const pairId = location.state.pairId;

  const navigate = useNavigate();
  const navigateSetOverview = () => navigate('/SetOverview', {state: {teamId: teamId, pairId: pairId}});
  const navigateRallyDetails = () => navigate('/RallyDetails', {state: {teamId: teamId, pairId: pairId}});

    //takes the JSON from the form and sends it to the server
    const handleFormSubmit = async (formDataJson) => {
      console.log('Rally form submit has been gutted');
      navigateRallyDetails();
    };

  //html
  return (
    <div>
      <p>Rally page</p>
      <BasicButton onClick={navigateSetOverview} buttonText='back to set overview'></BasicButton>
      <br/>
      <p>Player options</p>
      <br/>
      <RallyForm onSubmit={handleFormSubmit} />
    </div>
  );
}