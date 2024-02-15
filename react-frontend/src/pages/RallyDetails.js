import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'

//////////////////
export default function RallyDetails() {
  const navigate = useNavigate();
  const navigateRally = () => navigate('/Rally');

  /* need a comment on what this is doing */
  return (
    <div>
        <p>Rally details page</p>
        <BasicButton onClick={navigateRally} buttonText='rally'></BasicButton>
    </div>
  );
}