import { useContext, useEffect, useState } from "react";
import { MatchContext } from "./Match";

export default function Rally(props) {
  const {serveOrder, matchState, player1Data, player2Data, currentView, setCurrentView} = useContext(MatchContext)

  const player_in_order = serveOrder[matchState.e_index % 4]
  const [formData, setFormData] = useState({
    destination: -1,
    origin: -1,
    quality: -1,
    type: -1,
    action: -1,
    player: -1,
  })

  function areNoneEqualTo(obj, value) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (obj[key] === value) {
          return false;
        }
      }
    }
    return true
  }

  const handleChangePlayer = (event) => {
    const { name, value } = event.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: parseInt(value, 10), 
    }));
  }

  const handleChangeThem = (event) => {
    const { name, value } = event.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: parseInt(value, 10), 
      action: 8,
      player: 3, //could also make this 4, we don't care which opponent
    }));
  }

  const handleChangeAttack = (event) => {
    const { name, value } = event.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: parseInt(value, 10), 
      action: 3
    }));
  }

  const handleChangeOption = (event) => {
    const { name, value } = event.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: parseInt(value, 10), 
      action: 4
    }));
  }
  
  const handleChangeSet = (event) => {
    const { name, value } = event.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: parseInt(value, 10), 
      action: 5
    }));
  }

  const handleChangeDig = (event) => {
    const { name, value } = event.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: parseInt(value, 10),
      action: 6 
    }));
  }

  const handleChangeBlock = (event) => {
    const { name, value } = event.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: parseInt(value, 10), 
      action: 7
    }));
  }


  const handleChangeDetails = (event) => {
    const { name, value } = event.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: parseInt(value, 10), 
    }));
  }



  useEffect( () => {
    const {destination, origin, quality, ...remainder} = formData
    if(areNoneEqualTo(formData, -1)){
      console.log('rally end not implemented')
    }
    else if(areNoneEqualTo(remainder, -1)){
      props.dispRallyDetails()
    }
  }, [formData])



  const handleSubmit = (event) => {
    event.preventDefault(event)
    console.log('handle rally submit not implemented')
  }

  return(
    <div id='rally'>

      {currentView === 'rally' &&
        <form id='rallyForm' onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor='player'>Player:</label> 

                  <input type="radio" name="player" id="player1" value="1" onChange={handleChangePlayer}/>
                  <label htmlFor="player1">{player1Data.name}</label>

                  <input type="radio" name="player" id="player2" value="2" onChange={handleChangePlayer}/>
                  <label htmlFor="player2">{player2Data.name}</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor='type'>Attack:</label> 

                  <input type="radio" name="type" id="aSwing" value="swing" onChange={handleChangeAttack}/>
                  <label htmlFor="aSwing">SWING</label>

                  <input type="radio" name="type" id="aRoll" value="roll" onChange={handleChangeAttack}/>
                  <label htmlFor="aRoll">ROLL</label>

                  <input type="radio" name="type" id="aPoke" value="poke" onChange={handleChangeAttack}/>
                  <label htmlFor="aPoke">POKE</label>

                  <input type="radio" name="type" id="aBump" value="bump" onChange={handleChangeAttack}/>
                  <label htmlFor="aBump">BUMP</label>

                  <input type="radio" name="type" id="aSet" value="set" onChange={handleChangeAttack}/>
                  <label htmlFor="aSet">SET</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor='type'>Option:</label> 

                  <input type="radio" name="type" id="oSwing" value="swing" onChange={handleChangeOption}/>
                  <label htmlFor="oSwing">SWING</label>

                  <input type="radio" name="type" id="oRoll" value="roll" onChange={handleChangeOption}/>
                  <label htmlFor="oRoll">ROLL</label>

                  <input type="radio" name="type" id="oPoke" value="poke" onChange={handleChangeOption}/>
                  <label htmlFor="oPoke">POKE</label>

                  <input type="radio" name="type" id="oBump" value="bump" onChange={handleChangeOption}/>
                  <label htmlFor="oBump">BUMP</label>

                  <input type="radio" name="type" id="oSet" value="set" onChange={handleChangeOption}/>
                  <label htmlFor="oSet">SET</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor='type'>Set:</label> 

                  <input type="radio" name="type" id="platform" value="platform" onChange={handleChangeSet}/>
                  <label htmlFor="platform">PLATFORM</label>

                  <input type="radio" name="type" id="error" value="error" onChange={handleChangeSet}/>
                  <label htmlFor="error">ERROR</label>

                  <input type="radio" name="type" id="-" value="-" onChange={handleChangeSet}/>
                  <label htmlFor="-">-</label>

                  <input type="radio" name="type" id="0" value="0" onChange={handleChangeSet}/>
                  <label htmlFor="0">0</label>

                  <input type="radio" name="type" id="+" value="+" onChange={handleChangeSet}/>
                  <label htmlFor="+">+</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor='type'>Dig:</label> 

                  <input type="radio" name="type" id="dSwing" value="swing" onChange={handleChangeDig}/>
                  <label htmlFor="dSwing">SWING</label>

                  <input type="radio" name="type" id="dRoll" value="roll" onChange={handleChangeDig}/>
                  <label htmlFor="dRoll">ROLL</label>

                  <input type="radio" name="type" id="dPoke" value="poke" onChange={handleChangeDig}/>
                  <label htmlFor="dPoke">POKE</label>

                  <input type="radio" name="type" id="dBump" value="bump" onChange={handleChangeDig}/>
                  <label htmlFor="dBump">BUMP</label>

                  <input type="radio" name="type" id="dSet" value="set" onChange={handleChangeDig}/>
                  <label htmlFor="dSet">SET</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor='type'>Block:</label>

                  <input type="radio" name="type" id="overpass" value="overpass" onChange={handleChangeBlock}/>
                  <label htmlFor="overpass">Overpass</label>

                  <input type="radio" name="type" id="term" value="term" onChange={handleChangeBlock}/>
                  <label htmlFor="term">Term</label>

                  <input type="radio" name="type" id="control" value="control" onChange={handleChangeBlock}/>
                  <label htmlFor="control">Control</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor='type'>Them:</label>

                  <input type="radio" name="type" id="ATTACK Error" value="typeError" onChange={handleChangeThem}/>
                  <label htmlFor="typeError">type ERROR</label>

                  <input type="radio" name="type" id="fault" value="fault" onChange={handleChangeThem}/>
                  <label htmlFor="fault">FAULT</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="submit"></input>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      }



      {currentView === 'rallyDetails' &&
        <form id='rallyDetailsForm' onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor='quality'>Quality:</label> 

                  <input type="radio" name="quality" id="0" value="0" onChange={handleChangeDetails}/>
                  <label htmlFor="0" style={{width:'50px'}}>ERROR</label>

                  <input type="radio" name="quality" id="1" value="1" onChange={handleChangeDetails}/>
                  <label htmlFor="1" style={{width:'50px'}}>1</label>

                  <input type="radio" name="quality" id="2" value="2" onChange={handleChangeDetails}/>
                  <label htmlFor="2" style={{width:'50px'}}>2</label>

                  <input type="radio" name="quality" id="3" value="3" onChange={handleChangeDetails}/>
                  <label htmlFor="3" style={{width:'50px'}}>3</label>

                  <input type="radio" name="quality" id="4" value="4" onChange={handleChangeDetails}/>
                  <label htmlFor="4" style={{width:'50px'}}>KILL</label>
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor='origin'>origin:</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="radio" name="origin" id="aLocation1" value="1" onChange={handleChangeDetails}/>
                  <label htmlFor="aLocation1">1</label>

                  <input type="radio" name="origin" id="aLocation2" value="2" onChange={handleChangeDetails}/>
                  <label htmlFor="aLocation2">2</label>

                  <input type="radio" name="origin" id="aLocation3" value="3" onChange={handleChangeDetails}/>
                  <label htmlFor="aLocation3">3</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="radio" name="origin" id="aLocation4" value="4" onChange={handleChangeDetails}/>
                  <label htmlFor="aLocation4">4</label>

                  <input type="radio" name="origin" id="aLocation5" value="5" onChange={handleChangeDetails}/>
                  <label htmlFor="aLocation5">5</label>

                  <input type="radio" name="origin" id="aLocation6" value="6" onChange={handleChangeDetails}/>
                  <label htmlFor="aLocation6">6</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="radio" name="origin" id="aLocation7" value="7" onChange={handleChangeDetails}/>
                  <label htmlFor="aLocation7">7</label>
                
                  <input type="radio" name="origin" id="aLocation8" value="8" onChange={handleChangeDetails}/>
                  <label htmlFor="aLocation8">8</label>

                  <input type="radio" name="origin" id="aLocation9" value="9" onChange={handleChangeDetails}/>
                  <label htmlFor="aLocation9">9</label>
                </td>
              </tr>


              <tr>
              <td>
                <label htmlFor='destination'>Destination:</label>
              </td>
            </tr>
            <tr>
              <td>
                <input type="radio" name="destination" id="rLocation1" value="1" onChange={handleChangeDetails}/>
                <label htmlFor="rLocation1">1</label>

                <input type="radio" name="destination" id="rLocation2" value="2" onChange={handleChangeDetails}/>
                <label htmlFor="rLocation2">2</label>

                <input type="radio" name="destination" id="rLocation3" value="3" onChange={handleChangeDetails}/>
                <label htmlFor="rLocation3">3</label>
              </td>
            </tr>
            <tr>
              <td>
                <input type="radio" name="destination" id="rLocation4" value="4" onChange={handleChangeDetails}/>
                <label htmlFor="rLocation4">4</label>

                <input type="radio" name="destination" id="rLocation5" value="5" onChange={handleChangeDetails}/>
                <label htmlFor="rLocation5">5</label>

                <input type="radio" name="destination" id="rLocation6" value="6" onChange={handleChangeDetails}/>
                <label htmlFor="rLocation6">6</label>
              </td>
            </tr>
            <tr>
              <td>
                <input type="radio" name="destination" id="rLocation7" value="7" onChange={handleChangeDetails}/>
                <label htmlFor="rLocation7">7</label>
              
                <input type="radio" name="destination" id="rLocation8" value="8" onChange={handleChangeDetails}/>
                <label htmlFor="rLocation8">8</label>

                <input type="radio" name="destination" id="rLocation9" value="9" onChange={handleChangeDetails}/>
                <label htmlFor="rLocation9">9</label>
              </td>
            </tr>
            <tr>
              <td>
              <input type="radio" name="destination" id="net" value="10" onChange={handleChangeDetails}/>
                <label htmlFor="net">Net</label>

                <input type="radio" name="destination" id="wideRight" value="11" onChange={handleChangeDetails}/>
                <label htmlFor="wideRight">Wide Right</label>

                <input type="radio" name="destination" id="wideLeft" value="12" onChange={handleChangeDetails}/>
                <label htmlFor="wideLeft">Wide Left</label>

                <input type="radio" name="destination" id="long" value="13" onChange={handleChangeDetails}/>
                <label htmlFor="long">Long</label>
              </td>
            </tr>

              <tr>
                <td>
                  <input type="submit"></input>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      }
    </div>
  )
}