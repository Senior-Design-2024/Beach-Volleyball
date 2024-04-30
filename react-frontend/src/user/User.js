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

export const UserContext = createContext();

export default function User() {
  //data
  const location = useLocation()

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

  //these need to be updated
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
  }, [teams]) 

  const navigate = useNavigate()
  const navigateMain = () => navigate('/')

  // App navigation
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

  const dispNewPair = (backlink) => {
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

  return (
    <div id='user-page-wrapper' className="page-wrapper">
      <AppHeader masthead={header.masthead}
        leftButtonNames={header.lbns}
        leftButtonFunctions={header.lbfs}
        rightButtonNames={header.rbns}
        rightButtonFunctions={header.rbfs}/>
      
      {/*children*/}
      <UserContext.Provider value={{userData, setUserData, teamData, setTeamData, playerData, setPlayerData, pairData, setPairData,
                                  teams, setTeams, players, setPlayers, pairs, setPairs, matches, setMatches,
                                  setCurrentView, header, setHeader}}>
        {currentView === 'teams' && <Teams dispTeams={dispTeams} dispNewTeam={dispNewTeam} dispPlayers={dispPlayers}/>}
        {currentView === 'newTeam' && <NewTeam/>}
        {currentView === 'players' && <Players dispPlayers={dispPlayers} dispNewPlayer={dispNewPlayer} dispPlayerOverview={dispPlayerOverview} dispPairs={dispPairs}/>}
        {currentView === 'newPlayer' && <NewPlayer/>}
        {currentView === 'playerOverview' && <PlayerOverview/>}
        {currentView === 'pairs' && <Pairs dispPairs={dispPairs} dispNewPair={dispNewPair} dispPairOverview={dispPairOverview}/>}
        {currentView === 'newPair' && <NewPair/>}
        {currentView === 'pairOverview' && <PairOverview/>}
      </UserContext.Provider>
    </div>
  );
}