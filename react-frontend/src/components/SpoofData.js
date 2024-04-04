import React from 'react';

function SpoofData({ spoofData }) {
  return (
    <div id='page-wrapper' className='page-wrapper'>


      <table id='spoof' style={{width:'99%', border:'1px solid black', margin:'.5%'}}>
        <tr id='headings'>
          <th>Player</th>
          <th>Action</th>
          <th>Type</th>
          <th>Quality</th>
          <th>Origin</th>
          <th>Destination</th>
        </tr>
        {spoofData[0].map((long, i) => (
          <tr key={i} style={{backgroundColor: i % 2 === 0 ? '#f0f0f0' : '#ffffff'}}>
            {spoofData.map((short, index) => (
              <td key={index} style={{textAlign:'center'}}>{spoofData[index][i]}</td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}

export default SpoofData;
