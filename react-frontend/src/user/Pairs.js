import { useContext } from "react"
import { UserContext } from "./User"
import { getAndSetArr } from "../utils"

export default function Pairs(props){
  const {teamData, players, pairs, setPairData, setMatches, header} = useContext(UserContext)
  const backlink = () => props.dispPairs(teamData.name, header.lbfs[0])

  const handleNewPair = () => {
    props.dispNewPair(players, backlink)
  }

  const selectPair = (pair) => {
    setPairData(pair)
    getAndSetArr('match', 'pair_id', pair.id, setMatches)

    props.dispPairOverview(pair.id, backlink)
  }

  return(
    <div id='pairs'>
      <button onClick={handleNewPair}>New Pair</button>
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