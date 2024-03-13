import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css'
import './AppHeader.css'

export default function AppHeader() {
    const navigate = useNavigate();
    const navigateHome = () => navigate('/');
    const navigateLogin = () => navigate('/Login');

    //html
    return(
        <header id='header' className='header'>
          <h1 id='masthead' style={{textAlign: 'center'}}>Beach Volleyball Stats App</h1>
          <div id='nav-bar' className='navBar'>
            <button id='home' className='navButton' onClick={navigateHome}>Home</button>
            <button id='login' className='navButton' onClick={navigateLogin}>Login</button>
          </div>
        </header>
    )
}