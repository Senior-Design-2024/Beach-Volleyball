import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'

//////////////////
export default function EditMatch() {
  const navigate = useNavigate();
  const navigateMatchStats = () => navigate('/MatchStats');

  /* need a comment on what this is doing */
  return (
    <div>
        <p>Edit match page</p>
        <BasicButton onClick={navigateMatchStats} buttonText='back to match stats'></BasicButton>
    </div>
  );
}