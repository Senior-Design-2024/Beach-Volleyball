import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'

//////////////////
export default function EditPair() {
  const navigate = useNavigate();
  const navigateMatches = () => navigate('/Matches');

  /* need a comment on what this is doing */
  return (
    <div>
        <p>Edit pair page</p>
        <BasicButton onClick={navigateMatches} buttonText='back to matches'></BasicButton>
    </div>
  );
}