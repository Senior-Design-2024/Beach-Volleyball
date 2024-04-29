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

  // Function to fetch teams from the server and update userData
  const fetchAndSetTeams = async (user_id) => {
    try {
      await getAndSetArr('team', 'user_id', user_id, setUserData, 'teams');
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  useEffect(() => {
    // Check if location state has user_id
    if (location.state && location.state.user_id) {
      // Update userData with user_id from location state
      setUserData((prevUserData) => ({
        ...prevUserData,
        user_id: location.state.user_id,
      }));
    }
  }, [location.state]);

  useEffect(() => {
    // If user_id is available, fetch and set teams
    if (userData.user_id !== null) {
      fetchAndSetTeams(userData.user_id);
    }
  }, [userData.user_id]);

  useEffect(() => {
    if(userData.teams.length != 0){
      dispTeams()
    }
  }, [userData.teams])

  //getPlayers
  const getPlayers = () => {
    console.log('run getPlayers')
    findRequest('player', 'team_id', teamData.team_id).then(
      (players) => {
        setTeamData(prevState => ({
          ...prevState,
          players: players,
        }));
      }).catch(
        (error) => {
          console.error('Error', error);
        }
    );
  };
  useEffect(() => {
    if (teamData.team_id !== -1) {
      getPlayers();
    }
  }, [teamData.team_id]);

  //getPairs

  const getPairs = () => {
    console.log('run getPairs')
    findRequest('pair', 'team_id', teamData.team_id).then(
      (pairs) => {
        setTeamData(prevState => ({
          ...prevState,
          pairs: pairs,
        }));
      }).catch(
        (error) => {
          console.error('Error', error);
        }
    );
  };

  const getAndSetPairs = () => getAndSetArr('pair', 'team_id', teamData.team_id, setTeamData, 'pairs')
  useEffect(() => {
    if (teamData.team_id !== -1) {
      getPairs();
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
      <UserContext.Provider value={{userData, setUserData, teamData, setTeamData, getPlayers, playerData, setPlayerData, pairData, setPairData, getPairs, getAndSetPairs}}>
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