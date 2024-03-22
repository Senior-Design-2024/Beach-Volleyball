import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import AddTeamForm from '../components/AddTeamForm';

export default function AddTeam() {
  const navigate = useNavigate();
  const navigateTeams = () => navigate('/Teams')

  //handles form submission
  const handleFormSubmit = (formDataJson) => {
    navigateTeams();
  };

  //html
  return (
    <div id='page-wrapper' className='page-wrapper'>
      <AppHeader masthead={'Add Team'}
        leftButtonNames={['Teams']} 
        leftButtonFunctions={[navigateTeams]}
      />
      <AddTeamForm onSubmit={handleFormSubmit}/>
      <p>
        *dev notes*<br/>
        There is no functionality or security implemented for this form<br/>
        Clicking submit will progress you
      </p>
    </div>
  );
}