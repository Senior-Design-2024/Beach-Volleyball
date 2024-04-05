import { useNavigate, useLocation } from 'react-router-dom';
import { BasicButton } from '../components/basic_components'
import MatchStatsTable from '../components/MatchStatsTable';
import AppHeader from '../components/AppHeader';
import { useState, useEffect } from 'react';

export default function MatchStats() {
  console.log('1')
  const location = useLocation();

  const teamId = location.state.teamId;
  const pairId = location.state.pairId;
  const matchId = location.state.matchId;

  const navigate = useNavigate();
  const navigateMatches = () => navigate('/Matches', {state: {teamId: teamId, pairId: pairId}});
  const navigateEditMatch = () => navigate('/EditMatch');

  //player, action, type, quality, origin, dest
  const [actions, setActions] = useState([[], [] ,[] ,[] ,[] ,[]]);

  //html
  return (
    <div id='page-wrapper' className='page-wrapper'>
      <AppHeader masthead='Match stats'
        leftButtonNames={['Edit match']}
        leftButtonFunctions={[navigateEditMatch]}
        rightButtonNames={['back to matches']}
        rightButtonFunctions={[navigateMatches]}
      />

      <table id='actions' style={{width:'99%', border:'1px solid black', margin:'.5%'}}>
        <tr id='headings'>
          <th>Player</th>
          <th>Action</th>
          <th>Type</th>
          <th>Quality</th>
          <th>Origin</th>
          <th>Destination</th>
        </tr>
        {actions[0].map( (long, i) => (
          <tr key='i' style={{backgroundColor: i % 2 === 0 ? '#f0f0f0' : '#ffffff'}}>
          {actions.map( (short, index) => (
            <td key={index} style={{textAlign:'center'}}>{actions[index][i]}</td>
          ))}
          </tr>
        ))}
      </table>
    </div>
  );
}