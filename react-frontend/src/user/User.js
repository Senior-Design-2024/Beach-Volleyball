import '../App.css'
import AppHeader from '../components/AppHeader';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Teams from './Teams';
import { useLocation } from 'react-router-dom';

export default function User() {
  const location = useLocation()
  const user_id = location.user_id

  const [currentView, setCurrentView] = useState('teams')
  const dispTeams = () => {setCurrentView('teams')}

  const navigate = useNavigate()
  const navigateMain = () => navigate('/')

  return (
    <div id='user-page-wrapper' className="page-wrapper">
      <AppHeader masthead={'Welcome'}
        leftButtonNames={[]}
        leftButtonFunctions={[]}
        rightButtonNames={['Logout']}
        rightButtonFunctions={[navigateMain]}/>

      {currentView === 'teams' && <Teams/>}
    </div>
  );
}