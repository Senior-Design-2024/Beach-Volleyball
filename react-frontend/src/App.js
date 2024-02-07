import React, {useState, useEffect} from 'react'
import "./App.css"
import { BasicButton } from './components/basic_components'

//////////////////
export default function App() {
  const [data, setData] = useState([{}])


  /* need a comment on what this is doing */
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

  const handleClick = () => console.log("clicked")

  /* need a comment on what this is doing */
  return (
    <div className="testStyle">
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