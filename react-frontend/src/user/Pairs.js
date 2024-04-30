import { useContext } from "react"
import { UserContext } from "./User"
import { getAndSetArr } from "../utils"

export default function Pairs(props){
  const {pairs, setPairData, setMatches, header, setHeader, setCurrentView} = useContext(UserContext)

  const selectPair = (pair) => {
    props.dispPairOverview(pair.id, () => props.dispPairs(header.lbfs[0]))
  }

  return(
    <div id='pairs'>
      <div id='list-pairs'>
        {pairs.length ?
          pairs.map(( (pair) => (
            <div key={pair.id} id='button-wrapper'>
              <br/>
              <button onClick={() => selectPair(pair)}>{pair.player1_id + ' ' + pair.player2_id}</button>
            </div>
          )))
          :
          'no pairs'
        }
      </div>
    </div>
  )
}