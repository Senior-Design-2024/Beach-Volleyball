import { useContext, useEffect, useState } from "react"
import { MatchContext } from "./Match"

export default function ServeReceive(props) {
  const {matchState, currentView, setCurrentView, serveOrder, pointData, setPointData, addEvent, handlePointEnds} = useContext(MatchContext)
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


  //handle submit
  const handleSubmit = (event) => {
    event.preventDefault()

    if(areNoneEqualTo(formData, -1)){
      console.log('point before adding', pointData)
      addEvent(formData)

      //useEffect will watch for changes on pointData
    }
    else{
      alert('select all options')
    }
  }

  useEffect( () => {
    if(formData.quality === 0 || formData.quality === 4){
      if( (formData.quality === 0 && player_in_order >= 2) ||
          (formData.quality === 4 && player_in_order <= 2) ){
        
            handlePointEnds(1)
      }
      else{
            handlePointEnds(0)
      }
    }
    else if(pointData.quality.length !== 0) {
      props.dispRally()
    }
  }, [pointData.quality])
  
  return(
    <div id='serve-receive'>
      <p>
        Us: {matchState.us_score}  
      </p>
      <p>
        Them: {matchState.them_score}
      </p>



      <form id='newUserForm' onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor='origin'>Origin:</label>

                <input type="radio" name="origin" id="origin_1" value="1" onChange={handleChange}/>
                <label htmlFor="origin_1">1</label>

                <input type="radio" name="origin" id="origin_2" value="2" onChange={handleChange}/>
                <label htmlFor="origin_2">2</label>

                <input type="radio" name="origin" id="origin_3" value="3" onChange={handleChange}/>
                <label htmlFor="origin_3">3</label>

                <input type="radio" name="origin" id="origin_4" value="4" onChange={handleChange}/>
                <label htmlFor="origin_4">4</label>

                <input type="radio" name="origin" id="origin_5" value="5" onChange={handleChange}/>
                <label htmlFor="origin_5">5</label>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='type'>Serve Type:</label>

                <input type="radio" name="type" id="type_0" value="0" onChange={handleChange}/>
                <label htmlFor="type_0">Top</label>

                <input type="radio" name="type" id="type_1" value="1" onChange={handleChange}/>
                <label htmlFor="type_1">Float</label>

                <input type="radio" name="type" id="type_2" value="2" onChange={handleChange}/>
                <label htmlFor="type_2">German</label>

                <input type="radio" name="type" id="type_3" value="3" onChange={handleChange}/>
                <label htmlFor="type_3">Sidespin</label>

                <input type="radio" name="type" id="type_4" value="4" onChange={handleChange}/>
                <label htmlFor="type_4">Skyball</label>

                <input type="radio" name="type" id="type_5" value="5" onChange={handleChange}/>
                <label htmlFor="type_5">Other</label>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='quality'>Quality:</label>

                <input type="radio" name="quality" id="error" value="0" onChange={handleChange}/>
                <label htmlFor="error">Error</label>

                <input type="radio" name="quality" id="sRating1" value="1" onChange={handleChange}/>
                <label htmlFor="sRating1">1</label>

                <input type="radio" name="quality" id="sRating2" value="2" onChange={handleChange}/>
                <label htmlFor="sRating2">2</label>

                <input type="radio" name="quality" id="sRating3" value="3" onChange={handleChange}/>
                <label htmlFor="sRating3">3</label>

                <input type="radio" name="quality" id="ace" value="4" onChange={handleChange}/>
                <label htmlFor="ace">ACE</label>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='destination'>Destination:</label>
              </td>
            </tr>
            <tr>
              <td>
                <input type="radio" name="destination" id="rLocation1" value="1" onChange={handleChange}/>
                <label htmlFor="rLocation1">1</label>

                <input type="radio" name="destination" id="rLocation2" value="2" onChange={handleChange}/>
                <label htmlFor="rLocation2">2</label>

                <input type="radio" name="destination" id="rLocation3" value="3" onChange={handleChange}/>
                <label htmlFor="rLocation3">3</label>
              </td>
            </tr>
            <tr>
              <td>
                <input type="radio" name="destination" id="rLocation4" value="4" onChange={handleChange}/>
                <label htmlFor="rLocation4">4</label>

                <input type="radio" name="destination" id="rLocation5" value="5" onChange={handleChange}/>
                <label htmlFor="rLocation5">5</label>

                <input type="radio" name="destination" id="rLocation6" value="6" onChange={handleChange}/>
                <label htmlFor="rLocation6">6</label>
              </td>
            </tr>
            <tr>
              <td>
                <input type="radio" name="destination" id="rLocation7" value="7" onChange={handleChange}/>
                <label htmlFor="rLocation7">7</label>
              
                <input type="radio" name="destination" id="rLocation8" value="8" onChange={handleChange}/>
                <label htmlFor="rLocation8">8</label>

                <input type="radio" name="destination" id="rLocation9" value="9" onChange={handleChange}/>
                <label htmlFor="rLocation9">9</label>
              </td>
            </tr>
            <tr>
              <td>
              <input type="radio" name="destination" id="net" value="10" onChange={handleChange}/>
                <label htmlFor="net">Net</label>

                <input type="radio" name="destination" id="wideRight" value="11" onChange={handleChange}/>
                <label htmlFor="wideRight">Wide Right</label>

                <input type="radio" name="destination" id="wideLeft" value="12" onChange={handleChange}/>
                <label htmlFor="wideLeft">Wide Left</label>

                <input type="radio" name="destination" id="long" value="13" onChange={handleChange}/>
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
    </div>
  )
}