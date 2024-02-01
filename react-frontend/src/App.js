import React, {useState, useEffect} from 'react'
import "./App.css"

/*
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button style={CSS_Button} onClick={handleClick}>
      test
    </button>
  );
} 
*/




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

  /* need a comment on what this is doing */
  return (
    <div className="testStyle">
      
      {(typeof data.message === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        <p>test</p>
      )
      }

    </div>
  );
}