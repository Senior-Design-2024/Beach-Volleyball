import '../App.css'
import AppHeader from '../components/AppHeader';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import Teams from './Teams';
import NewTeam from './NewTeam';
import { useLocation } from 'react-router-dom';
import { findRequest } from '../utils';
import Players from './Players';

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
  })

  //GETs the teams and setTeams
  const getTeams = () => {
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

  useEffect(() => {
    const getPlayers = () => {
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
    console.log('slkj')
    if (teamData.team_id !== -1) {
      getPlayers();
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
      <UserContext.Provider value={{user_id, teams, setTeams, getTeams, teamData, setTeamData}}>
        {currentView === 'teams' && <Teams dispNewTeam={dispNewTeam} dispPlayers={dispPlayers}/>}
        {currentView === 'newTeam' && <NewTeam dispTeams={dispTeams}/>}
        {currentView === 'players' && <Players/>}
      </UserContext.Provider>
    </div>
  );
}