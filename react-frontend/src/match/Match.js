import { useEffect, useState } from 'react';
import '../App.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { postRequest } from '../utils';

export default function Match() {
  const location = useLocation()

  const [userData, setUserData] = useState({})

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

  useEffect( () => {
    if(location.state.match && location.state.user){
      console.log('location updated with info')
      setUserData(location.state.user)
      setMatchData(location.state.match)
    }
  }, [location.state])

  useEffect( () => {
    if(matchData.id){
      console.log('t', matchData.id)
    }
  })

  const testSet = (match_id) => {
    postRequest(
      {match_id: match_id,  //need for adding
      set_num: 1,   //need for adding
      win_state: null, //need for adding, but can be null
      },
      'add/match_set')
  }

  const testPoint = (match_set_id) => {
    postRequest({
      match_set_id: match_set_id,
      destination: [1, 1, 1],
      origin: [1, 1, 1],
      quality: [1, 1, 1],
      a_type: [1, 1, 1],
      action: [1, 1, 1],
      player: [1, 1, 1],
      win: false,
    },
    'addpoint')
  }

  const navigate = useNavigate()
  const navigateUser = (user) => navigate('/User', {state: {user: user}})

  const [currentView, setCurrentView] = useState('')

  const dispGroup = () => setCurrentView('group')

  return (
    <div id='match-page-wrapper' className="page-wrapper">
      <button onClick={() => navigateUser(userData)}>CANCEL MATCH</button>
      <br/>
      <button onClick={() => testSet(1)}>add test set</button>
      <br/>
      <button onClick={() => testPoint(1)}>add test point</button>
    </div>
  );
}