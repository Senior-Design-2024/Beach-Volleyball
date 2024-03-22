import React from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';

export default function Home() {
  const navigate = useNavigate();
  const navigateHome = () => navigate('/');
  const navigateLogin = () => navigate('/Login');
  
  //html
  return (
    <div id='page-wrapper' className='page-wrapper'>
      <AppHeader masthead={'Beach Volleyball Stats App'}
        leftButtonNames={['Home']}
        leftButtonFunctions={[navigateHome]}
        rightButtonNames={['Login']}
        rightButtonFunctions={[navigateLogin]}/>
      <h1>About us</h1>
      <p>
          Beach volleyball stats app is a senior design project being built by Bear Moran and Ryland Seagraves at the request of Buzz Patrick.
        We are seniors at the University of Tennessee Knoxville.
        We entered this project with little experience with the tools we have used and the skills to design and create a web app, but we are learning a lot!
        <br/>
          This app is under heavy development. If you are seeing this page, you are most likely part of the development or testing team, know them personally, or are a bot scraping the internet.
        In the latter case, we have nothing of interest for you, so it is best you move along.
        If you are viewing this page on the internet, a special thanks goes out to Ryland for getting AWS up and running.
        <br/>
          {/*Feel free to explore. The following image may be helpful for navigating the aqua buttons.*/}
      </p>
      {/*
      <img src='../images/bvsa_flowchart.png' alt='bvsa_flowchart'></img>
  */}
    </div>
  );
}