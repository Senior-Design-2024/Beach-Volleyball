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
        <h1 id='masthead' className='masthead'>Beach Volleyball Stats App</h1>
        <div id='nav-bar' className='nav-bar'>
          <button id='home' className='nav-button' onClick={navigateHome}>Home</button>
          <button id='login' className='nav-button' onClick={navigateLogin}>Login</button>
        </div>
      </header>
    )
}