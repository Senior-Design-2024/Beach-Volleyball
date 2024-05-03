import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { findRequest, getStats } from "../utils"

class TwoWayMap {
  constructor(map) {
     this.map = map;
     this.reverseMap = {};
     for(const key in map) {
        const value = map[key];
        this.reverseMap[value] = key;   
     }
  }
  get(key) { return this.map[key]; }
  revGet(key) { return this.reverseMap[key]; }
}

export default function MatchStats() {
  const location = useLocation()

  const [userData, setUserData] = useState(null)
  const [stats, setStats] = useState(null)
  const [dataloaded, setdataloaded] = useState(false)

  const twoWayMapPlayer = new TwoWayMap({
    '*' : '__asterisk__', 
     '%' : '__percent__',
 });

   const twoWayMapAction = new TwoWayMap({
    'SERVE': 1,
    'RECIEVE': 2,
    'ATTACK': 3,
    'OPTION': 4,
    'SET': 5,
    'DIG': 6,
    'BLOCK': 7,
 });

 const twoWayMapType = new TwoWayMap({
  //serves missing
  'TOP': 1,
  'FLOAT': 2,
  'GERMAN': 3,
  'SIDESPIN': 4,
  'SKYBALL': 5,
  'OTHER': 6,
  'SWING': 7,
  'ROLL': 8,
  'POKE': 9,
  'BUMP': 10,
  'SET': 11,
  'PLATFORM': 12,
  'ERROR': 13,
  '-': 14,
  '0': 15,
  '+': 16,
  'OVERPASS': 17,
  'TERM': 18,
  'CONTROL': 19,
  'typeERROR': 20,
  'FAULT': 21
});

const twoWayMapQuality = new TwoWayMap({
  '*' : '__asterisk__', 
   '%' : '__percent__',
});

const twoWayMapOrigin = new TwoWayMap({
  '*' : '__asterisk__', 
   '%' : '__percent__',
});

// ({type, action}) => (twoWayMapType.revGet(type), twoWayMapAction.revGet(action))

const twoWayMapDestination = new TwoWayMap({
  '1' : 1,
  '2' : 2,
  '3' : 3,
  '4' : 4,
  '5' : 5,
  '6' : 6,
  '7' : 7,
  '8' : 8,
  '9' : 9,
  'Net' : 10,
  'Wide Right' : 11,
  'Wide Left' : 12,
  'Long' : 13,
});

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

  useEffect( () => {
    if (stats) {
      setdataloaded(true)
      console.log(stats)
    }
  }, [stats])

  useEffect( () => {

  })


  const navigate = useNavigate()

  const navigateUser = (user ) => navigate('/User', {state: {user: user}})

  return(
    <div id='match-stats'>
      <p>Stats overview</p>
      {dataloaded &&
      <div id='wrapper'>
        <button onClick={() => navigateUser(userData)}>Back to {userData.username}'s home</button>
        {stats?.sets?.map(( (group, index) => (
          <div key={group.id}>
            {group.win_state &&
              <p>Set {index}: {group.win_state ? 'won' : 'lost'}</p>
            }
          </div>
        )))}
        
        <br/>

<p>Player 1:</p>
        {Object.keys(stats.player1_data).map(key => {
          const tupleReg = /\((\d+), (\d+)\)/g
          
          const avg = stats.player1_data[key]
          const res = tupleReg.exec(key)
          const type = twoWayMapType.revGet(res[1])
          const action = twoWayMapAction.revGet(res[2])
          return (
            <div>

            <p>Action: {action}</p>

            <p>Type: {type}</p>

            <p>Avg: {avg}</p>
            <br/>

          </div>
          )
        })}
        <br/>


<p>Player 2:</p>
        {Object.keys(stats.player2_data).map(key => {
          const tupleReg = /\((\d+), (\d+)\)/g
          
          const avg = stats.player2_data[key]
          const res = tupleReg.exec(key)
          const type = twoWayMapType.revGet(res[1])
          const action = twoWayMapAction.revGet(res[2])
          return (
            <div>
            <p>Action: {action}</p>

            <p>Type: {type}</p>

            <p>Avg: {avg}</p>
            <br/>

          </div>
          )
        })}


        </div>
      }
    </div>
  )
}