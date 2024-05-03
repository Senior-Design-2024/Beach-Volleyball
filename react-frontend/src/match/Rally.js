import { useContext, useState } from "react";
import { MatchContext } from "./Match";

export default function Rally() {
  const {serveOrder, matchState} = useContext(MatchContext)

  const player_in_order = serveOrder[matchState.e_index % 4]
  const [formData, setFormData] = useState({
    destination: -1,
    origin: -1,
    quality: -1,
    type: -1,
    action: player_in_order<=2 ? 1 : 2,
    player: player_in_order,
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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: parseInt(value, 10), 
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('handle rally submit not implemented')
  }

  return(
    <div id='rally'>
      <form id='rallyForm' onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor='player'>Player:</label> 

                <input type="radio" name="player" id="player1" value="1" onChange={handleChange}/>
                <label htmlFor="player1">Player 1</label>

                <input type="radio" name="player" id="player2" value="2" onChange={handleChange}/>
                <label htmlFor="player2">Player 2</label>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='attack'>Attack:</label> 

                <input type="radio" name="attack" id="aSwing" value="swing" onChange={handleChange}/>
                <label htmlFor="aSwing">SWING</label>

                <input type="radio" name="attack" id="aRoll" value="roll" onChange={handleChange}/>
                <label htmlFor="aRoll">ROLL</label>

                <input type="radio" name="attack" id="aPoke" value="poke" onChange={handleChange}/>
                <label htmlFor="aPoke">POKE</label>

                <input type="radio" name="attack" id="aBump" value="bump" onChange={handleChange}/>
                <label htmlFor="aBump">BUMP</label>

                <input type="radio" name="attack" id="aSet" value="set" onChange={handleChange}/>
                <label htmlFor="aSet">SET</label>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='option'>Option:</label> 

                <input type="radio" name="option" id="oSwing" value="swing" onChange={handleChange}/>
                <label htmlFor="oSwing">SWING</label>

                <input type="radio" name="option" id="oRoll" value="roll" onChange={handleChange}/>
                <label htmlFor="oRoll">ROLL</label>

                <input type="radio" name="option" id="oPoke" value="poke" onChange={handleChange}/>
                <label htmlFor="oPoke">POKE</label>

                <input type="radio" name="option" id="oBump" value="bump" onChange={handleChange}/>
                <label htmlFor="oBump">BUMP</label>

                <input type="radio" name="option" id="oSet" value="set" onChange={handleChange}/>
                <label htmlFor="oSet">SET</label>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='set'>Set:</label> 

                <input type="radio" name="set" id="platform" value="platform" onChange={handleChange}/>
                <label htmlFor="platform">PLATFORM</label>

                <input type="radio" name="set" id="error" value="error" onChange={handleChange}/>
                <label htmlFor="error">ERROR</label>

                <input type="radio" name="set" id="-" value="-" onChange={handleChange}/>
                <label htmlFor="-">-</label>

                <input type="radio" name="set" id="0" value="0" onChange={handleChange}/>
                <label htmlFor="0">0</label>

                <input type="radio" name="set" id="+" value="+" onChange={handleChange}/>
                <label htmlFor="+">+</label>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='dig'>Dig:</label> 

                <input type="radio" name="dig" id="dSwing" value="swing" onChange={handleChange}/>
                <label htmlFor="dSwing">SWING</label>

                <input type="radio" name="dig" id="dRoll" value="roll" onChange={handleChange}/>
                <label htmlFor="dRoll">ROLL</label>

                <input type="radio" name="dig" id="dPoke" value="poke" onChange={handleChange}/>
                <label htmlFor="dPoke">POKE</label>

                <input type="radio" name="dig" id="dBump" value="bump" onChange={handleChange}/>
                <label htmlFor="dBump">BUMP</label>

                <input type="radio" name="dig" id="dSet" value="set" onChange={handleChange}/>
                <label htmlFor="dSet">SET</label>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='block'>Block:</label>

                <input type="radio" name="block" id="overpass" value="overpass" onChange={handleChange}/>
                <label htmlFor="overpass">Overpass</label>

                <input type="radio" name="block" id="term" value="term" onChange={handleChange}/>
                <label htmlFor="term">Term</label>

                <input type="radio" name="block" id="control" value="control" onChange={handleChange}/>
                <label htmlFor="control">Control</label>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='them'>Them:</label>

                <input type="radio" name="them" id="attackError" value="attackError" onChange={handleChange}/>
                <label htmlFor="attackError">ATTACK ERROR</label>

                <input type="radio" name="them" id="fault" value="fault" onChange={handleChange}/>
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
    </div>
  )
}