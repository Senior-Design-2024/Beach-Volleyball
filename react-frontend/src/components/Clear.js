import React from 'react';
import { BasicButton } from './basic_components';

export default function Clear() { 
  const clear = async () => {
    try{
      const response = await fetch(`/clear`, {
        method: 'DELETE',
      });

    console.log(response);

    } catch (error) {
      console.error('Error with getTeams', error);
    }
  }

  //html
  return(
    <BasicButton buttonText='CLEAR DATABASE' onClick={clear}/>
  )
}