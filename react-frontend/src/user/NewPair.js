import { useContext } from "react"
import { UserContext } from "./User"
import { postRequest } from "../utils"

export default function NewPair(props) {
  const {pairData, setPairData, teamData, getPairs, getAndSetPairs} = useContext(UserContext)

  const handleSubmit = async (event) => {
    event.preventDefault()

    await postRequest({'team_id': teamData.team_id,
                      'player1_id': pairData.player1_id,
                      'player2_id': pairData.player2_id,},
                      'addpair')
    //await getPairs()
    await getAndSetPairs()

    props.dispPairs()
  }

  const handleChange = (event) => {
    const {name, value} = event.target

    setPairData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  return(
    <div id="new-pair">
      <form id='new-pair-form' onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor='player1_id'>Player 1:</label> 
                <select id='player1_id' name='player1_id' onChange={handleChange} form='new-pair-form'>
                  {teamData.players.map( (player) => (
                    <option key={player.id} id='player-option' value={player.id}>{player.name}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='player2_id'>Player 2:</label> 
                <select id='player2_id' name='player2_id' onChange={handleChange} form='new-pair-form'>
                  {teamData.players.map( (player) => (
                      <option key={player.id} id='player-option' value={player.id}>{player.name}</option>
                  ))}
                </select>
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