import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'

//////////////////
export default function NewMatch() {
  const navigate = useNavigate();
  const navigateMatches = () => navigate('/Matches');
  const navigateSetOverview = () => navigate('/SetOverview');

  /* need a comment on what this is doing */
  return (
    <div>
        <p>New match page</p>
        <BasicButton onClick={navigateMatches} buttonText='back to matches'></BasicButton>
        <BasicButton onClick={navigateSetOverview} buttonText='set overview'></BasicButton>
    </div>
  );
}