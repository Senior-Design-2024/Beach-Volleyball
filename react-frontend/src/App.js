import React, {useState, useEffect} from 'react'


function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
} 




//////////////////
export default function App() {
  const [data, setData] = useState([{}])

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

  return (
    <div>
      
      {(typeof data.message === 'undefined') ? (
        <p>Loading...</p>
      ) : (
          <MyButton />
      )
      }

    </div>
  );
}