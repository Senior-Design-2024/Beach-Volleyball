import { useContext } from "react"
import { UserContext } from "./User"
import { getAndSetArr } from "../utils"

export default function Pairs(){
  const {pairs, setPairData, setMatches, setHeader, setCurrentView} = useContext(UserContext)

  const selectPair = (pair) => {
    console.log('not implemented')
    /*
    setPairData(pair)
    getAndSetArr('match', 'pair_id', pair.id, setMatches)
    setHeader(prevState => ({
      ...prevState,
      masthead: pair.name,
    }))

    setCurrentView('pairOverview')*/
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