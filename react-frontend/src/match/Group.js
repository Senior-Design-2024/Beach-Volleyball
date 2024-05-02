import { useContext } from "react";
import { MatchContext } from "./Match";

export default function Group(props) {
  const { serveOrder, setServeOrder, matchData, player1Data, player2Data } = useContext(MatchContext);

  const handleSelectChange = async (index, value) => {
    const newServeOrder = [...serveOrder]; // Create a new array to avoid mutating the state directly
    newServeOrder[index] = parseInt(value);
    await setServeOrder(newServeOrder); // Update the state with the new array
  };

  const handleSubmit = (event) => {
    event.preventDefault()

    if (serveOrder.every(order => order !== 0)) {
      console.log('Serve Order:', serveOrder);

      if (serveOrder[0] === 1 || serveOrder[0] === 2) {
        //props.dispServing();
        console.log('serving')
      } else {
        //props.dispReceiving();
        console.log('receivin')
      }

      setServeOrder([0, 0, 0, 0]); // Reset serveOrder after submission
    }
    else{
      console.log('not all options are selected')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {serveOrder.map((value, index) => (
        <div key={index}>
          <label>
            Serve {index + 1}:
            <select value={value || '0'} onChange={(e) => handleSelectChange(index, e.target.value)}>
              <option value='0'>Select an option</option>
              <option value='1'>{player1Data.name}</option>
              <option value='2'>{player2Data.name}</option>
              <option value='3'>{matchData.opponent1_name}</option>
              <option value='4'>{matchData.opponent2_name}</option>
            </select>
          </label>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}
