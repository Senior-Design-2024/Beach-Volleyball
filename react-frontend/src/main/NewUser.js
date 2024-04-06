import { useState } from "react"
import { postRequest } from '../utils'

export default function NewUser({dispLogin}) {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
  })

  const handleChange = (event) => {
    const {name, value} = event.target;

    setUserInfo(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    postRequest(userInfo, 'adduser');

    dispLogin();
  }

  return(
    <div id='new-user'>
      <form id='newUserForm' onSubmit={handleSubmit} autoComplete='off'>
          <table>
            <tbody>
              <tr>
                <td>
                  <label className='label' htmlFor='username'>Username:</label><input type='text' id='username' name='username' onChange={handleChange}></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label className='label' htmlFor='email'>Email:</label><input type='text' id='email' name='email' onChange={handleChange}></input>
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