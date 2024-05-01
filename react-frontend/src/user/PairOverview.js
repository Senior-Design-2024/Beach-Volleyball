import { useContext } from "react"
import { UserContext } from "./User"

export default function PairOverview(props) {
  const {pairData, matches, header} = useContext(UserContext)
  const backlink = () => props.dispPairOverview(pairData.id, header.lbfs[0])

  const handleNewMatch = () => {
    props.dispNewMatch(pairData.id, backlink)
  }

  const selectMatch = (match) => {
    console.log('not implemented')
  }

  return(
    <div id='pair-overview'>
      <button onClick={handleNewMatch}>New Match</button>
      <br/>
      <div id='list-matches'>
      {matches.length ?
          matches.map(( (match) => (
            <div key={match.id} id='button-wrapper'>
              <br/>
              <button onClick={() => selectMatch(match)}>{match.venue}</button>
            </div>
          )))
          :
          'no matches'
        }
      </div>
    </div>
  )
}