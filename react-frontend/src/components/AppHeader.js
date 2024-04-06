import React from 'react'
import '../App.css'

export default function AppHeader({masthead, leftButtonNames=[''], leftButtonFunctions=[], rightButtonNames=[''], rightButtonFunctions=[]}) {

    //html
    return(
      <header id='header' className='header'>
        <h1 id='masthead' className='masthead'>{masthead}</h1>
        <div id='nav-bar' className='nav-bar'>
          <div id='nav-bar-left' className='nav-left'>
            {leftButtonNames.map(( (name, index) => (
              <button key={name} id='left-nav-button' className='nav-button' onClick={leftButtonFunctions[index]}>{name}</button>
            )))}
          </div>
          <div id='nav-bar-right' className='nav-right'>
            {rightButtonNames.map(( (name, index) => (
              <button key={name} id='right-nav-button' className='nav-button' onClick={rightButtonFunctions[index]}>{name}</button>
            )))}
          </div>
        </div>
      </header>
    )
}