import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'

//////////////////
export default function Rally() {
  const navigate = useNavigate();
  const navigateSetOverview = () => navigate('/SetOverview');
  const navigateRallyDetails = () => navigate('/RallyDetails');
  const swing = () => console.log('swing');
  const roll = () => console.log('roll');
  const poke = () => console.log('poke');
  const bump = () => console.log('bump');
  const set = () => console.log('set');
  const dig = () => console.log('dig');
  const block = () => console.log('block');

  /* need a comment on what this is doing */
  return (
    <div>
        <p>Rally page</p>
        <BasicButton onClick={navigateSetOverview} buttonText='back to set overview'></BasicButton>
        <BasicButton onClick={navigateRallyDetails} buttonText='Rally details'></BasicButton>
        <p>player options</p>
        <BasicButton onClick={swing} buttonText='swing'></BasicButton>
        <BasicButton onClick={roll} buttonText='roll'></BasicButton>   
        <BasicButton onClick={poke} buttonText='poke'></BasicButton>   
        <BasicButton onClick={bump} buttonText='bump'></BasicButton>   
        <BasicButton onClick={set} buttonText='set'></BasicButton>   
        <BasicButton onClick={dig} buttonText='dig'></BasicButton>   
        <BasicButton onClick={block} buttonText='block'></BasicButton>          
    </div>
  );
}