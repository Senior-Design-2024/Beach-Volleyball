import { useEffect, useState, createContext } from 'react';
import '../App.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { findRequest, postRequest } from '../utils';
import Group from './Group';
import ServeReceive from './ServeReceive';
import Receiving from './Receiving';
import Rally from './Rally';
import RallyDetails from './RallyDetails';
import MatchHeader from '../components/MatchHeader';
import { Point } from './Point';
import { putRequest } from '../utils';

export const MatchContext = createContext();

export default function Match() {
  const location = useLocation()

  const point = new Point()

  const [userData, setUserData] = useState(null)
  const [teamData, setTeamData] = useState(null)

  const [matchState, setMatchState] = useState({
    e_index: null,
    us_score: 0,
    them_score: 0,
  })

  const [lastWin, setLastWin] = useState([])

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


  const [groupData, setGroupData] = useState({
    id: null,
    match_id: null,  //need for adding
    set_num: 1,   //need for adding
    win_state: null, //need for adding, but can be null
  })

  const [pointData, setPointData] = useState({
    match_set_id: null,
    e_index: null,
    destination: [],
    origin: [],
    quality: [],
    type: [],
    action: [],
    player: [],
    win: null,
  })

  const addEvent = (obj) => {
    setPointData(prevData => ({
      ...prevData,
      destination: [...prevData.destination, obj.destination],
      origin: [...prevData.origin, obj.origin],
      quality: [...prevData.quality, obj.quality],
      type: [...prevData.type, obj.type],
      action: [...prevData.action, obj.action],
      player: [...prevData.player, obj.player],
    }))
  }
  


  useEffect( () => {
    if(location.state){
      setUserData(location.state.user)
      setTeamData(location.state.team)
      setMatchData(location.state.match)
    }
  }, [location.state])

  useEffect( () => {
    const initializePlayers = async () => {
      await findRequest('player', 'id', matchData.player1_id).then(
        (playerArr) => {
          setPlayer1Data(playerArr[0])
        }
      )
      await findRequest('player', 'id', matchData.player2_id).then(
        (playerArr) => {
          setPlayer2Data(playerArr[0])
        }
      )
      console.log('initialized players')
    }

    if(userData && teamData && matchData){
      initializePlayers()
    }
  }, [userData])

  useEffect( () => {
    if(player1Data && player2Data){
      setHeader({
        masthead: `${teamData.name}`,
        leftText: [
          `Scores`,
          `Team: ${teamData.name}`,
          `Player 1: ${player1Data.name}`,  
          `Player 2: ${player2Data.name}`,  
          `Set: ${groupData.set_num}`,
          `Venue: ${matchData.venue}`,
          `Flight: ${matchData.flight_number}`,],
        rightButtonNames: ['CANCEL MATCH'],
        rightButtonFunctions: [() => navigateUser(userData)],
      })
      console.log(player1Data, player2Data)
      postGroup(matchData.id, 1)
    }
  }, [player1Data, player2Data])

  //function
  const postGroup = async (match_id, set_num) => {
    const newGroup = {
      match_id: match_id,
      set_num: set_num,
      win_state: null
    }

    const id = await postRequest(newGroup, 'add/match_set')

    setGroupData({
      ...newGroup,
      id: id,
    })
  }


  useEffect( () => {
    console.log('pls', groupData, lastWin)
    //logic for if the game ends
    if(groupData.set_num == 3){
      if(lastWin[0] && lastWin[1]){
          navigateStats(userData, matchData.id)
      }
    }
    else if(groupData.set_num == 4){
      navigateStats(userData, matchData.id)
    }

    console.log('running')
    if(groupData.id) {
      setMatchState({
        e_index: 0,
        us_score: 0,
        them_score: 0,
      })
      setPointData({
        match_set_id: null,
        e_index: null,
        destination: [],
        origin: [],
        quality: [],
        type: [],
        action: [],
        player: [],
        win: null,
      })
      dispGroup()
    }
  }, [groupData.id])


  const handleMatchEnds = async (win) => {
    //mod the set so that it shows we won
    const {id, ...remainder} = groupData

    putRequest({...remainder, win_state: win ? 1 : 0}, `update/set/${groupData.id}`)
  


    const new_id = await postRequest({win_state: null, set_num: groupData.set_num+1, match_id:matchData.id}, 'add/match_set')

    const newData = {
      win_state: null,
      set_num: groupData.set_num + 1,
      id: new_id,
      match_id: matchData.id
    }

    //update set num
    setGroupData(newData)
    setLastWin([lastWin, win])
    
    //useeffect does logic just below
  }

/*
  useEffect( () => {
    //logic for if the game ends
    if(groupData.set_num >= 3){
      for(const i = 0; i < lastWin.length; i++){
        if(lastWin[i] === groupData.win){
          navigateStats(userData, matchData.id)
          return;
        }
      }
    }

    setMatchState({
      e_index: 0,
      us_score: 0,
      them_score: 0,
    })
    setPointData({
      match_set_id: null,
      e_index: 0,
      destination: [],
      origin: [],
      quality: [],
      type: [],
      action: [],
      player: [],
      win: null,
    })

    //setMatchState()
    dispGroup()



    setLastWin([lastWin, groupData.win_state])
  }, [groupData.set_num])
*/
 

  const [formSubmitted, setFormSubmitted] = useState(false)
  //handlePointEnds
  const handlePointEnds = (win) => {
    //send off the point
    postRequest({...pointData, win: win ? 1 : 0}, 'addpoint')

    //reset the point


    //match state, set_num win state for match => call function for if match ends
    const newMatchState = {
      e_index: matchState.e_index + 1,
      us_score: win ? matchState.us_score+1 : matchState.us_score,
      them_score: win ? matchState.them_score : matchState.them_score+1
    }
    console.log('handlepointends', pointData)
    console.log(newMatchState)

    setMatchState(newMatchState) //update match state

    //see if the match ends
    if(Math.abs(newMatchState.us_score - newMatchState.them_score) >= 2){
      if(groupData.set_num <= 2){
        if(newMatchState.us_score >= 2){
          handleMatchEnds(1)
          return;
        }
        else if(newMatchState.them_score >= 2){
          handleMatchEnds(0)
          return;
        }
      } 
      else {
        if(newMatchState.us_score >= 2){
          handleMatchEnds(1)
          return;
        }
        else if(newMatchState.them_score >= 2){
          handleMatchEnds(0)
          return;
        }
      }
    }

    //do if the match did not end
    if(currentView === 'serving'){
      dispReceiving()
    }
    else{
      dispServing()
    }
  }


  /////////////////////////////////
  /////////////////////////////////
  const navigate = useNavigate()
  const navigateUser = (user) => navigate('/User', {state: {user: user}})
  const navigateStats = (user, match_id) => navigate('/MatchStats', {state: {user: user, match_id: match_id}})

  const [currentView, setCurrentView] = useState('')

  const dispGroup = () => {
    setCurrentView('group')
  }

  const dispServing = async () => {
    setPointData(prevData => ({
      ...prevData,
      match_set_id: groupData.id,
      e_index: matchState.e_index,
      destination: [],
      origin: [],
      quality: [],
      type: [],
      action: [],
      player: [],
      win: null,
    }))
    setCurrentView('serving')
  }

  const dispReceiving = () => {
    setPointData(prevData => ({
      ...prevData,
      match_set_id: groupData.id,
      e_index: matchState.e_index,
      destination: [],
      origin: [],
      quality: [],
      type: [],
      action: [],
      player: [],
      win: null,
    }))
    setCurrentView('receiving')
  }

  const dispRally = () => setCurrentView('rally')
  
  const dispRallyDetails = () => {
    setCurrentView('rallyDetails')
  }

  const [header, setHeader] = useState({
    masthead: 'default',
    leftText: [''],
    rightButtonNames: [''],
    rightButtonFunctions: [],
  })

  //html
  return (
    <div id='match-page-wrapper' className="page-wrapper">
      <MatchHeader masthead={header.masthead}
        leftText={header.leftText}
        rightButtonNames={header.rightButtonNames}
        rightButtonFunctions={header.rightButtonFunctions}
      />

      <MatchContext.Provider value={{player1Data, setPlayer1Data, player2Data, setPlayer2Data, matchData, setMatchData,
                                    serveOrder, setServeOrder, matchState, setMatchState, handlePointEnds, currentView, setCurrentView,
                                    pointData, setPointData, addEvent}}>

        {currentView === 'group' && <Group dispServing={dispServing} dispReceiving={dispReceiving}/>}
        {currentView === 'serving' && <ServeReceive dispRally={dispRally}/>}
        {currentView === 'receiving' && <Receiving dispRally={dispRally}/>}
        {(currentView === 'rally' || currentView === 'rallyDetails') && <Rally dispRally={dispRally} dispRallyDetails={dispRallyDetails}/>}
      </MatchContext.Provider>
    </div>
  );
}