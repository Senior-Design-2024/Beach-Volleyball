import { useContext } from "react"
import { UserContext } from "./User"

export default function Pairs(props){
  const {pairs, teamData, setPairData, setMatches, header, setHeader, setCurrentView} = useContext(UserContext)
  const backlink = () => props.dispPairs(teamData.name, header.lbfs[0])

  const handleNewPair = () => {
    props.dispNewPair(backlink)
  }

  const selectPair = (pair) => {
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