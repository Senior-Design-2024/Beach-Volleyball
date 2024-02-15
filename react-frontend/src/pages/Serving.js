import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'

//////////////////
export default function Serving() {
  const navigate = useNavigate();
  const navigateSetOverview = () => navigate('/SetOverview');
  const navigateRally = () => navigate('/Rally');

  /* need a comment on what this is doing */
  return (
    <div>
        <p>Serving page</p>
        <BasicButton onClick={navigateSetOverview} buttonText='back to set overview'></BasicButton>
        <BasicButton onClick={navigateRally} buttonText='rally'></BasicButton>
    </div>
  );
}