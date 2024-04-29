import '../App.css'
import AppHeader from '../components/AppHeader';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import Teams from './Teams';
import NewTeam from './NewTeam';
import { useLocation } from 'react-router-dom';
import { findRequest, getAndSetArr } from '../utils';
import Players from './Players';
import NewPlayer from './NewPlayer';
import Pairs from './Pairs';
import NewPair from './NewPair';
import '../utils';

export const UserContext = createContext();

export default function User() {
  //data
  const location = useLocation()
  const user_id = location.state.user_id

  const [teams, setTeams] = useState([])
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

  //GETs the teams and setTeams
  const getTeams = () => {
    console.log('run getTeams')
    findRequest('team', 'user_id', user_id).then(
      (teams) => {
        setTeams(teams)
      }).catch(
        (error) => {
          console.error('Error:', error)
        }
    )
  }
  useEffect(() => {
    getTeams()
  }, [user_id]);

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
  const [currentView, setCurrentView] = useState('teams')
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
      <UserContext.Provider value={{user_id, teams, setTeams, getTeams, teamData, setTeamData, getPlayers, playerData, setPlayerData, pairData, setPairData, getPairs, getAndSetPairs}}>
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