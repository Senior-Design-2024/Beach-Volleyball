import { useEffect, useState, createContext } from 'react';
import '../App.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { findRequest, postRequest } from '../utils';
import Group from './Group';
import Serving from './Serving';
import Receiving from './Receiving';
import Rally from './Rally';
import RallyDetails from './RallyDetails';
import MatchHeader from '../components/MatchHeader';

export const MatchContext = createContext();

export default function Match() {
  const location = useLocation()

  const [userData, setUserData] = useState(null)
  const [teamData, setTeamData] = useState(null)

  const [matchData, setMatchData] = useState({
    id: null,
    team_id: null,
    player1_id: null,
    player2_id: null,
    pair_id: null,

    opponent1_name: null,
    opponent2_name: null,
    opponent1_number: null,
    opponent2_number: null,
    venue: null,
    tournament: null,
    court_number: null,
    flight_number: null,
    conference: null,
    location: null,
    match_date: null,
    sched_start_time: null,
    strategy: null,
  });

  const [player1Data, setPlayer1Data] = useState(null)
  const [player2Data, setPlayer2Data] = useState(null)

  const [serveOrder, setServeOrder] = useState([0, 0, 0, 0])

  /*
  const [groupData, setGroupData] = useState({
    id: null,
    match_id: null,  //need for adding
    set_num: null,   //need for adding
    win_state: null, //need for adding, but can be null
  })

  const [pointData, setPointData] = useState({
    id: null,
    match_set_id: null, //THIS IS FOR GROUP_ID, DIFFERENT BACKEND NAMING CONVENTION
    win: null,
  })

  //THESE SHOULDN'T BE NECESSARY OR BASICALLY, I WILL BE USING ARRAYS TO REPRESENT THEM
  const [eventData, setEventData] = useState({
    id: null,
    point_id: null,
    data: null, //DATA REFERS TO THE BIT-SHIFTED REPRESENTATION OF THE ACTION
    e_index: null,
  })
  */

  useEffect( () => {
    if(location.state){
      setUserData(location.state.user)
      setTeamData(location.state.team)
      setMatchData(location.state.match)
    }
  }, [location.state])

  useEffect( () => {
    const initializePlayers = async () => {
      await findRequest('player', 'player_id', teamData.player1_id).then(
        (playerArr) => {
          setPlayer1Data(playerArr[0])
        }
      )
      await findRequest('player', 'player_id', teamData.player2_id).then(
        (playerArr) => {
          setPlayer2Data(playerArr[0])
        }
      )
      console.log('initialized players')
    }

    if(userData){
      initializePlayers()
    }
  }, [userData])

  useEffect( () => {
    if(player1Data && player2Data){
      setHeader({
        masthead: `${teamData.name}`,
        leftText: [`Team: ${teamData.name}`,
          `Player 1: ${player1Data.name}`,  
          `Player 2: ${player2Data.name}`,  
          `Set: not implemented yet`,
          `Venue: ${matchData.venue}`,
          `Flight: ${matchData.flight_number}`,],
        rightButtonNames: ['CANCEL MATCH'],
        rightButtonFunctions: [() => navigateUser(userData)],
      })
      dispGroup()
    }
  }, [player1Data, player2Data])

  /*
  useEffect( () => {
    if(location.state.match && location.state.user){
      console.log('loaction match', location.state.match)
      setUserData(location.state.user)
      setMatchData(location.state.match)
      setTeamName(location.state.team_name)
    }
  }, [location.state])

  useEffect( () => {
    const initializePlayers = async () => {
      if(matchData.id){
        console.log('initialize players', matchData.id)
        const player1Array = await findRequest('player', 'player_id', matchData.player1_id)
        setPlayer1Data(player1Array[0])
        const player2Array = await findRequest('player', 'player_id', matchData.player2_id)
        setPlayer2Data(player2Array[0])
      }
  }
    initializePlayers()
  }, [matchData])

  useEffect( () => {
    if(player1Data.id !== null){
      setHeader({
        masthead: `${teamName}`,
        leftText: [`Team: ${teamName}`,
          `Player 1: ${player1Data.name}`,  
          `Player 2: ${player2Data.name}`,  
          `Set: not implemented yet`,
          `Venue: ${matchData.venue}`,
          `Flight: ${matchData.flight_number}`,],
        rightButtonNames: ['CANCEL MATCH'],
        rightButtonFunctions: [() => navigateUser(userData)],
      })
      dispGroup()
    }
  }, [player1Data])
*/

  const navigate = useNavigate()
  const navigateUser = (user) => navigate('/User', {state: {user: user}})

  const [currentView, setCurrentView] = useState('')

  const dispGroup = () => setCurrentView('group')

  const dispServing = () => setCurrentView('serving')

  const dispReceiving = () => setCurrentView('receiving')

  const dispRally = () => setCurrentView('rally')
  
  const dispRallyDetails = () => setCurrentView('rallyDetails')

  const [header, setHeader] = useState({
    masthead: 'default',
    leftText: [''],
    rightButtonNames: [''],
    rightButtonFunctions: [],
  })

  return (
    <div id='match-page-wrapper' className="page-wrapper">
      <MatchHeader masthead={header.masthead}
        leftText={header.leftText}
        rightButtonNames={header.rightButtonNames}
        rightButtonFunctions={header.rightButtonFunctions}
      />

      <MatchContext.Provider value={{player1Data, setPlayer1Data, player2Data, setPlayer2Data, matchData, setMatchData,
                                    serveOrder, setServeOrder}}>

        {currentView === 'group' && <Group dispServing={dispServing} dispReceiving={dispReceiving}/>}
        {currentView === 'serving' && <Serving/>}
        {currentView === 'receiving' && <Receiving/>}
        {currentView === 'rally' && <Rally/>}
        {currentView === 'rallyDetails' && <RallyDetails/>}
      </MatchContext.Provider>
    </div>
  );
}