import { useState } from 'react';
import '../App.css'
import AppHeader from '../components/AppHeader';
import Home from './Home';
import NewUser from './NewUser';
import Login from './Login';
import { useNavigate } from 'react-router-dom';

export default function Main() {
  const [currentView, setCurrentView] = useState('home')

  const dispHome = () => {setCurrentView('home')}
  const dispCreateAccount = () => {setCurrentView('newuser')}
  const dispLogin = () => {setCurrentView('login')}

  const navigate = useNavigate();
  const navigateUser = (user) => {
    navigate('/User', {state: {user: user}})
  }
  
  //html
  return (
    <div id='main-page-wrapper' className='page-wrapper'>
      <AppHeader masthead={'Beach Volleyball Stats App'}
        leftButtonNames={['Home', 'Create Account']}
        leftButtonFunctions={[dispHome, dispCreateAccount]}
        rightButtonNames={['Login']}
        rightButtonFunctions={[dispLogin]}/>

      {currentView === 'home' && <Home/>}
      {currentView === 'newuser' && <NewUser dispLogin={dispLogin}/>}
      {currentView === 'login' && <Login navigateUser={navigateUser}/>}
    </div>
  );
}