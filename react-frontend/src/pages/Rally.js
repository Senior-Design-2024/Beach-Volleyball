import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import RallyForm from '../components/RallyForm';

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

    //takes the JSON from the form and sends it to the server
    const handleFormSubmit = async (formDataJson) => {
      try {
        const response = await fetch('/addmatch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataJson),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const responseData = await response.json();
    
        // Handle the response data if needed
        console.log('Server response:', responseData);
      } catch (error) {
        // Handle any errors that occurred during the request
        console.error('Error submitting form data:', error.message);
      }
    };

  /* need a comment on what this is doing */
  return (
    <div>
        <p>Rally page</p>
        <BasicButton onClick={navigateSetOverview} buttonText='back to set overview'></BasicButton>
        <br/>
        <BasicButton onClick={navigateRallyDetails} buttonText='Rally details'></BasicButton>
        <br/>
        <p>player options</p>

        <RallyForm onSubmit={handleFormSubmit} />

        {/*
        <BasicButton onClick={swing} buttonText='swing'></BasicButton>
        <BasicButton onClick={roll} buttonText='roll'></BasicButton>   
        <BasicButton onClick={poke} buttonText='poke'></BasicButton>   
        <BasicButton onClick={bump} buttonText='bump'></BasicButton>   
        <BasicButton onClick={set} buttonText='set'></BasicButton>   
        <BasicButton onClick={dig} buttonText='dig'></BasicButton>   
        <BasicButton onClick={block} buttonText='block'></BasicButton>          
        */}
    </div>
  );
}