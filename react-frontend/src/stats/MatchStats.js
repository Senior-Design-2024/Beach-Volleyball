import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { findRequest, getStats } from "../utils"

export default function() {
  const location = useLocation()

  const [userData, setUserData] = useState(null)
  const [stats, setStats] = useState(null)

  useEffect( () => {
    const initializeInfo = async () => {
      setUserData(location.state.user)

      const serverStats = await getStats(location.state.match_id)
      setStats(serverStats)
    }
    
    if(location.state.user && location.state.match_id){
      initializeInfo()
    }
  }, [location.state])


  const navigate = useNavigate()

  const navigateUser = () => navigate('/User', {state: {user: userData}})

  return(
    <div id='match-stats'>
      
    </div>
  )
}