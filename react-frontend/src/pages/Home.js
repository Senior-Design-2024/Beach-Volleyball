import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import '../App.css'

//////////////////
export default function Home() {
  const [data, setData] = useState([{}])

  const navigate = useNavigate();
  const navigateLogin = () => navigate('/Login');
  const navigateNewUser = () => navigate('/NewUser')

  /* need a comment on what this is doing */
  return (
    <div>
      {/* this changes the message based on whether we are connected to flask*/}
      {(typeof data.message === 'undefined') ? (
        <>
          <h1>Beach Volleyball Stats App</h1>
          <BasicButton onClick={navigateNewUser} buttonText='New User'></BasicButton>
          <br/>
          <BasicButton onClick={navigateLogin} buttonText='Go to login'></BasicButton>
        </>
      ) : (
        <p>connected to flask</p>
      )
      }
    </div>
  );
}