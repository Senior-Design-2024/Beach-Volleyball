import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import ServeOrderForm from '../components/ServeOrderForm';

export default function SetOverview() {
  const location = useLocation();

  const teamId = location.state.teamId;
  const pairId = location.state.pairId;
  
  const [serveOrder, setServeOrder] = useState([null, null, null, null]);
  
  const navigate = useNavigate();
  const navigateNewMatch = () => navigate('/NewMatch', {state: {teamId: teamId, pairId: pairId}});
  const navigateServing = () => navigate('/Serving', {state: {teamId: teamId, pairId: pairId}});
  const navigateReceiving = () => navigate('/Receiving', {state: {teamId: teamId, pairId: pairId}});

  const handleServeOrderSubmit = () => {
    console.log(serveOrder);
    if(serveOrder[0] === 1 || serveOrder === 2){
      navigateServing();
    } else {
      navigateReceiving();
    }
  }
  
  const handleServeOrderChange = (newServeOrder) => {
    setServeOrder(newServeOrder)
  }

  //html
  return (
    <div>
        <p>Set overview page</p>
        <BasicButton onClick={navigateNewMatch} buttonText='back to new match'></BasicButton>
        <br/>

        <div>
          Serve Order:
          <ServeOrderForm onSubmit={handleServeOrderSubmit} onServeOrderChange={handleServeOrderChange}/>
        </div>
    </div>
  );
}