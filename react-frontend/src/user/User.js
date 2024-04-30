import '../App.css'
import AppHeader from '../components/AppHeader';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import Teams from './Teams';
import NewTeam from './NewTeam';
import { useLocation } from 'react-router-dom';
import { findRequest, getAndSetArr, test} from '../utils';
import Players from './Players';
import NewPlayer from './NewPlayer';
import Pairs from './Pairs';
import NewPair from './NewPair';

export const UserContext = createContext();

export default function User() {
  //data
  const location = useLocation()

  const [userData, setUserData] = useState({
    user_id: null,
    user_name: '',
    user_email: '',
    teams: [],
  })
  const [teamData, setTeamData] = useState({
    team_name: '',
    team_id: -1,
    players: [],
    pairs: [],
  })
  const [playerData, setPlayerData] = useState({
    player_id: -1,
    player_name: '',
    description: '',
  })
  const [pairData, setPairData] = useState({
    player1_id: -1,
    player2_id: -1,
    matches: [],
  })

  //get teams
  const getAndSetTeams = async (user_id) => {
    await getAndSetArr('team', 'user_id', user_id, setUserData);
  };

  useEffect(() => {
    if (location.state && location.state.user_id) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        user_id: location.state.user_id,
      }));
    }
  }, [location.state]);

  useEffect(() => {
    if (userData.user_id !== null) {
      getAndSetTeams(userData.user_id);
      dispTeams()
    }
  }, [userData.user_id]);


  //getPlayers
  const getAndSetPlayers = () => {
    findRequest('player', 'team_id', teamData.team_id)
  };

  useEffect(() => {
    if (teamData.team_id !== -1) {
      getAndSetPlayers();
    }
  }, [teamData.team_id]);

  //getPairs
  const getAndSetPairs = () => {
    findRequest('pair', 'team_id', teamData.team_id)
  }

  useEffect(() => {
    if (teamData.team_id !== -1) {
      getAndSetPairs()
    }
  }, [teamData.team_id]);

  
  

  //display
  const [currentView, setCurrentView] = useState('default')
  const dispTeams = () => {
    setCurrentView('teams')
  }
  const dispNewTeam = () => {
    setCurrentView('newTeam')
  }
  const dispPlayers = () => {
    setCurrentView('players')
  }
  const dispNewPlayer = () => {
    setCurrentView('newPlayer')
  }
  const dispPairs = () => {
    setCurrentView('pairs')
  }
  const dispNewPair = () => {
    setPairData(prevState => ({
      ...prevState,
      player1_id: teamData.players[0].id,
      player2_id: teamData.players[0].id,
    }))
    setCurrentView('newPair')
  }
  
  const navigate = useNavigate()
  const navigateMain = () => navigate('/')

  return (
    <div id='user-page-wrapper' className="page-wrapper">
      <AppHeader masthead={'Welcome'}
        leftButtonNames={[]}
        leftButtonFunctions={[]}
        rightButtonNames={['Logout']}
        rightButtonFunctions={[navigateMain]}/>
      
      {/*children*/}
      <UserContext.Provider value={{userData, setUserData, teamData, setTeamData, playerData, setPlayerData, pairData, setPairData, getAndSetPairs}}>
        {currentView === 'teams' && <Teams dispNewTeam={dispNewTeam} dispPlayers={dispPlayers}/>}
        {currentView === 'newTeam' && <NewTeam dispTeams={dispTeams}/>}
        {currentView === 'players' && <Players dispNewPlayer={dispNewPlayer} dispPairs={dispPairs}/>}
        {currentView === 'newPlayer' && <NewPlayer dispPlayers={dispPlayers}/>}
        {currentView === 'pairs' && <Pairs dispNewPair={dispNewPair}/>}
        {currentView === 'newPair' && <NewPair dispPairs={dispPairs}/>}
      </UserContext.Provider>
    </div>
  );
}