import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css'
import './UserHeader.css'

export default function UserHeader() {
    const navigate = useNavigate();
    const navigateHome = () => navigate('/');
    const navigateLogin = () => navigate('/Login');

    //html
    return(
      <header id='header' className='header'>
        <div id='nav-bar' className='nav-bar'>
          <div id='nav-bar-left' className='nav-left'>
          <button id='home' className='nav-button' onClick={navigateHome}>Home</button>
          </div>
          
          <div id='nav-bar-right' className='nav-right'>
          <button id='login' className='nav-button' onClick={navigateLogin}>Login</button>
          </div>
          
          
        </div>
      </header>
    )
}