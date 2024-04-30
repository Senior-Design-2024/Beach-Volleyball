import { useContext } from "react"
import { UserContext } from "./User"
import { getAndSetArr } from "../utils"

export default function Players(props){
  const {players, teamData, setPlayerData, setMatches, header, setHeader, setCurrentView} = useContext(UserContext)

  const selectPlayer = (player) => {
    setPlayerData(player)
    getAndSetArr('match', 'player_id', player.id, setMatches)

    props.dispPlayerOverview(player.name, () => props.dispPlayers(teamData.name, header.lbfs[0])) 
  }

  const handlePairs = () => {
    props.dispPairs(() => props.dispPlayers(teamData.name, header.lbfs[0]))
  }

  return(
    <div id='players'>
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