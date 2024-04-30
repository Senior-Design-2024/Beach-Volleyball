import { useContext } from "react"
import { UserContext } from "./User"
import { getAndSetArr } from "../utils"

export default function Players(props){
  const {players, teamData, setPlayerData, setMatches, header, setHeader, setCurrentView} = useContext(UserContext)
  const backlink = () => props.dispPlayers(teamData.name, header.lbfs[0])

  const selectPlayer = (player) => {
    setPlayerData(player)
    getAndSetArr('match', 'player_id', player.id, setMatches)

    props.dispPlayerOverview(player.name, backlink) 
  }

  const handleNewPlayer = () => {
    props.dispNewPlayer(backlink)
  }

  const handlePairs = () => {
    props.dispPairs(teamData.name, backlink)
  }

  return(
    <div id='players'>
      <button onClick={handleNewPlayer}>New Player</button>
      <br/>
      <br/>
      <button onClick={handlePairs}>pairs</button>
      <div id='list-players'>
        {players.length ?
          players.map(( (player) => (
            <div key={player.id} id='button-wrapper'>
              <br/>
              <button onClick={() => selectPlayer(player)}>{player.name}</button>
            </div>
          )))
          :
          'no players'
        }
      </div>
    </div>
  )
}