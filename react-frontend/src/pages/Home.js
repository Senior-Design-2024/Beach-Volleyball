import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import '../App.css'

//////////////////
export default function Home() {
  const [data, setData] = useState([{}])


  // need a comment on what this is doing
  useEffect(() => {
    fetch("/test").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  //const handleClick = () => console.log("clicked")
  const navigate = useNavigate();
  const navigateLogin = () => navigate('/Login');

  /* need a comment on what this is doing */
  return (
    <div>
      {/* this changes the message based on whether we are connected to flask*/}
      {(typeof data.message === 'undefined') ? (
        <>
          <p>Home page</p>
          <BasicButton onClick={navigateLogin} buttonText='Go to login'></BasicButton>
        </>
      ) : (
        <p>connected to flask</p>
      )
      }
    </div>
  );
}