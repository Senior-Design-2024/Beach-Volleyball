import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'

//////////////////
export default function Matches() {
  const navigate = useNavigate();
  const navigatePairs = () => navigate('/Pairs');
  const navigateEditPair = () => navigate('/EditPair');
  const navigateMatchStats = () => navigate('/MatchStats');
  const navigateNewMatch = () => navigate('/NewMatch');

  /* need a comment on what this is doing */
  return (
    <div>
        <p>Matches page</p>
        <BasicButton onClick={navigatePairs} buttonText='back to pairs'></BasicButton>
        <BasicButton onClick={navigateEditPair} buttonText='edit pair'></BasicButton>
        <BasicButton onClick={navigateMatchStats} buttonText='match stats'></BasicButton>
        <BasicButton onClick={navigateNewMatch} buttonText='new match'></BasicButton>
    </div>
  );
}