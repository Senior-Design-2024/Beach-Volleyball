import { useContext } from "react"
import { UserContext } from "./User"

export default function Players(props) {
  const {teamData, playerData, setPlayerData} = useContext(UserContext)

  const selectPlayer = (player_id, player_name) => {
    console.log(player_id, player_name)
    setPlayerData(prevState => ({
      ...prevState,
      player_id: player_id,
      player_name: player_name,
    }))
    //needs get player
    //disp player
  }

  return(
    <div id='players'>
      <button onClick={props.dispNewPlayer}>New Player</button>

      <div id='list-players'>
        {teamData.players.map(( (player) => (
          <div key={player.id} id='button-wrapper'>
            <br/>
            <button onClick={() => selectPlayer(player.id, player.name)}>{player.name}</button>
          </div>
        )))}
      </div>
    </div>
  )
}