import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'

//////////////////
export default function EditPlayer() {
  const navigate = useNavigate();
  const navigatePlayerOverview = () => navigate('/PlayerOverview');

  /* need a comment on what this is doing */
  return (
    <div>
        <p>Edit player page</p>
        <BasicButton onClick={navigatePlayerOverview} buttonText='back to player overview'></BasicButton>
    </div>
  );
}