import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'

//////////////////
export default function NewPair() {
  const navigate = useNavigate();
  const navigatePairs = () => navigate('/Pairs');

  /* need a comment on what this is doing */
  return (
    <div>
        <p>New pair page</p>
        <BasicButton onClick={navigatePairs} buttonText='back to pairs'></BasicButton>
    </div>
  );
}