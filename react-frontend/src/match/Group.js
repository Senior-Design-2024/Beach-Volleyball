import { useContext, useEffect } from "react";
import { MatchContext } from "./Match";

export default function Group(props) {
  const {serveOrder, setServeOrder, matchData, player1Data, player2Data} = useContext(MatchContext)

  const handleSelectChange = (index, value) => {
    const newServeOrder = [...serveOrder];
    newServeOrder[index] = parseInt(value);
    setServeOrder(newServeOrder);
  };

  const handleSubmit = () => {
    console.log('Serve Order:', serveOrder);

    if(serveOrder[0] === 1 || serveOrder[0] === 2){
      props.dispServing()
    }
    else{
      props.dispReceiving()
    }
    
    //setServeOrder([0, 0, 0, 0])
  };

  useEffect( () => {
    if(serveOrder[0] !== 0 && serveOrder[1] !== 0 && serveOrder[2] !== 0 && serveOrder[3] !== 0){
      handleSubmit()
    }
  }, [serveOrder])

  return (
    <form onSubmit={handleSubmit}>
      {serveOrder.map((value, index) => (
        <div key={index}>
          <label>
            Serve {index + 1}:
            <select value={value || null} onChange={(e) => handleSelectChange(index, e.target.value)}>
              <option value="">Select an option</option>
              <option value='1'>{player1Data.name}</option>
              <option value='2'>{player2Data.name}</option>
              <option value="3">{matchData.opponent1_name}</option>
              <option value="4">{matchData.opponent2_name}</option>
            </select>
          </label>
        </div>
      ))}
    </form>
  );
}