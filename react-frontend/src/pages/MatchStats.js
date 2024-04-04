import { useNavigate, useLocation } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import MatchStatsTable from '../components/MatchStatsTable';
import AppHeader from '../components/AppHeader';
import { useState, useEffect } from 'react';

export default function MatchStats() {
  const location = useLocation();

  const teamId = location.state.teamId;
  const pairId = location.state.pairId;
  const matchId = location.state.matchId;

  const navigate = useNavigate();
  const navigateMatches = () => navigate('/Matches', {state: {teamId: teamId, pairId: pairId}});
  const navigateEditMatch = () => navigate('/EditMatch');

  //player, action, type, quality, origin, dest
  const [spoof, setSpoof] = useState([[], [] ,[] ,[] ,[] ,[]]);

  //GETs spoof
  useEffect(() => {
    const getSpoof = async () => {
      try{ 
        const response = await fetch(`/pullmatch`, {
          method: 'GET',
        });

        const responseJson = await response.json();

        if(responseJson) {
          console.log(responseJson);
          setSpoof(responseJson);
          console.log(spoof);
        } else {
          console.error('Invalid response data');
        }

      } catch (error) {
        console.error('Error with getSpoof', error);
      } 
    }
    getSpoof();
  }, []);


  //html
  return (
    <div id='page-wrapper' className='page-wrapper'>
      <AppHeader masthead='Match stats'
        leftButtonNames={['Edit match']}
        leftButtonFunctions={[navigateEditMatch]}
        rightButtonNames={['back to matches']}
        rightButtonFunctions={[navigateMatches]}
      />

      <table id='spoof' style={{width:'99%', border:'1px solid black', margin:'.5%'}}>
        <tr id='headings'>
          <th>Player</th>
          <th>Action</th>
          <th>Type</th>
          <th>Quality</th>
          <th>Origin</th>
          <th>Destination</th>
        </tr>
        {spoof[0].map( (long, i) => (
          <tr key='i' style={{backgroundColor: i % 2 === 0 ? '#f0f0f0' : '#ffffff'}}>
          {spoof.map( (short, index) => (
            <td key={index} style={{textAlign:'center'}}>{spoof[index][i]}</td>
          ))}
          </tr>
        ))}
      </table>
    </div>
  );
}