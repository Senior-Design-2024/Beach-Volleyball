import { useContext } from "react"
import { UserContext } from "./User"
import { postRequest } from "../utils"

export default function NewPlayer(props) {
  const {teamData, playerData, setPlayerData} = useContext(UserContext)

  const handleSubmit = (event) => {
    event.preventDefault()

    postRequest({'team_id': teamData.team_id,
                 'player_name': playerData.player_name,
                 'description': playerData.description,},
                 'addplayer')
  }

  const handleChange = (event) => {
    const {name, value} = event.target

    setPlayerData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  return(
    <div id='new-player'>
      <form id='new-player-form' onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="player_name" className="label">Player name:</label>
                <input id='player_name' type="text" name="player_name" onChange={handleChange}/>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="description" className="label">Description:</label>
                <input id='description' type="text" name="description" onChange={handleChange}/>
              </td>
            </tr>
            <tr>
              <td>
                <input type="submit"></input>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}