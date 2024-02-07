import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import '../App.css'

//////////////////
export default function Home() {
/*
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
  */

  //const handleClick = () => console.log("clicked")
  const navigate = useNavigate();
  const handleClick = () => navigate('/test');
  /* need a comment on what this is doing */
  return (
    <div>
      <BasicButton onClick={handleClick} buttonText={"ugh"}></BasicButton>


      {/* this changes the message based on whether we are connected to flask 
      {(typeof data.message === 'undefined') ? (
        <Test1 />
      ) : (
        <p>test</p>
      )
      }
      */}
    </div>
  );
}