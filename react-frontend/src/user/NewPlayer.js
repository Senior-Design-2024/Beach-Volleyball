import { useContext } from "react"
import { UserContext } from "./User"
import { getAndSetArr, postRequest } from "../utils"

export default function NewPlayer(props) {
  const {teamData, playerData, setPlayerData, setPlayers, header} = useContext(UserContext)

  const handleSubmit = async (event) => {
    event.preventDefault()

    await postRequest({'team_id': teamData.id,
                 'player_name': playerData.name,
                 'description': playerData.description,},
                 'add/player')
    await getAndSetArr('player', 'team_id', teamData.id, setPlayers)

    props.dispPlayers(teamData.name, header.lbfs[0])
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
                <label htmlFor="name" className="label">Player name:</label>
                <input id='name' type="text" name="name" onChange={handleChange}/>
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