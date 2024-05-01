//Takes an object and the name of the api call to make
export const postRequest = async (jsonData, apiCall) => {
  try {
    const response = await fetch(`/${apiCall}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    });

    if(!response.ok){
      console.log(response);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseJson = await response.json();

    console.log('Server reponse json:', responseJson);

    return(responseJson.id)
  } catch (error) {
    console.error('Error posting json:', error.message);
  }
}

//Calls to server /find. t specifies table, property specifies lookup parameter, and search is what property must match
export const findRequest = async (t, property, search) => {
  try {
    const queryParams = new URLSearchParams({table: `${t}`});
    queryParams.append(`${property}`, search);
    
    const response = await fetch(`/find?${queryParams}`, {
      method: 'GET',
    });

    const responseJson = await response.json();

    console.log(`Server response to find ${t} table:`, responseJson);

    return(responseJson)

  } catch (error) {
    console.error('Error getting:', error.message);
  }
}

export const getAndSetObj = async (t, property, search, setFunction) => {
  console.log('run getAndSetObj')
  findRequest(t, property, search).then( (obj) => {
    setFunction(obj)
  })
}

export const getAndSetArr = async (t, property, search, setFunction) => {
  console.log('run getAndSetArr')
  findRequest(t, property, search).then(
    (arr) => {
      setFunction(arr)
    }).catch( (error) => {
      console.error('Error with getAndSetArr', error)
    })
}