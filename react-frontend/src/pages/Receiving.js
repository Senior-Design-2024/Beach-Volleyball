import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'

//////////////////
export default function Receiving() {
  const navigate = useNavigate();
  const navigateSetOverview = () => navigate('/NewMatch');
  const navigateRally = () => navigate('/Rally');

  /* need a comment on what this is doing */
  return (
    <div>
        <p>Receiving page</p>
        <BasicButton onClick={navigateSetOverview} buttonText='back to set overview'></BasicButton>
        <br/>
        <BasicButton onClick={navigateRally} buttonText='rally'></BasicButton>
    </div>
  );
}