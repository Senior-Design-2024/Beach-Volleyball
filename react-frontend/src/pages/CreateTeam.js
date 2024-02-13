import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'

//////////////////
export default function CreateTeam() {
  const navigate = useNavigate();
  const navigateTeams = () => navigate('/Teams')

  /* need a comment on what this is doing */
  return (
    <div>
      <p>Create team page</p>
      <BasicButton onClick={navigateTeams} buttonText='Back to teams'></BasicButton>
    </div>
  );
}