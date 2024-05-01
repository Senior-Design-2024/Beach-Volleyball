import { useContext } from "react"
import { UserContext } from "./User"

export default function PairOverview(props) {
  const {pairData, header} = useContext(UserContext)
  const backlink = () => props.dispPairOverview(pairData.id, header.lbfs[0])

  const handleNewMatch = () => {
    props.dispNewMatch(pairData.id, backlink)
  }

  return(
    <div id='pair-overview'>
      <button onClick={handleNewMatch}>New Match</button>
    </div>
  )
}