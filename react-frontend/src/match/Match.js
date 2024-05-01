import { useEffect, useState } from 'react';
import '../App.css'
import { useLocation } from 'react-router-dom';

export default function Match() {
  const location = useLocation()

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
    console.log(location.state.match_id)

    if(location.state.match_id){
      setMatchData(prevState => ({
        ...prevState,
        id: location.state.match_id
      }))
    }
  }, [location.state])

  return (
    <div id='match-page-wrapper' className="page-wrapper">

    </div>
  );
}