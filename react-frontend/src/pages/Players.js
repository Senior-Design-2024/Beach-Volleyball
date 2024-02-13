import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'

//////////////////
export default function Players() {
  const navigate = useNavigate();
  const navigateTeams = () => navigate('/Teams');
  const navigateEditTeam = () => navigate('/EditTeam');
  const navigatePlayerOverview = () => navigate('/PlayerOverview');
  const navigateCreatePlayer = () => navigate('/CreatePlayer');
  const navigatePairs = () => navigate('/Pairs');

  /* need a comment on what this is doing */
  return (
    <div>
        <p>Players page</p>
        <BasicButton onClick={navigateTeams} buttonText='back to teams'></BasicButton>
        <BasicButton onClick={navigateEditTeam} buttonText='edit team'></BasicButton>
        <BasicButton onClick={navigatePlayerOverview} buttonText='player overview'></BasicButton>
        <BasicButton onClick={navigateCreatePlayer} buttonText='create player'></BasicButton>
        <BasicButton onClick={navigatePairs} buttonText='pairs'></BasicButton>
    </div>
  );
}