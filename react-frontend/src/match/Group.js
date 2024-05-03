import { useContext, useState } from "react";
import { MatchContext } from "./Match";

export default function Group(props) {
  const { serveOrder, setServeOrder, matchData, player1Data, player2Data, groupData } = useContext(MatchContext);
  const [selectedOptions, setSelectedOptions] = useState([]);


  //function
  const handleSelectChange = async (index, value) => {
    if (selectedOptions.includes(value)) {
      alert('You have already selected this option.')
    }
    else{
      const newSelectedOptions = [...selectedOptions];
      newSelectedOptions[index] = value;
      setSelectedOptions(newSelectedOptions);

      const newServeOrder = [...serveOrder];
      newServeOrder[index] = parseInt(value);
      await setServeOrder(newServeOrder);
    }
  };

  //function
  ////////SERVE ORDER MAY NOT BE UP TO DATE BY SUBMISSION OR IMMEDIATELY AFTER SUMISSION
  const handleSubmit = (event) => {
    event.preventDefault()

    if (serveOrder.every(order => order !== 0)) { //make sure everything is selected
      if ( (serveOrder[0]<=2 && serveOrder[2]<=2) || (serveOrder[0]>=3 && serveOrder[2]>=3) ){ //make sure serve orders alternate
        console.log('Serve Order:', serveOrder);

        //go to serving or receiving based on our position
        if (serveOrder[0] <= 2) {
          props.dispServing();
        } else {
          props.dispReceiving();
        }
      }
      else{
        alert('serve orders must alternate')
      }
    }
    else{
      alert('not all options are selected')
    }
  }

  //html
  return (
    <form onSubmit={handleSubmit}>
      {serveOrder.map((value, index) => (
        <div key={index}>
          <label>
            Serve {index + 1}:
          </label>
          <select value={value || '0'} onChange={(e) => handleSelectChange(index, e.target.value)}>
              <option value='0'>Select an option</option>
              <option value='1'>{player1Data.name}</option>
              <option value='2'>{player2Data.name}</option>
              <option value='3'>{matchData.opponent1_name}</option>
              <option value='4'>{matchData.opponent2_name}</option>
            </select>
          <br/>
          <br/>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}
