import { useContext } from "react"
import { UserContext } from "./User"

export default function Pairs(props) {
  const {teamData} = useContext(UserContext)

  return(
    <div id='pairs'>
      {
        teamData.players.length > 1 &&
        <button id='new-pair' onClick={props.dispNewPair}>New Pair</button>
      }
    </div>
  )
}