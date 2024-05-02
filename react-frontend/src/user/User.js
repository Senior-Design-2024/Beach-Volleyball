import '../App.css'
import AppHeader from '../components/AppHeader';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import { useLocation } from 'react-router-dom';
import { getAndSetArr } from '../utils';
import Teams from './Teams';
import Players from './Players';
import PlayerOverview from './PlayerOverview';
import Pairs from './Pairs';
import PairOverview from './PairOverview';
import NewTeam from './NewTeam';
import NewPlayer from './NewPlayer'
import NewPair from './NewPair';
import NewMatch from './NewMatch';

export const UserContext = createContext();

export default function User() {
  const [userData, setUserData] = useState({
    id: null,
    username: null,
    email: null,
  })
  const [teams, setTeams] = useState([])

  const [teamData, setTeamData] = useState({
    id: null,
    user_id: null,
    name: null,
  })
  const [players, setPlayers] = useState([])
  const [pairs, setPairs] = useState([])

  const [playerData, setPlayerData] = useState({
    id: null,
    team_id: null,
    name: null,
    description: null,
  })
  const [pairData, setPairData] = useState({
    id: null,
    team_id: null,
    player1_id: null,
    player2_id: null,
  })
  const [matches, setMatches] = useState([])

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

  const location = useLocation()
  // Initialize the user
  //set user when we get it from location
  useEffect( () => {
    setUserData(location.state.user)
  }, [location.state.user])

  //now that userData.id has updated, fetch the teams
  useEffect( () => {
    if(userData.id){
      getAndSetArr('team', 'user_id', userData.id, setTeams)
    }
  }, [userData])

  //any time we modify teams and its an array, lets disp teams
  useEffect( () => {
    if(teams.length !== 0){
     dispTeams(userData.username)
    }
  }, [teams, userData.username]) 

  // App navigation
  const navigate = useNavigate()
  const navigateMain = () => navigate('/')
  const navigateMatch = (user, team, match,) => navigate('/Match', {state: {user:user, team:team, match:match}})

  const [currentView, setCurrentView] = useState('')

  //state for rendering header
  const [header, setHeader] = useState({
    masthead: 'Welcome!',
    lbns: [],
    lbfs: [],
    rbns: ['logout'],
    rbfs: [navigateMain],
  })

  const dispTeams = (username) => {
    setHeader(prevState => ({
      ...prevState,
      masthead: 'Welcome ' + username + '!',
    }))
    setCurrentView('teams')
  }

  const dispNewTeam = (backlink) => {
    setHeader(prevState => ({
      ...prevState,
      masthead: 'new team',
      lbns: ['Back'],
      lbfs: [backlink],
    }))
    setCurrentView('newTeam')
  }

  const dispPlayers = (team_name, backlink) => {
    setHeader(prevState => ({
      ...prevState,
      masthead: team_name,
      lbns: ['Back'],
      lbfs: [backlink],
    }))
    setCurrentView('players')
  }

  const dispNewPlayer = (backlink) => {
    setHeader(prevState => ({
      ...prevState,
      masthead: 'new player',
      lbns: ['Back'],
      lbfs: [backlink],
    }))
    setCurrentView('newPlayer')
  }

  const dispPlayerOverview = (player_name, backlink) => {
    setHeader(prevState => ({
      masthead: player_name,
      lbns: ['Back'],
      lbfs: [backlink],
    }))
    setCurrentView('playerOverview')
  }

  const dispPairs = (team_name, backlink) => {
    setHeader(prevState => ({
      ...prevState,
      masthead: team_name,
      lbns: ['Back'],
      lbfs: [backlink],
    }))
    setCurrentView('pairs')
  }

  const dispNewPair = (players, backlink) => {
    if(players.length > 1){
      setPairData(prevState => ({
        ...prevState,
        player1_id: players[0].id,
        player2_id: players[0].id,
      }))
    }
    else{
      console.error('not enough players')
    }

    setHeader(prevState => ({
      ...prevState,
      masthead: 'new pair',
      lbns: ['Back'],
      lbfs: [backlink],
    }))
    setCurrentView('newPair')
  }

  const dispPairOverview = (pair_id, backlink) => {
    setHeader(prevState => ({
      ...prevState,
      masthead: pair_id,
      lbns: ['Back'],
      lbfs: [backlink],
    }))
    setCurrentView('pairOverview')
  }

  const dispNewMatch = (pair_id, backlink) => {
    setHeader(prevState => ({
      ...prevState,
      masthead: `create match for ${pair_id}`,
      lbns: ['Back'],
      lbfs: [backlink],
    }))
    setCurrentView('newMatch')
  }


  useEffect( () => {
    setMatchData(prevState => ({
      ...prevState,
      team_id: teamData.id,
      pair_id: pairData.id,
      player1_id: pairData.player1_id,
      player2_id: pairData.player2_id,
    }))
  }, [pairData.id])

  return (
    <div id='user-page-wrapper' className="page-wrapper">
      <AppHeader masthead={header.masthead}
        leftButtonNames={header.lbns}
        leftButtonFunctions={header.lbfs}
        rightButtonNames={header.rbns}
        rightButtonFunctions={header.rbfs}/>
      
      {/*children*/}
      <UserContext.Provider value={{userData, setUserData, teamData, setTeamData, playerData, setPlayerData, pairData, setPairData, matchData, setMatchData,
                                  teams, setTeams, players, setPlayers, pairs, setPairs, matches, setMatches,
                                  setCurrentView, header, setHeader}}>
        
        {currentView === 'teams' && <Teams dispTeams={dispTeams} dispNewTeam={dispNewTeam} dispPlayers={dispPlayers}/>}
        {currentView === 'newTeam' && <NewTeam dispTeams={dispTeams}/>}
        {currentView === 'players' && <Players dispPlayers={dispPlayers} dispNewPlayer={dispNewPlayer} dispPlayerOverview={dispPlayerOverview} dispPairs={dispPairs}/>}
        {currentView === 'newPlayer' && <NewPlayer dispPlayers={dispPlayers}/>}
        {currentView === 'playerOverview' && <PlayerOverview/>}
        {currentView === 'pairs' && <Pairs dispPairs={dispPairs} dispNewPair={dispNewPair} dispPairOverview={dispPairOverview}/>}
        {currentView === 'newPair' && <NewPair dispPairs={dispPairs}/>}
        {currentView === 'pairOverview' && <PairOverview dispPairOverview={dispPairOverview} dispNewMatch={dispNewMatch}/>}
        {currentView === 'newMatch' && <NewMatch navigateMatch={navigateMatch}/>}
      </UserContext.Provider>
    </div>
  );
}