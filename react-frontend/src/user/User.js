import '../App.css'
import AppHeader from '../components/AppHeader';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import { useLocation } from 'react-router-dom';
import { findRequest, getAndSetArr, getAndSetObj} from '../utils';

export const UserContext = createContext();

export default function User() {
  //data
  const location = useLocation()

  const [user, setUser] = useState({
    id: null,
    username: null,
    email: null,
    teams: null,
  })
  const [team, setTeam] = useState({
    team_name: null,
    team_id: null,
    players: null,
    pairs: null,
  })
  const [player, setPlayer] = useState({
    player_id: null,
    player_name: null,
    description: null,
    matches: null,
  })
  const [pair, setPair] = useState({
    player1_id: null,
    player2_id: null,
    matches: null,
  })

  // Initialize the user
  //set user when we get it from location
  useEffect( () => {
    setUser(location.state.user)
  }, [location.state.user])

  //now that user.id has updated, fetch the teams
  useEffect( () => {
    if(user.id){
      getAndSetArr('team', 'user_id', user.id, setUser)
    }
  }, [user.id])

  //any time we modify teams and its an array, lets dispTeams
  useEffect( () => {
    if(Array.isArray(user.teams)){
      setCurrentView('teams')
    }
  }, [user.teams])

  const [currentView, setCurrentView] = useState('')

  /*
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
    }
  }, [userData.user_id]);

  */
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
      <UserContext.Provider value={{}}>
        {/*}
        {currentView === 'teams' && <Teams dispNewTeam={dispNewTeam} dispPlayers={dispPlayers}/>}
        {currentView === 'newTeam' && <NewTeam dispTeams={dispTeams}/>}
        {currentView === 'players' && <Players dispNewPlayer={dispNewPlayer} dispPairs={dispPairs}/>}
        {currentView === 'newPlayer' && <NewPlayer dispPlayers={dispPlayers}/>}
        {currentView === 'pairs' && <Pairs dispNewPair={dispNewPair}/>}
        {currentView === 'newPair' && <NewPair dispPairs={dispPairs}/>}
      */}
      </UserContext.Provider>
    </div>
  );
}