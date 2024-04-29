import { useContext } from "react"
import { UserContext } from "./User"

export default function Pairs(props) {
  const {teamData, setPairData} = useContext(UserContext)

  const selectPair = (player1_id, player2_id) => {
    console.log('run selectPair')
    setPairData(prevState => ({
      ...prevState,
      player1_id: player1_id,
      player2_id: player2_id,
    }))

    //and more?
  }

  return(
    <div id='pairs'>
      {
        teamData.players.length > 1 &&
        <button id='new-pair' onClick={props.dispNewPair}>New Pair</button>
      }

      <div id='list-pairs'>
        {teamData.pairs.map(( (pair) => (
          <div key={pair.id} id="button-wrapper">
            <br/>
            <button onClick={() => selectPair(pair.player1_id, pair.player2_id)}/>
          </div>
        )))}
      </div>
    </div>
  )
}